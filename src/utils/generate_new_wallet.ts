import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Setup a provider using an Ethereum node service like Infura
const provider = new ethers.JsonRpcProvider(process.env.L2_RPC_URL);

// Create a random wallet
const wallet = ethers.Wallet.createRandom();
console.log('Address:', wallet.address);
console.log('Private Key:', wallet.privateKey);

async function saveWalletInfo() {
    // Fetch network details
    const network = await provider.getNetwork();
    
    // Prepare wallet information including network details
    const walletData = {
        address: wallet.address,
        privateKey: wallet.privateKey,
        chainId: network.chainId.toString(), // Convert BigInt to string
        chainName: network.name,
    };

    // Define the file path
    const filePath = path.join(__dirname, 'wallets.json');  // Ensure this matches your expected file

    console.log(`Saving to file path: ${filePath}`); // Debugging path

    // Check if file exists, if not initialize with empty array
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2));
        console.log('New wallet file created.');
    }

    // Read existing data
    const data = fs.readFileSync(filePath, 'utf8');
    const wallets = JSON.parse(data);

    // Append new wallet data
    wallets.push(walletData);

    // Save the updated wallet information back to the file
    fs.writeFileSync(filePath, JSON.stringify(wallets, null, 2));

    console.log(`Wallet information saved to ${filePath}`);
    console.log(`Chain ID: ${network.chainId}, Chain Name: ${network.name}`);
}

saveWalletInfo().catch(console.error);
