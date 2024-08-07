
# Table of contents
- Condition Checking and Mock Server
- Documentation for Configuration JSON Files


# Condition Checking and Mock Server

## Overview

This documentation provides a comprehensive guide to understanding and using the `ConditionChecker` module and the `MockServer`. The `ConditionChecker` is designed to verify if specified conditions are met by fetching data from a mock server. The mock server simulates external data sources for testing purposes.

## Condition Checker

### Purpose

The `ConditionChecker` module is used to evaluate a set of conditions by fetching data from specified endpoints. It logs each step of the process to provide insights into the condition checking flow.

### Structure

#### `ConditionChecker` Class

- **Methods**:
  - `checkConditions(conditions: Condition[]): Promise<boolean>`
    - Iterates over a list of conditions and checks each one.
  - `getCurrentDayOfWeek(): Promise<string>`
    - Fetches the current day of the week from the mock server.
  - `fetchAPRData(): Promise<number>`
    - Fetches the current APR data from the mock server.
  - `checkCondition(condition: Condition): Promise<boolean>`
    - Checks a single condition based on its type.

#### `checkCondition` Function

- **Purpose**: A mock function for testing that initializes and uses the `ConditionChecker` to evaluate predefined conditions.
- **Usage**: This function is called at the end of the script for demonstration purposes.

### Example

```typescript
// Example usage of the ConditionChecker
const conditions = [
  {
    type: 'dayOfWeek',
    value: ['Saturday', 'Sunday']
  },
  {
    type: 'aprComparison',
    threshold: 0.05,
    comparison: 'greater'
  }
];

const conditionChecker = new ConditionChecker();
const conditionsMet = await conditionChecker.checkConditions(conditions);
console.log(`Conditions met: ${conditionsMet}`);
```

## Mock Server

### Purpose

The `MockServer` is an Elysia-based server that simulates external endpoints for testing the `ConditionChecker`. It provides current day of the week and APR data.

### Structure

#### Endpoints

- `GET /dayOfWeek`
  - Returns the current day of the week.
- `GET /apr`
  - Returns a simulated APR value.

#### Logging

The server logs all incoming requests and significant events for better traceability.

### Example

```typescript
// Starting the mock server
import { Elysia } from 'elysia';

const app = new Elysia();

app.get('/dayOfWeek', () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  const currentDay = days[now.getUTCDay()];
  return { dayOfWeek: currentDay };
});

app.get('/apr', () => {
  const apr = 0.06;  // Example APR
  return { apr: apr };
});

app.listen(3002, () => {
  console.log('Mock server is running on http://localhost:3002');
});
```

## Running the Modules

### Starting the Mock Server

```bash
bun run src/mockServer.ts
```

### Checking Conditions

```bash
bun run src/conditionChecker.ts
```






# **Documentation for Configuration JSON Files**
---
Here’s a comprehensive documentation for the `strategies.json` and `steps.json` files, explaining their structure, purpose, and how they interrelate.

---

### **1. `strategies.json`**

#### **Purpose**
The `strategies.json` file defines various strategies for monitoring and executing smart contract interactions based on specified conditions. Each strategy can involve multiple conditions and paths. The paths reference predefined steps that describe the actual contract interactions.

#### **Structure**

```json
{
  "strategies": [
    {
      "id": "strategy1",
      "name": "Weekend High APR Strategy",
      "conditions": [
        {
          "type": "dayOfWeek",
          "value": ["Saturday", "Sunday"]
        },
        {
          "type": "aprComparison",
          "threshold": 0.05,
          "comparison": "greater"
        }
      ],
      "paths": [
        {
          "steps": ["step1", "step2", "step3"]
        }
      ]
    },
    {
      "id": "strategy2",
      "name": "Midweek Low APR Strategy",
      "conditions": [
        {
          "type": "dayOfWeek",  
          "value": ["Wednesday"]
        },
        {
          "type": "aprComparison",
          "threshold": -0.03,
          "comparison": "less"
        }
      ],
      "paths": [
        {
          "steps": ["step4"]
        }
      ]
    }
  ]
}
```

#### **Fields**

- **`strategies`**: An array of strategy objects.

  - **`id`**: Unique identifier for the strategy.
  
  - **`name`**: Human-readable name for the strategy.
  
  - **`conditions`**: Array of condition objects that must be met for the strategy to execute.
  
    - **`type`**: Type of condition (e.g., `dayOfWeek`, `aprComparison`).
    
    - **`value`**: (For `dayOfWeek`) List of days on which the strategy should be checked.
    
    - **`threshold`**: (For `aprComparison`) APR threshold for comparison.
    
    - **`comparison`**: Type of comparison to be made (`greater`, `less`, etc.).
  
  - **`paths`**: Array of path objects defining steps to be executed if the conditions are met.
  
    - **`steps`**: Array of step IDs referenced from the `steps.json` file.

### **2. `steps.json`**

#### **Purpose**
The `steps.json` file contains detailed definitions of each step referenced in the `strategies.json` file. Each step describes a specific smart contract interaction including target address, method name, method ID, parameter types, and parameters.

#### **Structure**

```json
{
  "steps": [
    {
      "id": "step1",
      "target": "0xC6bC3071EFB96b9fc4Dab76d5658eF4b62dEaCd0",
      "method": {
        "name": "getReward(uint256 tokenId,address tokens)",
        "id": "0xf5f8d365",
        "types": ["uint256", "address"],
        "params": ["12345", "0xTokenAddress"]
      }
    },
    {
      "id": "step2",
      "target": "0xe8a4c9B6a2b79Fd844c9e3AdBc8Dc841eEce557B",
      "method": {
        "name": "exerciseVe(uint256 _amount,uint256 _maxPaymentAmount,address _recipient,uint256 _deadline)",
        "id": "0x62994c05",
        "types": ["uint256", "uint256", "address", "uint256"],
        "params": ["1000", "5000", "0xRecipientAddress", "1700000000"]
      }
    },
    {
      "id": "step3",
      "target": "0x8D95f56b0Bac46e8ac1d3A3F12FB1E5BC39b4c0c",
      "method": {
        "name": "increaseUnlockTime(uint256 _tokenId,uint256 _lockDuration,bool _permanent)",
        "id": "0x9f194422",
        "types": ["uint256", "uint256", "bool"],
        "params": ["67890", "3600", true]
      }
    },
    {
      "id": "step4",
      "target": "0xA2bB9C8e2f4D1e8Fc4D98eF6F3b3B1B0B2b8cC1a",
      "method": {
        "name": "adjustPosition(uint256 _positionId, uint256 _amount)",
        "id": "0x12345678",
        "types": ["uint256", "uint256"],
        "params": ["1", "500"]
      }
    }
  ]
}
```

#### **Fields**

- **`steps`**: An array of step objects.

  - **`id`**: Unique identifier for the step.
  
  - **`target`**: Contract address where the method will be called.
  
  - **`method`**: Object describing the method to call.
    
    - **`name`**: Full name of the method including parameter types.
    
    - **`id`**: Method ID (used for encoding method calls).
    
    - **`types`**: Array of parameter types expected by the method.
    
    - **`params`**: Array of parameters to be passed to the method.

### **Usage**

1. **Load JSON Files**: Load both `strategies.json` and `steps.json` into your application.
2. **Reference Steps**: Use the `steps` field in `paths` to look up corresponding step definitions from `steps.json` using their IDs.
3. **Execute Steps**: For each path, follow the steps in sequence, interacting with smart contracts as specified.

This modular approach allows you to manage and update your strategies and steps independently, enhancing maintainability and flexibility.



## Data Retriever Module
- [ ] need to be fixed

### Purpose
This module is designed to interact with a specific Ethereum smart contract (liquidity pool) to retrieve and calculate price information based on blockchain data.

### Functions

#### fetchGlobalState
- **Description**: Connects to the Ethereum network and retrieves the current state of the liquidity pool.
- **Returns**: The global state of the contract as fetched from the blockchain.

#### calculatePrice
- **Description**: Calculates the actual price from the sqrtPriceX96 value returned by the smart contract.
- **Parameters**:
  - `sqrtPriceX96`: The square root of the price.
  - `decimals0`: Decimal places of the first token.
  - `decimals1`: Decimal places of the second token.
- **Returns**: The calculated price as a string formatted to the correct decimal places.

#### retrieveData
- **Description**: Retrieves global state data from the contract and calculates the price.
- **Returns**: A promise that resolves to the calculated price as a string.

### Usage
Run this module using bun. Ensure that all required environment variables are set in your `.env` file, including the provider URL.

### Output
The module will log each step of its operation to the console, providing detailed insights into the connection status, data retrieval, and calculation processes.





# Front app and data visualization
- [ ] need to be develop `index.ts`, `template.html`
