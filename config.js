// ============================================
// ShamSecure - Configuration Loader
// ============================================

// Load environment variables
require('dotenv').config();

const config = {
    // Site Information
    site: {
        name: process.env.SITE_NAME || 'ShamSecure',
        nameAr: process.env.SITE_NAME_AR || 'شام سكيور',
        url: process.env.SITE_URL || 'http://localhost:3000',
        email: process.env.SITE_EMAIL || 'info@shamsecure.sy'
    },

    // Services Header
    services: {
        title: process.env.SERVICES_TITLE || 'خدماتنا',
        subtitle: process.env.SERVICES_SUBTITLE || 'حلول أمنية شاملة مصممة لاحتياجاتك'
    },

    // Hero Section
    hero: {
        title: process.env.HERO_TITLE || 'حمايتك هي أولويتنا',
        subtitle: process.env.HERO_SUBTITLE || 'نقدم حلول أمنية متكاملة وموثوقة لضمان سلامتك وسلامة ممتلكاتك',
        images: process.env.HERO_IMAGES ? process.env.HERO_IMAGES.split(',').map(img => img.trim()) : []
    },

    // Contact Information
    contact: {
        phone: {
            primary: process.env.PHONE_PRIMARY || '+963 11 123 4567',
            secondary: process.env.PHONE_SECONDARY || '+963 11 123 4568'
        },
        email: {
            info: process.env.EMAIL_INFO || 'info@shamsecure.sy',
            sales: process.env.EMAIL_SALES || 'sales@shamsecure.sy',
            support: process.env.EMAIL_SUPPORT || 'support@shamsecure.sy'
        },
        address: {
            city: process.env.ADDRESS_CITY || 'دمشق',
            street: process.env.ADDRESS_STREET || 'شارع الرئيسي، مبنى رقم 123',
            country: process.env.ADDRESS_COUNTRY || 'سوريا'
        }
    },

    // Social Media
    social: {
        facebook: process.env.FACEBOOK_URL || '',
        instagram: process.env.INSTAGRAM_URL || '',
        linkedin: process.env.LINKEDIN_URL || '',
        twitter: process.env.TWITTER_URL || ''
    },

    // Email Configuration
    email: {
        smtp: {
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            user: process.env.SMTP_USER || '',
            pass: process.env.SMTP_PASS || ''
        },
        from: {
            name: process.env.SMTP_FROM_NAME || 'ShamSecure',
            email: process.env.SMTP_FROM_EMAIL || 'noreply@shamsecure.sy'
        },
        recipients: {
            admin: process.env.ADMIN_EMAIL || 'admin@shamsecure.sy',
            quote: process.env.QUOTE_EMAIL || 'quotes@shamsecure.sy',
            contact: process.env.CONTACT_EMAIL || 'contact@shamsecure.sy'
        }
    },

    // Admin Panel
    admin: {
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        secretKey: process.env.ADMIN_SECRET_KEY || 'change-this-secret'
    },

    // API Configuration
    api: {
        key: process.env.API_KEY || 'default-api-key',
        enabled: process.env.API_ENABLED !== 'false'
    },

    // Google Services
    google: {
        analyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
        mapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ''
    },

    // Security
    security: {
        sessionSecret: process.env.SESSION_SECRET || 'change-this-secret',
        jwtSecret: process.env.JWT_SECRET || 'change-this-jwt-secret'
    },

    // Server Configuration
    server: {
        port: parseInt(process.env.PORT) || 3000,
        env: process.env.NODE_ENV || 'development'
    }
};

module.exports = config;
