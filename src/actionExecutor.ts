//actionExecutor.ts
// src/actionExecutor.ts
import { ethers } from 'ethers';
import { Step } from './types';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fetchLiquidityPoolParams } from './liquidityPool';

dotenv.config();

function logSeparator(message: string = '') {
  console.log('\n' + '='.repeat(50));
  if (message) console.log(message);
  console.log('='.repeat(50));
}

function logStep(message: string) {
  console.log(`\n>> ${message}`);
}

// Load ABI of the batch executor contract
const BATCH_EXECUTOR_ABI = [
  "function executeBatch(address[] _targets, bytes4[] _signatures, bytes[] _data) public returns (bytes[] memory)"
];
const BATCH_EXECUTOR_ADDRESS = "0x1C294eA32dF8Ba64d9bbB857f82Ed8133A742992"; // Replace with actual address
const PRIVATE_KEY = process.env.MY_WALLET_PRIVATE_KEY; // Replace with your private key

export class ActionExecutor {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private batchExecutorContract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.L2_RPC_TEST);
    // You might want to use a private key or other method to get the signer
    this.signer = new ethers.Wallet(PRIVATE_KEY, this.provider);
    this.batchExecutorContract = new ethers.Contract(BATCH_EXECUTOR_ADDRESS, BATCH_EXECUTOR_ABI, this.signer);
  }

  public async executeBatch(steps: Step[]) {
    logStep('Preparing batch transaction...');
    const targets = steps.map(step => step.target);
    const signatures = steps.map(step => ethers.id(step.method.name).slice(0, 10)); // Method ID
    const data = steps.map(step => {
      const params = step.method.params;
      const types = step.method.types;
      return ethers.AbiCoder.defaultAbiCoder().encode(types, params);
    });

    try {
      logStep('Executing batch transaction...');
      const tx = await this.batchExecutorContract.executeBatch(targets, signatures, data);
      console.log('Transaction sent:', tx.hash);
      logStep('Waiting for transaction confirmation...');
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt.transactionHash);
      return receipt;
    } catch (error) {
      console.error('Error executing batch:', error);
      throw error;
    }
  }

  async executeActions(steps: Step[]) {
    logSeparator('Executing actions');
    try {
      const receipt = await this.executeBatch(steps);
      logSeparator('Actions executed successfully');
      return receipt;
    } catch (error) {
      logSeparator('Failed to execute actions');
      console.error(error);
      throw error;
    }
  }
}

// Function to read steps from the JSON file
function loadSteps(): Step[] {
  const filePath = path.resolve(__dirname, './data/steps.json');
  const stepsData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(stepsData).steps;
}

// Function to fetch dynamic parameters
async function fetchDynamicParams() {
  const params = await fetchLiquidityPoolParams("0xYourLiquidityPoolAddress");
  return params;
}

// Update steps with dynamic params
async function updateStepsWithDynamicParams(steps: Step[]): Promise<Step[]> {
  const dynamicParams = await fetchDynamicParams();

  return steps.map(step => {
    if (step.method.name === "getReward(uint256 tokenId,address tokens)") {
      step.method.params = [dynamicParams.tokenId, dynamicParams.tokenAddress]; 
    } else if (step.method.name === "exerciseVe(uint256 _amount,uint256 _maxPaymentAmount,address _recipient,uint256 _deadline)") {
      step.method.params = [dynamicParams.amount, dynamicParams.maxPaymentAmount, dynamicParams.recipient, dynamicParams.deadline];
    } else if (step.method.name === "increaseUnlockTime(uint256 _tokenId,uint256 _lockDuration,bool _permanent)") {
      step.method.params = [dynamicParams.tokenId, dynamicParams.lockDuration, dynamicParams.permanent];
    }
    return step;
  });
}

// Main function to execute the steps
export async function main() {
  const actionExecutor = new ActionExecutor();
  logSeparator('Loading steps from JSON file...');
  let steps = loadSteps();
  logSeparator('Steps loaded. Updating with dynamic params...');
  steps = await updateStepsWithDynamicParams(steps);
  logSeparator('Steps updated. Executing batch...');
  await actionExecutor.executeActions(steps);
  logSeparator('Batch execution completed.');
}

main().catch(console.error);

// Export the executeBatch function separately
export const executeBatch = (steps: Step[]) => {
  const actionExecutor = new ActionExecutor();
  return actionExecutor.executeBatch(steps);
};

export default ActionExecutor;
