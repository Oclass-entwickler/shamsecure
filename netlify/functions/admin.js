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
    // Netlify passes the full path in event.path
    // When redirecting /admin/login, the path might be /.netlify/functions/admin/login
    // or just /login depending on how the redirect is configured
    
    let actualPath = event.path || '/';
    
    // Remove /.netlify/functions/admin prefix if present
    if (actualPath.startsWith('/.netlify/functions/admin')) {
        actualPath = actualPath.replace('/.netlify/functions/admin', '') || '/';
    }
    // Remove /admin prefix if present (shouldn't happen with redirects, but just in case)
    else if (actualPath.startsWith('/admin')) {
        actualPath = actualPath.replace('/admin', '') || '/';
    }
    
    // Update event.path to the actual path
    event.path = actualPath;
    
    // Also update rawPath if it exists
    if (event.rawPath) {
        if (event.rawPath.startsWith('/.netlify/functions/admin')) {
            event.rawPath = event.rawPath.replace('/.netlify/functions/admin', '') || '/';
        } else if (event.rawPath.startsWith('/admin')) {
            event.rawPath = event.rawPath.replace('/admin', '') || '/';
        }
    }
    
    console.log('Admin function called');
    console.log('Original path:', event.path);
    console.log('Fixed path:', actualPath);
    console.log('Query params:', event.queryStringParameters);
    
    return handler(event, context);
};
