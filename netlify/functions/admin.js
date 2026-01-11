// Netlify Serverless Function for Admin Routes
const serverless = require('serverless-http');
const express = require('express');
const cookieParser = require('cookie-parser');
const adminRoutes = require('../../routes/admin');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Use admin routes
app.use('/', adminRoutes);

// Wrap for Netlify
const handler = serverless(app, {
    binary: ['image/*', 'application/pdf']
});

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    // Fix the path for Netlify redirects
    // When Netlify redirects /admin/login to /.netlify/functions/admin,
    // the original path is in event.rawPath or we need to extract it from event.path
    
    let actualPath = event.path || '/';
    
    // Check if we have rawPath (original request path)
    if (event.rawPath) {
        // Extract the path after /admin
        if (event.rawPath.startsWith('/admin')) {
            actualPath = event.rawPath.replace('/admin', '') || '/';
        }
    } else if (actualPath.startsWith('/.netlify/functions/admin')) {
        // If path is the function path, try to extract from query or use root
        actualPath = '/';
    } else if (actualPath.startsWith('/admin')) {
        // Remove /admin prefix
        actualPath = actualPath.replace('/admin', '') || '/';
    }
    
    // Update event.path and rawPath
    event.path = actualPath;
    if (event.rawPath && event.rawPath.startsWith('/admin')) {
        event.rawPath = event.rawPath.replace('/admin', '') || '/';
    }
    
    // Also check for path in query string (Netlify sometimes passes it there)
    if (event.queryStringParameters && event.queryStringParameters.path) {
        actualPath = event.queryStringParameters.path;
        event.path = actualPath;
    }
    
    console.log('Admin function called');
    console.log('Event path:', event.path);
    console.log('Event rawPath:', event.rawPath);
    console.log('Actual path:', actualPath);
    console.log('Query params:', event.queryStringParameters);
    console.log('HTTP method:', event.httpMethod);
    
    return handler(event, context);
};
