// src/server.ts
import cron from 'node-cron';
import { StrategyManager } from './strategyManager';
import { ConditionChecker } from './conditionChecker';
import { ActionExecutor } from './actionExecutor';
import { Monitor } from './monitor';
//import { SmartContractInteractor } from './smartContractInteractor';
import dotenv from 'dotenv';

dotenv.config();

const strategyManager = new StrategyManager();
const conditionChecker = new ConditionChecker();
const actionExecutor = new ActionExecutor();
const monitor = new Monitor(strategyManager, conditionChecker, actionExecutor);

//const providerUrl = process.env.LINEA_RPC_URL;
//const privateKey = process.env.MY_WALLET_PRIVATE_KEY;

// Log the private key to ensure it's correct
//console.log('Using provider URL:', providerUrl);
//console.log('Using private key:', privateKey);

//if (!providerUrl || !privateKey) {
//  throw new Error('PROVIDER_URL and PRIVATE_KEY must be set in .env file');
//}

//const smartContractInteractor = new SmartContractInteractor(providerUrl, privateKey);

// Example strategy
const exampleStrategy = {
  id: '1',
  name: 'Weekend High APR Strategy',
  conditions: [
    {
      type: 'dayOfWeek',
      check: async () => {
        const day = new Date().getDay();
        return day === 0 || day === 6; // Saturday or Sunday
      },
    },
    {
      type: 'aprComparison',
      check: async () => {
        // Implement APR comparison logic here
        return true; // Placeholder
      },
    },
  ],
  actions: [
    {
      type: 'contractInteraction',
      execute: async () => {
        await smartContractInteractor.interactWithContract(
          'CONTRACT_ADDRESS',
          ['CONTRACT_ABI'],
          'methodName',
          ['param1', 'param2']
        );
      },
    },
  ],
};

strategyManager.addStrategy(exampleStrategy);

// Run the monitor every 5 minutes
cron.schedule('*/5 * * * *', () => {
  monitor.checkAndExecuteStrategies().catch(console.error);
});

console.log('Monitoring system started');