## Start
1. `bun run src/mockServer.ts`
2. `bun run src/conditionChecker.ts` 

## Development

- `src/conditionChecker.ts`
Reqirements - you need to `bun run src/mockServer` that will send some data to `conditionChecker.ts`, that server in the future will be fetching, cleaning and sending data through the pipeline.
Currently `conditionChecket.ts` is working correctly.
There is couple things that going on:
In `src/fetchContractData/ts` I'm testing in and out data flow with blockchain. Then I'll be building `src/actionExecutor.ts`:
- I need to trigger action to the blockchian and send data to it
- I need to have wallet and tokens, so I start to work with Sepolia testnet, but there was a problem I still wait for tokens from faucet


- `contracts/batchProxyContract.sol` implementatnion of step 4. Batch call
