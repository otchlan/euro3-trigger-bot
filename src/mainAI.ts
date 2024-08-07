// src/mainAI.ts

import { handleAIRequest } from './aiInterface';

async function mainAI() {
    const userInput = "Can you check the conditions for me?";
    const aiResponse = await handleAIRequest(userInput);
    console.log(aiResponse);
}

mainAI().catch(console.error);
