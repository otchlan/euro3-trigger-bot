import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

// Log environment variables to ensure they are loaded
console.log('Provider URL:', process.env.L2_RPC_TEST_2);
console.log('Wallet Address:', process.env.MY_WALLET_ADDRESS_TESTNET);

// Ensure that environment variables are set
const providerUrl = process.env.L2_RPC_TEST_2;
const walletAddress = process.env.MY_WALLET_ADDRESS_TESTNET;

if (!providerUrl || !walletAddress) {
  console.error('Environment variables are missing:');
  console.error('LINEA_RPC_TEST_1:', providerUrl);
  console.error('MY_WALLET_ADDRESS_TESTNET:', walletAddress);
  throw new Error('LINEA_RPC_TEST and MY_WALLET_ADDRESS_TESTNET must be set in .env file');
}

// Log the used variables to debug further issues
console.log('Using provider URL:', providerUrl);
console.log('Using wallet address:', walletAddress);

// Create a provider instance
const provider = new ethers.JsonRpcProvider(providerUrl);

async function checkBalance() {
  try {
    // Fetch the balance of the wallet
    const balanceBigInt = await provider.getBalance(walletAddress);

    // Convert the balance from wei to ether
    const balance = ethers.formatEther(balanceBigInt);

    // Log the balance
    console.log(`The balance of wallet ${walletAddress} is ${balance} ETH`);
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}

// Call the function to check the balance
checkBalance();
