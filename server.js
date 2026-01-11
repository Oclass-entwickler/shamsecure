// ============================================
// ShamSecure - Production Server
// ============================================

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const emailService = require('./services/emailService');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = config.server.port;

// ============================================
// Middleware
// ============================================

// Security Headers
app.use(helmet({
    contentSecurityPolicy: false, // Allow inline scripts for simplicity
    crossOriginEmbedderPolicy: false
}));

// CORS
app.use(cors());

// Cookie Parser
app.use(cookieParser());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Static Files
app.use(express.static(path.join(__dirname, '.')));

// ============================================
// Routes
// ============================================

// API Routes
app.use('/api', apiRoutes);

// Admin Routes
app.use('/admin', adminRoutes);

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'services.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, 'faq.html'));
});

app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, 'privacy.html'));
});

app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, 'terms.html'));
});

// ============================================
// Error Handling
// ============================================

app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    console.error('Error message:', err.message);
    console.error('Request path:', req.path);
    console.error('Request method:', req.method);
    
    // In development, send more details
    const isDevelopment = config.server.env !== 'production';
    
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        ...(isDevelopment && {
            error: err.message,
            stack: err.stack
        })
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// ============================================
// Start Server
// ============================================

// Only start listening if not in serverless environment
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 ShamSecure server running on port ${PORT}`);
        console.log(`📧 Email service: ${config.email.smtp.user ? 'Configured' : 'Not configured'}`);
        console.log(`🌐 Environment: ${config.server.env}`);
        console.log(`📍 Site URL: ${config.site.url}`);
    });
}

module.exports = app;
