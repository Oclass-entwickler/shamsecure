// ============================================
// ShamSecure - Email Service
// ============================================

const nodemailer = require('nodemailer');
const config = require('../config');

// Create transporter
let transporter = null;

if (config.email.smtp.user && config.email.smtp.pass) {
    transporter = nodemailer.createTransport({
        host: config.email.smtp.host,
        port: config.email.smtp.port,
        secure: config.email.smtp.secure,
        auth: {
            user: config.email.smtp.user,
            pass: config.email.smtp.pass
        }
    });
}

// ============================================
// Email Templates
// ============================================

const contactEmailTemplate = (data) => {
    return `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1a4d7a; color: white; padding: 20px; text-align: center; }
                .content { background: #f5f5f5; padding: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #1a4d7a; }
                .value { margin-top: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>رسالة جديدة من موقع ShamSecure</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">الاسم:</div>
                        <div class="value">${data.name}</div>
                    </div>
                    <div class="field">
                        <div class="label">البريد الإلكتروني:</div>
                        <div class="value">${data.email}</div>
                    </div>
                    <div class="field">
                        <div class="label">الهاتف:</div>
                        <div class="value">${data.phone}</div>
                    </div>
                    <div class="field">
                        <div class="label">الموضوع:</div>
                        <div class="value">${data.subject}</div>
                    </div>
                    <div class="field">
                        <div class="label">الرسالة:</div>
                        <div class="value">${data.message}</div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};

const quoteEmailTemplate = (data) => {
    return `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1a4d7a; color: white; padding: 20px; text-align: center; }
                .content { background: #f5f5f5; padding: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #1a4d7a; }
                .value { margin-top: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>طلب عرض سعر جديد - ShamSecure</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">الاسم:</div>
                        <div class="value">${data.name}</div>
                    </div>
                    <div class="field">
                        <div class="label">البريد الإلكتروني:</div>
                        <div class="value">${data.email}</div>
                    </div>
                    <div class="field">
                        <div class="label">الهاتف:</div>
                        <div class="value">${data.phone}</div>
                    </div>
                    <div class="field">
                        <div class="label">الشركة:</div>
                        <div class="value">${data.company || 'غير محدد'}</div>
                    </div>
                    <div class="field">
                        <div class="label">نوع العميل:</div>
                        <div class="value">${data.clientType}</div>
                    </div>
                    <div class="field">
                        <div class="label">نوع الخدمة:</div>
                        <div class="value">${data.serviceType}</div>
                    </div>
                    <div class="field">
                        <div class="label">موقع الخدمة:</div>
                        <div class="value">${data.location}</div>
                    </div>
                    <div class="field">
                        <div class="label">مدة الخدمة:</div>
                        <div class="value">${data.duration || 'غير محدد'}</div>
                    </div>
                    <div class="field">
                        <div class="label">تفاصيل إضافية:</div>
                        <div class="value">${data.message || 'لا توجد تفاصيل إضافية'}</div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};

// ============================================
// Email Functions
// ============================================

const sendEmail = async (to, subject, html, text = '') => {
    if (!transporter) {
        console.error('Email transporter not configured');
        return { success: false, error: 'Email service not configured' };
    }

    try {
        const info = await transporter.sendMail({
            from: `"${config.email.from.name}" <${config.email.from.email}>`,
            to: to,
            subject: subject,
            text: text,
            html: html
        });

        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

const sendContactEmail = async (data) => {
    const html = contactEmailTemplate(data);
    const subject = `رسالة جديدة من ${data.name} - ${data.subject}`;
    
    // Send to admin
    const result = await sendEmail(
        config.email.recipients.contact,
        subject,
        html
    );

    // Send auto-reply to customer
    if (result.success) {
        const autoReplyHtml = `
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #1a4d7a;">شكراً لتواصلك مع ShamSecure</h2>
                    <p>عزيزي/عزيزتي ${data.name},</p>
                    <p>تم استلام رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت ممكن.</p>
                    <p>مع تحيات فريق ShamSecure</p>
                </div>
            </body>
            </html>
        `;
        
        await sendEmail(
            data.email,
            'تم استلام رسالتك - ShamSecure',
            autoReplyHtml
        );
    }

    return result;
};

const sendQuoteEmail = async (data) => {
    const html = quoteEmailTemplate(data);
    const subject = `طلب عرض سعر جديد من ${data.name}`;
    
    const result = await sendEmail(
        config.email.recipients.quote,
        subject,
        html
    );

    // Send confirmation to customer
    if (result.success) {
        const confirmationHtml = `
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #1a4d7a;">تم استلام طلب عرض السعر - ShamSecure</h2>
                    <p>عزيزي/عزيزتي ${data.name},</p>
                    <p>شكراً لاهتمامك بخدماتنا. تم استلام طلب عرض السعر الخاص بك وسنتواصل معك خلال 24 ساعة.</p>
                    <p>مع تحيات فريق ShamSecure</p>
                </div>
            </body>
            </html>
        `;
        
        await sendEmail(
            data.email,
            'تم استلام طلب عرض السعر - ShamSecure',
            confirmationHtml
        );
    }

    return result;
};

module.exports = {
    sendEmail,
    sendContactEmail,
    sendQuoteEmail,
    isConfigured: () => transporter !== null
};
