// Netlify Serverless Function for Admin Routes
const serverless = require('serverless-http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Login Page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../admin/login.html'));
});

// Login POST
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Login attempt:', { username, password: '***' });
    console.log('Config admin:', { 
        username: config.admin.username, 
        password: config.admin.password ? '***' : 'NOT SET' 
    });

    if (username === config.admin.username && password === config.admin.password) {
        const token = jwt.sign(
            { username: config.admin.username },
            config.security.jwtSecret,
            { expiresIn: '24h' }
        );

        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: config.server.env === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.json({ success: true, message: 'تم تسجيل الدخول بنجاح' });
    } else {
        res.status(401).json({ 
            success: false, 
            message: 'اسم المستخدم أو كلمة المرور غير صحيحة',
            debug: {
                usernameMatch: username === config.admin.username,
                passwordMatch: password === config.admin.password
            }
        });
    }
});

// Logout
app.get('/logout', (req, res) => {
    res.clearCookie('adminToken');
    res.redirect('/admin/login');
});

// Dashboard (Protected)
const authenticateAdmin = (req, res, next) => {
    const token = req.cookies?.adminToken || req.headers?.authorization?.split(' ')[1];

    if (!token) {
        return res.redirect('/admin/login');
    }

    try {
        const decoded = jwt.verify(token, config.security.jwtSecret);
        req.admin = decoded;
        next();
    } catch (error) {
        res.redirect('/admin/login');
    }
};

app.get('/', authenticateAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../../admin/dashboard.html'));
});

// API: Get Stats
app.get('/api/stats', authenticateAdmin, (req, res) => {
    res.json({
        success: true,
        data: {
            totalContacts: 0,
            totalQuotes: 0,
            recentContacts: [],
            recentQuotes: []
        }
    });
});

// Wrap for Netlify
const handler = serverless(app, {
    binary: ['image/*', 'application/pdf']
});

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    return handler(event, context);
};
