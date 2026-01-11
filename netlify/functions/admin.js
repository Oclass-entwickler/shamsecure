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
    return handler(event, context);
};
