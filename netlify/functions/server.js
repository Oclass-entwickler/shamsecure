// Netlify Serverless Function Wrapper for Express App
const serverless = require('serverless-http');
const app = require('../../server');

// Wrap Express app for Netlify Functions
exports.handler = serverless(app);
