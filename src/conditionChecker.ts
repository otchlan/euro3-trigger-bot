//conditionChecker.ts
import { Condition, Strategy, Step } from './types';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

function logSeparator(message: string = '') {
  console.log('\n' + '='.repeat(50));
  if (message) console.log(message);
  console.log('='.repeat(50));
}

function logStep(message: string) {
  console.log(`\n>> ${message}`);
}

export class ConditionChecker {
  async checkConditions(conditions: Condition[]): Promise<boolean> {
    logStep('Checking conditions...');
    for (const condition of conditions) {
      logSeparator(`Checking condition: ${JSON.stringify(condition, null, 2)}`);
      if (!(await this.checkCondition(condition))) {
        console.log(`❌ Condition not met: ${JSON.stringify(condition, null, 2)}`);
        return false;
      }
      console.log(`✅ Condition met: ${JSON.stringify(condition, null, 2)}`);
    }
    logSeparator('All conditions met');
    return true;
  }

  private async getCurrentDayOfWeek(): Promise<string> {
    logStep('Fetching current day of the week (UTC)...');
    const response = await axios.get('http://localhost:3002/dayOfWeek');
    const currentDay = response.data.dayOfWeek;
    console.log(`📅 Current day of the week (UTC): ${currentDay}`);
    return currentDay;
  }

  private async fetchAPRData(): Promise<number> {
    logStep('Fetching APR data...');
    const response = await axios.get('http://localhost:3002/apr');
    const apr = response.data.apr;
    console.log(`💹 Current APR: ${apr}`);
    return apr;
  }

  private async checkCondition(condition: Condition): Promise<boolean> {
    if (condition.type === 'dayOfWeek') {
      const currentDay = await this.getCurrentDayOfWeek();
      const result = condition.value.includes(currentDay);
      console.log(`📊 Day of the week condition met: ${result}`);
      return result;
    } else if (condition.type === 'aprComparison') {
      const currentAPR = await this.fetchAPRData();
      let result = false;
      if (condition.comparison === 'greater') {
        result = currentAPR > condition.threshold;
      } else if (condition.comparison === 'less') {
        result = currentAPR < condition.threshold;
      }
      console.log(`📊 APR comparison condition met: ${result}`);
      return result;
    }
    console.log(`⚠️ Unknown condition type: ${condition.type}`);
    return false;
  }

  private loadStrategies(): Strategy[] {
    const filePath = path.resolve(__dirname, './data/strategies.json');
    const strategiesData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(strategiesData).strategies;
  }

  async checkStrategies(): Promise<void> {
    logStep('Loading strategies from strategies.json...');
    const strategies = this.loadStrategies();
    for (const strategy of strategies) {
      logSeparator(`Checking strategy: ${strategy.name}`);
      const conditionsMet = await this.checkConditions(strategy.conditions);
      if (conditionsMet) {
        logSeparator(`Conditions met for strategy: ${strategy.name}`);
        console.log(`Triggering path for strategy: ${strategy.name}`);
        for (const path of strategy.paths) {
          console.log(JSON.stringify(path.steps, null, 2));
          console.log(`Triggering actions for strategy: ${strategy.name}`);
          //actionExecutor.ts
        }
      } else {
        console.log(`Conditions not met for strategy: ${strategy.name}`);
      }
    }
  }
}

// Mock function for testing
export async function checkCondition() {
  const conditionChecker = new ConditionChecker();
  await conditionChecker.checkStrategies();
}

// Call the checkCondition function to execute the condition checks
checkCondition().catch(console.error);
