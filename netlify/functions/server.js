// Netlify Serverless Function Wrapper for Express App
const serverless = require('serverless-http');
const app = require('../../server');

// Wrap Express app for Netlify Functions
// Use binary mode for better compatibility
const handler = serverless(app, {
    binary: ['image/*', 'application/pdf']
});

exports.handler = async (event, context) => {
    // Ensure the function doesn't timeout
    context.callbackWaitsForEmptyEventLoop = false;
    return handler(event, context);
};
