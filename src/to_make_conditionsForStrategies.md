Certainly! Below is a structured documentation page for the various condition types you can add to your trading bot. This documentation includes a description of each condition type along with example values.

---

# Trading Bot Conditions Documentation

This documentation provides an overview of various condition types that can be integrated into a trading bot. Each condition type is defined with a description and example values to guide implementation.

## Condition Types

### 1. `timeOfDay`
**Description**: Check if the current time falls within a specified range.  
**Example Values**:
```json
{
  "start": "08:00",
  "end": "16:00"
}
```

### 2. `priceThreshold`
**Description**: Check if the price of a specific asset crosses a threshold.  
**Example Values**:
```json
{
  "asset": "ETH",
  "threshold": 2000,
  "comparison": "greater"
}
```

### 3. `volumeThreshold`
**Description**: Check if the trading volume of a specific asset exceeds a threshold.  
**Example Values**:
```json
{
  "asset": "BTC",
  "threshold": 1000,
  "comparison": "greater"
}
```

### 4. `marketCap`
**Description**: Check if the market capitalization of a specific asset meets a condition.  
**Example Values**:
```json
{
  "asset": "ETH",
  "threshold": 1000000000,
  "comparison": "greater"
}
```

### 5. `movingAverage`
**Description**: Check if the current price is above or below a moving average (e.g., 50-day, 200-day).  
**Example Values**:
```json
{
  "asset": "BTC",
  "period": 50,
  "comparison": "above"
}
```

### 6. `rsi`
**Description**: Check if the Relative Strength Index (RSI) of an asset is above or below a certain level.  
**Example Values**:
```json
{
  "asset": "ETH",
  "threshold": 70,
  "comparison": "less"
}
```

### 7. `macd`
**Description**: Check if the Moving Average Convergence Divergence (MACD) indicator is above or below the signal line.  
**Example Values**:
```json
{
  "asset": "BTC",
  "comparison": "above"
}
```

### 8. `trend`
**Description**: Check if the asset is in an uptrend or downtrend based on recent price movements.  
**Example Values**:
```json
{
  "asset": "ETH",
  "trend": "uptrend"
}
```

### 9. `newsSentiment`
**Description**: Check if the sentiment of recent news articles about an asset is positive or negative.  
**Example Values**:
```json
{
  "asset": "BTC",
  "sentiment": "positive"
}
```

### 10. `tweetVolume`
**Description**: Check if the number of tweets about an asset exceeds a certain threshold.  
**Example Values**:
```json
{
  "asset": "ETH",
  "threshold": 500,
  "comparison": "greater"
}
```

### 11. `networkHashRate`
**Description**: Check if the hash rate of a blockchain network exceeds or falls below a threshold.  
**Example Values**:
```json
{
  "network": "Bitcoin",
  "threshold": 150,
  "comparison": "greater"
}
```

### 12. `gasFees`
**Description**: Check if the gas fees on a blockchain network are above or below a certain threshold.  
**Example Values**:
```json
{
  "network": "Ethereum",
  "threshold": 50,
  "comparison": "less"
}
```

### 13. `openInterest`
**Description**: Check if the open interest in futures contracts for an asset is above or below a threshold.  
**Example Values**:
```json
{
  "asset": "BTC",
  "threshold": 10000,
  "comparison": "greater"
}
```

### 14. `liquidity`
**Description**: Check if the liquidity of an asset in a specific exchange or pool meets a condition.  
**Example Values**:
```json
{
  "asset": "ETH",
  "threshold": 5000,
  "comparison": "greater"
}
```

### 15. `sentimentScore`
**Description**: Check if the sentiment score from social media or news is above or below a threshold.  
**Example Values**:
```json
{
  "asset": "BTC",
  "threshold": 0.7,
  "comparison": "greater"
}
```

### 16. `orderBookDepth`
**Description**: Check if the depth of the order book for an asset exceeds a certain level.  
**Example Values**:
```json
{
  "asset": "ETH",
  "threshold": 1000,
  "comparison": "greater"
}
```

### 17. `networkActivity`
**Description**: Check if the number of active addresses on a blockchain network exceeds a threshold.  
**Example Values**:
```json
{
  "network": "Ethereum",
  "threshold": 100000,
  "comparison": "greater"
}
```

## How to Use

1. **Define Conditions**: Use the JSON structure provided above to define the conditions for your trading bot.
2. **Fetch Data**: Implement functions to fetch the necessary data for each condition.
3. **Evaluate Conditions**: Use the provided conditions to evaluate whether the conditions are met.
4. **Execute Actions**: Based on the conditions, execute the predefined actions.

By using this documentation, you can extend and customize the conditions for your trading bot, enabling it to make more informed and dynamic trading decisions.

---
Certainly! Here are some additional conditions you can add to your trading bot, along with a brief description and example values:

| **Condition Type**           | **Description**                                                                                   | **Example Values**                                |
|------------------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------|
| **timeOfDay**                | Check if the current time falls within a specified range.                                         | `"start": "08:00", "end": "16:00"`                |
| **priceThreshold**           | Check if the price of a specific asset crosses a threshold.                                       | `"asset": "ETH", "threshold": 2000, "comparison": "greater"` |
| **volumeThreshold**          | Check if the trading volume of a specific asset exceeds a threshold.                              | `"asset": "BTC", "threshold": 1000, "comparison": "greater"` |
| **marketCap**                | Check if the market capitalization of a specific asset meets a condition.                         | `"asset": "ETH", "threshold": 1000000000, "comparison": "greater"` |
| **movingAverage**            | Check if the current price is above or below a moving average (e.g., 50-day, 200-day).            | `"asset": "BTC", "period": 50, "comparison": "above"` |
| **rsi**                      | Check if the Relative Strength Index (RSI) of an asset is above or below a certain level.         | `"asset": "ETH", "threshold": 70, "comparison": "less"` |
| **macd**                     | Check if the Moving Average Convergence Divergence (MACD) indicator is above or below the signal line. | `"asset": "BTC", "comparison": "above"` |
| **trend**                    | Check if the asset is in an uptrend or downtrend based on recent price movements.                  | `"asset": "ETH", "trend": "uptrend"`              |
| **newsSentiment**            | Check if the sentiment of recent news articles about an asset is positive or negative.            | `"asset": "BTC", "sentiment": "positive"`         |
| **tweetVolume**              | Check if the number of tweets about an asset exceeds a certain threshold.                         | `"asset": "ETH", "threshold": 500, "comparison": "greater"` |
| **networkHashRate**          | Check if the hash rate of a blockchain network exceeds or falls below a threshold.                | `"network": "Bitcoin", "threshold": 150, "comparison": "greater"` |
| **gasFees**                  | Check if the gas fees on a blockchain network are above or below a certain threshold.             | `"network": "Ethereum", "threshold": 50, "comparison": "less"` |
| **openInterest**             | Check if the open interest in futures contracts for an asset is above or below a threshold.       | `"asset": "BTC", "threshold": 10000, "comparison": "greater"` |
| **liquidity**                | Check if the liquidity of an asset in a specific exchange or pool meets a condition.              | `"asset": "ETH", "threshold": 5000, "comparison": "greater"` |
| **sentimentScore**           | Check if the sentiment score from social media or news is above or below a threshold.             | `"asset": "BTC", "threshold": 0.7, "comparison": "greater"` |
| **orderBookDepth**           | Check if the depth of the order book for an asset exceeds a certain level.                        | `"asset": "ETH", "threshold": 1000, "comparison": "greater"` |
| **networkActivity**          | Check if the number of active addresses on a blockchain network exceeds a threshold.              | `"network": "Ethereum", "threshold": 100000, "comparison": "greater"` |

### Example JSON for Conditions

Here's an example of how these conditions might be structured in a JSON file:

```json
{
  "conditions": [
    {
      "type": "dayOfWeek",
      "value": ["Saturday", "Sunday"]
    },
    {
      "type": "aprComparison",
      "threshold": 0.05,
      "comparison": "greater"
    },
    {
      "type": "timeOfDay",
      "start": "08:00",
      "end": "16:00"
    },
    {
      "type": "priceThreshold",
      "asset": "ETH",
      "threshold": 2000,
      "comparison": "greater"
    },
    {
      "type": "volumeThreshold",
      "asset": "BTC",
      "threshold": 1000,
      "comparison": "greater"
    },
    {
      "type": "movingAverage",
      "asset": "BTC",
      "period": 50,
      "comparison": "above"
    },
    {
      "type": "rsi",
      "asset": "ETH",
      "threshold": 70,
      "comparison": "less"
    }
  ]
}
```

### Implementing the Condition Checks

You can implement these condition checks similarly to the `checkConditions` function provided earlier. Each condition type will have its own logic for fetching and evaluating data. Here's a brief example for checking some of these conditions:

```typescript
async function fetchPrice(asset: string): Promise<number> {
  // Replace with actual API call to fetch asset price
  return 2500;  // Example price
}

async function fetchVolume(asset: string): Promise<number> {
  // Replace with actual API call to fetch asset volume
  return 1500;  // Example volume
}

async function fetchMovingAverage(asset: string, period: number): Promise<number> {
  // Replace with actual API call to fetch moving average
  return 2450;  // Example moving average
}

async function checkConditions(conditions): Promise<boolean> {
  for (const condition of conditions) {
    if (condition.type === 'dayOfWeek') {
      const currentDay = getCurrentDayOfWeek();
      if (!condition.value.includes(currentDay)) {
        return false;
      }
    } else if (condition.type === 'aprComparison') {
      const currentAPR = await fetchAPRData();
      if (condition.comparison === 'greater' && currentAPR <= condition.threshold) {
        return false;
      }
      if (condition.comparison === 'less' && currentAPR >= condition.threshold) {
        return false;
      }
    } else if (condition.type === 'priceThreshold') {
      const currentPrice = await fetchPrice(condition.asset);
      if (condition.comparison === 'greater' && currentPrice <= condition.threshold) {
        return false;
      }
      if (condition.comparison === 'less' && currentPrice >= condition.threshold) {
        return false;
      }
    } else if (condition.type === 'volumeThreshold') {
      const currentVolume = await fetchVolume(condition.asset);
      if (condition.comparison === 'greater' && currentVolume <= condition.threshold) {
        return false;
      }
      if (condition.comparison === 'less' && currentVolume >= condition.threshold) {
        return false;
      }
    } else if (condition.type === 'movingAverage') {
      const movingAverage = await fetchMovingAverage(condition.asset, condition.period);
      const currentPrice = await fetchPrice(condition.asset);
      if (condition.comparison === 'above' && currentPrice <= movingAverage) {
        return false;
      }
      if (condition.comparison === 'below' && currentPrice >= movingAverage) {
        return false;
      }
    }
    // Add more conditions as needed
  }
  return true;
}
```

### Summary

This approach allows you to define and check various conditions dynamically by loading them from a JSON file. You can extend the conditions as needed by adding more types and corresponding data fetching and evaluation logic.
