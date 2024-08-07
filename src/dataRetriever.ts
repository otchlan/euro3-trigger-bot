// src/dataRetriever.ts
//code from previous task
import { ethers } from 'ethers';
import { formatUnits } from 'ethers/utils'; // Importing formatUnits directly
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Initialize dotenv for environment variable loading
dotenv.config();

console.log("Initialization");

// Load ABI from file
const ABIPath = path.join(__dirname, '..', 'contracts', 'abis', 'LiquidityPoolABI.json');
const CONTRACT_ABI = JSON.parse(fs.readFileSync(ABIPath, 'utf-8'));

console.log("Contract ABI Loaded");

// Contract address
const CONTRACT_ADDRESS = '0xacE89Ad89B1d374fd4D198C3CC62e9ab1dB717D1'; // Replace with your contract address
console.log("Using contract address:", CONTRACT_ADDRESS);

// Environment variables
const providerUrl = process.env.LINEA_RPC_URL;
if (!providerUrl) {
    throw new Error('LINEA_RPC_URL is not defined in .env file');
}

// Create provider instance
console.log("Setting up provider...");
const provider = new ethers.JsonRpcProvider(providerUrl);
console.log("Provider URL:", providerUrl);

// Create contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
console.log("Contract instance created");

// Function to fetch global state from contract
async function fetchGlobalState() {
    console.log('Connecting to Ethereum provider...');
    await provider.ready; // Ensure the provider is ready
    console.log('Ethereum provider connected.');
    
    try {
        console.log(`Fetching global state from contract at address: ${CONTRACT_ADDRESS}...`);
        const globalState = await contract.globalState();
        console.log('Raw global state data:', globalState);
        return globalState;
    } catch (error) {
        console.error('Error fetching global state:', error);
        throw error;
    }
}

// Function to calculate price from sqrtPriceX96
function calculatePrice(sqrtPriceX96: bigint, decimals0: number, decimals1: number): string {
    const priceX96 = (sqrtPriceX96 * sqrtPriceX96) / (BigInt(2) ** BigInt(192)); // Convert sqrtPriceX96 to price
    const adjustedPrice = formatUnits(priceX96.toString(), decimals1 - decimals0); // Adjust for decimals
    console.log("Calculated Price:", adjustedPrice);
    return adjustedPrice;
}

// Function to retrieve data
export async function retrieveData(): Promise<string> {
    try {
        console.log("Retrieving global state...");
        const globalState = await fetchGlobalState();
        
        // Assuming the global state is an array and the first element is the sqrtPriceX96
        const decimals0 = 6; // Assuming token0 is USDC (6 decimals)
        const decimals1 = 18; // Assuming token1 is EURO3 (18 decimals)
        
        if (Array.isArray(globalState) && globalState.length > 0) {
            const sqrtPriceX96 = globalState[0];
            const price = calculatePrice(sqrtPriceX96, decimals0, decimals1);
            console.log("Final Price:", price);
            return price;
        } else {
            throw new Error('Unexpected global state format');
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw error;
    }
}

// Execute the data retrieval
retrieveData().then(price => console.log("Price Retrieved:", price)).catch(console.error);
