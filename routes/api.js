// ============================================
// ShamSecure - API Routes
// ============================================

const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');
const config = require('../config');

// ============================================
// Middleware
// ============================================

// API Key validation (optional)
const validateApiKey = (req, res, next) => {
    if (!config.api.enabled) {
        return next();
    }

    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    
    if (apiKey && apiKey === config.api.key) {
        return next();
    }

    // For public endpoints, allow without API key
    if (req.path === '/contact' || req.path === '/quote') {
        return next();
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid API key'
    });
};

// ============================================
// Routes
// ============================================

// Contact Form Endpoint
router.post('/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validation
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'جميع الحقول مطلوبة'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'البريد الإلكتروني غير صحيح'
            });
        }

        // Send email
        const result = await emailService.sendContactEmail({
            name,
            email,
            phone,
            subject,
            message
        });

        if (result.success) {
            res.json({
                success: true,
                message: 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة لاحقاً.'
            });
        }
    } catch (error) {
        console.error('Contact API Error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في الخادم'
        });
    }
});

// Quote Request Endpoint
router.post('/quote', async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            company,
            clientType,
            serviceType,
            location,
            duration,
            message
        } = req.body;

        // Validation
        if (!name || !email || !phone || !clientType || !serviceType || !location) {
            return res.status(400).json({
                success: false,
                message: 'جميع الحقول المطلوبة يجب ملؤها'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'البريد الإلكتروني غير صحيح'
            });
        }

        // Send email
        const result = await emailService.sendQuoteEmail({
            name,
            email,
            phone,
            company,
            clientType,
            serviceType,
            location,
            duration,
            message
        });

        if (result.success) {
            res.json({
                success: true,
                message: 'تم إرسال طلب عرض السعر بنجاح. سنتواصل معك خلال 24 ساعة.'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.'
            });
        }
    } catch (error) {
        console.error('Quote API Error:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ في الخادم'
        });
    }
});

// Health Check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        emailConfigured: emailService.isConfigured(),
        timestamp: new Date().toISOString()
    });
});

// Get Site Config (Public)
router.get('/config', (req, res) => {
    res.json({
        success: true,
        data: {
            site: {
                name: config.site.name,
                nameAr: config.site.nameAr,
                url: config.site.url
            },
            contact: {
                phone: config.contact.phone,
                email: config.contact.email,
                address: config.contact.address
            },
            social: config.social,
            services: config.services,
            hero: config.hero
        }
    });
});

// Get Legal Content (Public)
router.get('/legal/:type', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    const legalPath = path.join(__dirname, '../data/legal-content.json');
    
    try {
        if (fs.existsSync(legalPath)) {
            const legalContent = JSON.parse(fs.readFileSync(legalPath, 'utf8'));
            const type = req.params.type; // 'privacy' or 'terms'
            
            if (legalContent[type]) {
                res.json({
                    success: true,
                    data: legalContent[type]
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'المحتوى غير موجود'
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: 'المحتوى غير موجود'
            });
        }
    } catch (error) {
        console.error('Error reading legal content:', error);
        res.status(500).json({
            success: false,
            message: 'خطأ في قراءة المحتوى'
        });
    }
});

module.exports = router;
