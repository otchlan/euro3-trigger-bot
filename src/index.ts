//src/index.ts
import { Elysia } from 'elysia';
import { checkCondition } from './conditionChecker';
import { executeAction } from './actionExecutor';
import { manageStrategy } from './strategyManager';
import { monitor } from './monitor';

const app = new Elysia();

app.get('/', async () => {
  const components = [
    { name: 'Condition Checker', func: checkCondition },
    { name: 'Action Executor', func: executeAction },
    { name: 'Strategy Manager', func: manageStrategy },
    { name: 'Monitor', func: monitor },
  ];

  const results = await Promise.all(components.map(async (component) => {
    try {
      const result = await component.func();
      return {
        title: component.name,
        content: result,
        error: null
      };
    } catch (error) {
      console.error(`Error in ${component.name}:`, error);
      return {
        title: component.name,
        content: null,
        error: error.message || 'An unknown error occurred'
      };
    }
  }));

  return {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(results, null, 1),
  };
});

app.listen(2999, () => {
  console.log('Server is running on http://localhost:2999');
});
