// ============================================
// ShamSecure - Admin Routes
// ============================================

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const config = require('../config');

// ============================================
// Middleware
// ============================================

const authenticateAdmin = (req, res, next) => {
    const token = req.cookies?.adminToken || req.headers?.authorization?.split(' ')[1];

    // Debug logging
    console.log('=== AUTH CHECK ===');
    console.log('Cookies:', req.cookies);
    console.log('Token from cookie:', req.cookies?.adminToken ? 'present' : 'missing');
    console.log('Token from header:', req.headers?.authorization ? 'present' : 'missing');
    console.log('==================');

    if (!token) {
        console.log('No token found - redirecting to login');
        return res.redirect('/admin/login');
    }

    try {
        const decoded = jwt.verify(token, config.security.jwtSecret);
        req.admin = decoded;
        console.log('Token verified - access granted');
        next();
    } catch (error) {
        console.log('Token verification failed:', error.message);
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

    // Debug logging
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Received username:', username);
    console.log('Received password:', password ? '***' : 'undefined');
    console.log('Config username:', config.admin.username);
    console.log('Config password:', config.admin.password ? '***' : 'undefined');
    console.log('Username match:', username === config.admin.username);
    console.log('Password match:', password === config.admin.password);
    console.log('====================');

    if (username === config.admin.username && password === config.admin.password) {
        const token = jwt.sign(
            { username: config.admin.username },
            config.security.jwtSecret,
            { expiresIn: '24h' }
        );

        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: config.server.env === 'production',
            sameSite: 'lax', // Important for local development
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        console.log('Cookie set successfully');
        console.log('Token created:', token.substring(0, 20) + '...');

        res.json({ success: true, message: 'تم تسجيل الدخول بنجاح' });
    } else {
        console.log('Login failed - credentials mismatch');
        res.status(401).json({ 
            success: false, 
            message: 'اسم المستخدم أو كلمة المرور غير صحيحة',
            debug: {
                receivedUsername: username,
                receivedPassword: password ? '***' : undefined,
                expectedUsername: config.admin.username,
                usernameMatch: username === config.admin.username,
                passwordMatch: password === config.admin.password
            }
        });
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

// API: Get Settings
router.get('/api/settings', authenticateAdmin, (req, res) => {
    res.json({
        success: true,
        data: {
            site: config.site,
            contact: config.contact,
            social: config.social,
            services: config.services,
            hero: config.hero
        }
    });
});

// API: Update Settings
router.put('/api/settings', authenticateAdmin, async (req, res) => {
    const fs = require('fs');
    const path = require('path');
    
    try {
        const { site, contact, social, services, hero } = req.body;
        
        // Read current .env file
        const envPath = path.join(__dirname, '../.env');
        let envContent = '';
        
        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf8');
        }
        
        // Update or add environment variables
        const updates = {
            'SITE_NAME': site.name,
            'SITE_NAME_AR': site.nameAr,
            'SITE_URL': site.url,
            'SITE_EMAIL': site.email,
            'PHONE_PRIMARY': contact.phone.primary,
            'PHONE_SECONDARY': contact.phone.secondary,
            'EMAIL_INFO': contact.email.info,
            'EMAIL_SALES': contact.email.sales,
            'EMAIL_SUPPORT': contact.email.support,
            'ADDRESS_CITY': contact.address.city,
            'ADDRESS_STREET': contact.address.street,
            'ADDRESS_COUNTRY': contact.address.country,
            'FACEBOOK_URL': social.facebook || '',
            'INSTAGRAM_URL': social.instagram || '',
            'LINKEDIN_URL': social.linkedin || '',
            'TWITTER_URL': social.twitter || '',
            'SERVICES_TITLE': services ? services.title : '',
            'SERVICES_SUBTITLE': services ? services.subtitle : '',
            'HERO_TITLE': hero ? hero.title : '',
            'HERO_SUBTITLE': hero ? hero.subtitle : ''
            // HERO_IMAGES is managed separately via upload API, don't update it here
        };
        
        // Parse existing .env content
        const lines = envContent.split('\n');
        const newLines = [];
        const updatedKeys = new Set();
        
        // Update existing variables
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) {
                newLines.push(line);
                continue;
            }
            
            const match = trimmed.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                if (updates.hasOwnProperty(key)) {
                    newLines.push(`${key}=${updates[key]}`);
                    updatedKeys.add(key);
                    continue;
                }
            }
            newLines.push(line);
        }
        
        // Add new variables that don't exist
        for (const [key, value] of Object.entries(updates)) {
            if (!updatedKeys.has(key)) {
                newLines.push(`${key}=${value}`);
            }
        }
        
        // Write updated .env file
        fs.writeFileSync(envPath, newLines.join('\n'), 'utf8');
        
        // Update config object immediately (for current session)
        Object.assign(config.site, site);
        Object.assign(config.contact, contact);
        Object.assign(config.social, social);
        if (services) {
            Object.assign(config.services, services);
        }
        if (hero) {
            Object.assign(config.hero, hero);
        }
        
        // Also reload from .env for next request (optional)
        // Note: For full reload, server restart is recommended
        
        res.json({
            success: true,
            message: 'تم حفظ الإعدادات بنجاح'
        });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ أثناء حفظ الإعدادات: ' + error.message
        });
    }
});

// Settings Page
router.get('/settings', authenticateAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/settings.html'));
});

// ============================================
// File Upload Configuration
// ============================================

// Ensure upload directory exists (only if writable)
const uploadsDir = path.join(__dirname, '../uploads/hero');
const isNetlify = process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME;

// Only create directory if not on Netlify (read-only filesystem)
if (!isNetlify) {
    if (!fs.existsSync(uploadsDir)) {
        try {
            fs.mkdirSync(uploadsDir, { recursive: true });
        } catch (error) {
            console.warn('Could not create uploads directory:', error.message);
        }
    }
}

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'hero-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('يُسمح فقط بملفات الصور (JPEG, JPG, PNG, GIF, WEBP)'));
        }
    }
});

// API: Upload Hero Image
router.post('/api/hero/upload', authenticateAdmin, (req, res, next) => {
    // Check if we're on Netlify (read-only filesystem)
    const isNetlify = process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME;
    
    if (isNetlify) {
        return res.status(503).json({
            success: false,
            message: 'رفع الملفات غير متاح على Netlify. يرجى استخدام روابط الصور مباشرة في حقل HERO_IMAGES أو استخدام خدمة تخزين سحابية مثل Cloudinary.'
        });
    }
    
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Multer upload error:', err);
            let errorMessage = 'حدث خطأ أثناء رفع الصورة';
            
            if (err.code === 'LIMIT_FILE_SIZE') {
                errorMessage = 'حجم الملف كبير جداً. الحد الأقصى هو 5MB';
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            return res.status(400).json({
                success: false,
                message: errorMessage
            });
        }
        
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'لم يتم رفع أي ملف. يرجى التأكد من اختيار ملف صورة'
            });
        }
        
        next();
    });
}, (req, res) => {
    try {
        console.log('Upload request received:', {
            hasFile: !!req.file,
            file: req.file ? {
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                filename: req.file.filename,
                path: req.file.path
            } : null
        });

        // Get current images
        const currentImages = config.hero.images || [];
        
        // Check if we already have 5 images
        if (currentImages.length >= 5) {
            // Delete the uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                success: false,
                message: 'الحد الأقصى هو 5 صور. يرجى حذف صورة أولاً'
            });
        }

        // Add new image URL
        const imageUrl = `/uploads/hero/${req.file.filename}`;
        const updatedImages = [...currentImages, imageUrl];

        // Update .env file
        const envPath = path.join(__dirname, '../.env');
        let envContent = '';
        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf8');
        }

        // Update HERO_IMAGES in .env
        const lines = envContent.split('\n');
        const newLines = [];
        let found = false;

        for (const line of lines) {
            if (line.trim().startsWith('HERO_IMAGES=')) {
                newLines.push(`HERO_IMAGES=${updatedImages.join(',')}`);
                found = true;
            } else {
                newLines.push(line);
            }
        }

        if (!found) {
            newLines.push(`HERO_IMAGES=${updatedImages.join(',')}`);
        }

        fs.writeFileSync(envPath, newLines.join('\n'), 'utf8');

        // Reload dotenv to update process.env
        require('dotenv').config({ path: envPath });

        // Update config object
        config.hero.images = updatedImages;
        
        // Also update process.env for consistency
        process.env.HERO_IMAGES = updatedImages.join(',');

        console.log('Updated hero images:', updatedImages);

        res.json({
            success: true,
            message: 'تم رفع الصورة بنجاح',
            imageUrl: imageUrl,
            images: updatedImages
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: 'حدث خطأ أثناء رفع الصورة: ' + error.message
        });
    }
});

// API: Delete Hero Image
router.delete('/api/hero/image/:filename', authenticateAdmin, (req, res) => {
    // Check if we're on Netlify (read-only filesystem)
    const isNetlify = process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME;
    
    if (isNetlify) {
        return res.status(503).json({
            success: false,
            message: 'حذف الملفات غير متاح على Netlify. يرجى تحديث HERO_IMAGES في Environment Variables.'
        });
    }
    
    try {
        const filename = req.params.filename;
        const imagePath = path.join(uploadsDir, filename);

        // Check if file exists
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({
                success: false,
                message: 'الصورة غير موجودة'
            });
        }

        // Get current images
        const currentImages = config.hero.images || [];
        
        // Remove from array
        const updatedImages = currentImages.filter(img => {
            const imgFilename = img.split('/').pop();
            return imgFilename !== filename;
        });

        // Delete file
        fs.unlinkSync(imagePath);

        // Update .env file
        const envPath = path.join(__dirname, '../.env');
        let envContent = '';
        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf8');
        }

        const lines = envContent.split('\n');
        const newLines = [];

        for (const line of lines) {
            if (line.trim().startsWith('HERO_IMAGES=')) {
                newLines.push(`HERO_IMAGES=${updatedImages.join(',')}`);
            } else {
                newLines.push(line);
            }
        }

        fs.writeFileSync(envPath, newLines.join('\n'), 'utf8');

        // Reload dotenv to update process.env
        require('dotenv').config({ path: envPath });

        // Update config object
        config.hero.images = updatedImages;
        
        // Also update process.env for consistency
        process.env.HERO_IMAGES = updatedImages.length > 0 ? updatedImages.join(',') : '';

        console.log('Updated hero images after delete:', updatedImages);

        res.json({
            success: true,
            message: 'تم حذف الصورة بنجاح',
            images: updatedImages
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ أثناء حذف الصورة: ' + error.message
        });
    }
});

// API: Get Hero Images
router.get('/api/hero/images', authenticateAdmin, (req, res) => {
    try {
        const images = config.hero.images || [];
        res.json({
            success: true,
            images: images
        });
    } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ أثناء جلب الصور'
        });
    }
});

// API: Get Legal Content
router.get('/api/legal', authenticateAdmin, (req, res) => {
    const fs = require('fs');
    const legalPath = path.join(__dirname, '../data/legal-content.json');
    
    try {
        if (fs.existsSync(legalPath)) {
            const legalContent = JSON.parse(fs.readFileSync(legalPath, 'utf8'));
            res.json({
                success: true,
                data: legalContent
            });
        } else {
            // Return default empty content
            res.json({
                success: true,
                data: {
                    privacy: { lastUpdated: '', content: '' },
                    terms: { lastUpdated: '', content: '' }
                }
            });
        }
    } catch (error) {
        console.error('Error reading legal content:', error);
        res.status(500).json({
            success: false,
            message: 'خطأ في قراءة المحتوى القانوني'
        });
    }
});

// API: Update Legal Content
router.put('/api/legal', authenticateAdmin, async (req, res) => {
    const fs = require('fs');
    const legalPath = path.join(__dirname, '../data/legal-content.json');
    
    try {
        const { type, lastUpdated, content } = req.body;
        
        if (!type || (type !== 'privacy' && type !== 'terms')) {
            return res.status(400).json({
                success: false,
                message: 'نوع المحتوى غير صحيح'
            });
        }
        
        // Read existing content
        let legalContent = {
            privacy: { lastUpdated: '', content: '' },
            terms: { lastUpdated: '', content: '' }
        };
        
        if (fs.existsSync(legalPath)) {
            legalContent = JSON.parse(fs.readFileSync(legalPath, 'utf8'));
        }
        
        // Update the specific type
        legalContent[type] = {
            lastUpdated: lastUpdated || legalContent[type].lastUpdated,
            content: content || ''
        };
        
        // Ensure data directory exists
        const dataDir = path.join(__dirname, '../data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        // Write updated content
        fs.writeFileSync(legalPath, JSON.stringify(legalContent, null, 2), 'utf8');
        
        res.json({
            success: true,
            message: 'تم حفظ المحتوى القانوني بنجاح'
        });
    } catch (error) {
        console.error('Error updating legal content:', error);
        res.status(500).json({
            success: false,
            message: 'حدث خطأ أثناء حفظ المحتوى: ' + error.message
        });
    }
});

// Legal Content Page
router.get('/legal', authenticateAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/legal.html'));
});

module.exports = router;
