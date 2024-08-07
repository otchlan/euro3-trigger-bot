// src/mockServer.ts
import { Elysia } from 'elysia';

const app = new Elysia();

// Helper function for logging
function log(message: string) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

// Middleware to log all incoming requests
app.use((context) => {
    log(`Incoming request: ${context.method} ${context.path}`);
});

app.get('/dayOfWeek', () => {
    log('Processing /dayOfWeek request...');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const currentDay = days[now.getUTCDay()];
    log(`Returning current day of the week: ${currentDay}`);
    return { dayOfWeek: currentDay };
});

app.get('/apr', () => {
    log('Processing /apr request...');
    const apr = 0.06;  // Example APR
    log(`Returning APR: ${apr}`);
    return { apr: apr };
});

// Error handling
app.onError(({ code, error, set }) => {
    log(`Error occurred: ${code} - ${error.message}`);
    set.status = 500;
    return { error: 'Internal Server Error' };
});

// Not Found handler
app.all('*', ({ request }) => {
    log(`404 Not Found: ${request.method} ${request.url}`);
    return { error: 'Not Found' };
});

app.listen(3002, () => {
    log('Mock server is starting...');
    log('Mock server is running on http://localhost:3002');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    log('Received SIGINT. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    log('Received SIGTERM. Shutting down gracefully...');
    process.exit(0);
});

// Log unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});