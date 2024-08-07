## Start
1. `bun run src/mockServer.ts`
2. `bun run src/conditionChecker.ts` 

## Development

`src/conditionChecker.ts`
Reqirements - you need to `bun run src/mockServer` that will send some data to `conditionChecker.ts`, that server in the future will be fetching, cleaning and sending data through the pipeline.
Currently `conditionChecket.ts` is working correctly.

There is couple things that going on:
In `src/actionExecutor.ts`:
- I need to trigger action to the blockchian and send data to it
- I need to have wallet and tokens, so I start to work with Sepolia testnet, but there was a problem with checking ballance of the wallet -- still unresolved --  
https://sepolia.etherscan.io/address/0xa31Ba299436CC80e3a97Df5F2a9a6d4f2C1049F5 in `src/utils/wallets.json`
- another one that is related to `actionExecutor.ts`. When I need to trigger a contract and send some data, I started to work on looking at that contract. At that step I start to analizing and that guides to these questions in the file.

- in `src/fetchContractData/ts` I'm testing in and out data flow with blockchain.

- `contracts/batchProxyContract.sol` implementatnion of step 4. Batch call
