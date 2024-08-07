// src/smartContractInteractor.ts
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

// Load ABIs from JSON files (assuming these files exist and contain valid ABIs)
const liquidityPoolABI = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'abis', 'LiquidityPoolABI.json'), 'utf-8'));
const veABI = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'abis', 'VeABI.json'), 'utf-8')); // Example ABI
const lockABI = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'abis', 'LockABI.json'), 'utf-8')); // Example ABI

const claimRewardsPath = [
  {
    target: "0xC6bC3071EFB96b9fc4Dab76d5658eF4b62dEaCd0",
    method: "getReward",
    types: ["uint256", "address[]"],
    abi: liquidityPoolABI,
    params: [123, ["0xTokenAddress1", "0xTokenAddress2"]] // Example params, should be dynamic based on actual usage
  },
  {
    target: "0xe8a4c9B6a2b79Fd844c9e3AdBc8Dc841eEce557B",
    method: "exerciseVe",
    types: ["uint256", "uint256", "address", "uint256"],
    abi: veABI,
    params: [1000, 500, "0xRecipientAddress", 1625097600] // Example params
  },
  {
    target: "0x8D95f56b0Bac46e8ac1d3A3F12FB1E5BC39b4c0c",
    method: "increaseUnlockTime",
    types: ["uint256", "uint256", "bool"],
    abi: lockABI,
    params: [456, 86400, true] // Example params
  }
];

export class SmartContractInteractor {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Wallet;

  constructor(providerUrl: string, privateKey: string) {
    this.provider = new ethers.JsonRpcProvider(providerUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
  }

  async interactWithContract(
    contractAddress: string,
    abi: ethers.ContractInterface,
    method: string,
    params: any[]
  ): Promise<ethers.ContractTransaction> {
    const contract = new ethers.Contract(contractAddress, abi, this.signer);
    return await contract[method](...params);
  }

  async executePath(path: typeof claimRewardsPath): Promise<void> {
    for (const step of path) {
      console.log(`Executing method ${step.method} on contract at ${step.target}`);
      try {
        const transaction = await this.interactWithContract(step.target, step.abi, step.method, step.params);
        console.log(`Transaction successful with hash: ${transaction.hash}`);
      } catch (error) {
        console.error(`Failed to execute step: ${error.message}`);
      }
    }
  }
}

// Example usage
const providerUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY';
const privateKey = 'YOUR_PRIVATE_KEY'; // Set your private key here
const interactor = new SmartContractInteractor(providerUrl, privateKey);

// Execute the path
interactor.executePath(claimRewardsPath).catch(console.error);
