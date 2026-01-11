// Netlify Serverless Function Wrapper for Express App
const serverless = require('serverless-http');

let app;
let handler;

try {
    app = require('../../server');
    
    // Wrap Express app for Netlify Functions
    // Use binary mode for better compatibility
    handler = serverless(app, {
        binary: ['image/*', 'application/pdf']
    });
} catch (error) {
    console.error('Error loading server:', error);
    console.error('Error stack:', error.stack);
    
    // Create a minimal error handler
    handler = async (event, context) => {
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Server initialization error: ' + error.message,
                error: error.stack
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    };
}

exports.handler = async (event, context) => {
    // Ensure the function doesn't timeout
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        return await handler(event, context);
    } catch (error) {
        console.error('Handler error:', error);
        console.error('Error stack:', error.stack);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Handler error: ' + error.message,
                error: error.stack
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
