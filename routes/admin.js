// ============================================
// ShamSecure - Admin Routes
// ============================================

const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

// ============================================
// Middleware
// ============================================

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

// ============================================
// Routes
// ============================================

// Login Page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/login.html'));
});

// Login POST
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

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
        res.status(401).json({ success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('adminToken');
    res.redirect('/admin/login');
});

// Dashboard (Protected)
router.get('/', authenticateAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dashboard.html'));
});

// API: Get Stats
router.get('/api/stats', authenticateAdmin, (req, res) => {
    // In production, get from database
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

module.exports = router;
