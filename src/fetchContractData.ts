// src/fetchContractData.ts
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const ABIPath = path.join(__dirname, '..', 'contracts', 'abis', 'LiquidityPoolABI.json');
const CONTRACT_ABI = JSON.parse(fs.readFileSync(ABIPath, 'utf-8'));
const CONTRACT_ADDRESS = '0xC6bC3071EFB96b9fc4Dab76d5658eF4b62dEaCd0';

const provider = new ethers.JsonRpcProvider(process.env.L2_RPC_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

// Function to claim rewards for a specific token ID and a list of tokens
async function claimRewards(tokenId: bigint): Promise<void> {
  try {
    console.log(`Claiming rewards for token ID (in function): ${tokenId.toString(16)}`);
    const signer = new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY as string, provider);
    const contractWithSigner = contract.connect(signer);

    const rewardTokens = await getRewardTokens();

    // Use the getReward method with tokenId and rewardTokens
    const tx = await contractWithSigner["getReward(uint256,address[])"](tokenId, rewardTokens);
    console.log('Transaction submitted:', tx.hash);
    await tx.wait();
    console.log('Transaction confirmed:', tx.hash);
  } catch (error) {
    console.error('Failed to claim rewards:', error);
  }
}

// Function to get reward tokens
async function getRewardTokens(): Promise<string[]> {
  const rewardTokens: string[] = [];
  let index = 0;
  
  while (true) {
    try {
      const tokenAddress = await contract.rewardTokens(index);
      rewardTokens.push(tokenAddress);
      index++;
    } catch (error) {
      // We've reached the end of the reward tokens list
      break;
    }
  }

  console.log('Reward tokens:', rewardTokens);
  return rewardTokens;
}

// Example usage
const tokenId = BigInt('0xf5f8d365'); // Explicitly use BigInt for token ID
console.log(`Claiming rewards for token ID (outside function): ${tokenId.toString(16)}`);
claimRewards(tokenId);
