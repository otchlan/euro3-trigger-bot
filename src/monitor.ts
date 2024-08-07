// src/monitor.ts

import { checkCondition } from './conditionChecker';

export async function monitor() {
    console.log("Monitor initialized successfully");
    // You can use setInterval to run the checkCondition function periodically
    setInterval(async () => {
        console.log("Checking conditions...");
        await checkCondition();
    }, 5 * 60 * 1000); // Check every 5 minutes
}

// Initialize the monitor
monitor().catch(console.error);
