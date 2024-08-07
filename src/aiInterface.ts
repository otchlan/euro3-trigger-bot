// src/aiInterface.ts

import { checkCondition } from './conditionChecker';

export async function handleAIRequest(request: string): Promise<string> {
    if (request.toLowerCase().includes('check conditions')) {
        try {
            const result = await checkCondition();
            return `AI Assistant: ${result}`;
        } catch (error) {
            return `AI Assistant: An error occurred while checking conditions: ${error.message}`;
        }
    } else {
        return "AI Assistant: I'm sorry, I don't understand that request. You can ask me to 'check conditions'.";
    }
}
