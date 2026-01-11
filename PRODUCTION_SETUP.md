# 🚀 دليل الإعداد للإنتاج - ShamSecure

## 📋 المتطلبات

- Node.js 14+ و npm
- حساب بريد إلكتروني (Gmail أو أي SMTP)
- خادم استضافة يدعم Node.js (أو استخدام Vercel/Netlify)

---

## 🔧 خطوات الإعداد

### 1. تثبيت المتطلبات

```bash
# في مجلد المشروع
npm install
```

### 2. إعداد ملف .env

```bash
# انسخ ملف المثال
cp .env.example .env

# افتح .env واملأ القيم
```

**القيم المهمة:**

```env
# معلومات الموقع
SITE_NAME=ShamSecure
SITE_NAME_AR=شام سكيور
SITE_URL=https://yourdomain.com

# معلومات الاتصال (حدّثها!)
PHONE_PRIMARY=+963 11 123 4567
PHONE_SECONDARY=+963 11 123 4568
EMAIL_INFO=info@shamsecure.sy
EMAIL_SALES=sales@shamsecure.sy

# إعدادات البريد الإلكتروني (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# لوحة التحكم
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-strong-password
ADMIN_SECRET_KEY=generate-random-string-here
```

### 3. إعداد Gmail SMTP

إذا كنت تستخدم Gmail:

1. فعّل "App Passwords" في حساب Google:
   - اذهب إلى [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - أنشئ كلمة مرور للتطبيق
   - استخدمها في `SMTP_PASS`

2. أو استخدم خدمة SMTP أخرى:
   - SendGrid
   - Mailgun
   - Amazon SES

### 4. تحديث معلومات الموقع

افتح `config.js` أو استخدم `.env` لتحديث:
- أرقام الهواتف
- عناوين البريد الإلكتروني
- روابط وسائل التواصل الاجتماعي
- العنوان

---

## 🚀 التشغيل

### التطوير (Development)

```bash
npm run dev
```

الموقع سيعمل على: `http://localhost:3000`

### الإنتاج (Production)

```bash
npm start
```

---

## 📦 النشر

### على Vercel (موصى به)

1. **ثبّت Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **انشر**
   ```bash
   vercel
   ```

3. **أضف متغيرات البيئة**
   - اذهب إلى Project Settings → Environment Variables
   - أضف جميع المتغيرات من `.env`

4. **إعادة النشر**
   ```bash
   vercel --prod
   ```

### على Netlify

1. **أنشئ ملف `netlify.toml`** (موجود بالفعل)

2. **أضف Build Command:**
   ```toml
   [build]
     command = "npm install && npm start"
   ```

3. **أضف Environment Variables:**
   - Site Settings → Environment Variables
   - أضف جميع المتغيرات من `.env`

### على استضافة Node.js تقليدية

1. **ارفع الملفات عبر FTP/SSH**

2. **ثبّت المتطلبات**
   ```bash
   npm install --production
   ```

3. **أضف ملف `.env`**

4. **استخدم PM2 لإدارة العملية**
   ```bash
   npm install -g pm2
   pm2 start server.js --name shamsecure
   pm2 save
   pm2 startup
   ```

---

## 🔐 الأمان

### قبل النشر:

1. ✅ غيّر `ADMIN_PASSWORD` إلى كلمة مرور قوية
2. ✅ غيّر `ADMIN_SECRET_KEY` إلى نص عشوائي
3. ✅ غيّر `SESSION_SECRET` و `JWT_SECRET`
4. ✅ فعّل HTTPS
5. ✅ أضف `NODE_ENV=production` في `.env`

### في الإنتاج:

- استخدم HTTPS دائماً
- فعّل Rate Limiting (مفعّل بالفعل)
- راجع سجلات الأخطاء بانتظام
- احتفظ بنسخ احتياطية

---

## 📧 اختبار البريد الإلكتروني

بعد الإعداد، اختبر النماذج:

1. اذهب إلى `/contact`
2. املأ النموذج وأرسله
3. تحقق من وصول البريد إلى `CONTACT_EMAIL`
4. تحقق من وصول الرد التلقائي للعميل

---

## 🎛️ لوحة التحكم

1. اذهب إلى `/admin/login`
2. سجّل الدخول باستخدام:
   - Username: من `ADMIN_USERNAME`
   - Password: من `ADMIN_PASSWORD`

**⚠️ مهم:** غيّر كلمة المرور فوراً بعد أول تسجيل دخول!

---

## 🔄 تحديث المعلومات

### لتحديث معلومات الاتصال:

1. **الطريقة 1: عبر .env**
   ```env
   PHONE_PRIMARY=+963 11 999 9999
   ```
   ثم أعد تشغيل الخادم

2. **الطريقة 2: مباشرة في config.js**
   - غير القيم في `config.js`
   - أعد تشغيل الخادم

### لتحديث محتوى الموقع:

- عدّل ملفات HTML مباشرة
- لا حاجة لإعادة التشغيل

---

## 📊 المراقبة

### Health Check

تحقق من حالة API:
```
GET /api/health
```

### السجلات

- سجلات الخادم: `console.log` في `server.js`
- سجلات البريد: في `services/emailService.js`

---

## 🆘 حل المشاكل

### البريد الإلكتروني لا يعمل

1. تحقق من إعدادات SMTP في `.env`
2. تأكد من صحة `SMTP_USER` و `SMTP_PASS`
3. للجيميل: استخدم App Password وليس كلمة المرور العادية
4. تحقق من فتح المنفذ 587

### لوحة التحكم لا تعمل

1. تحقق من `ADMIN_USERNAME` و `ADMIN_PASSWORD`
2. تأكد من `ADMIN_SECRET_KEY` و `JWT_SECRET`
3. امسح الكوكيز وأعد المحاولة

### الموقع لا يعمل بعد النشر

1. تحقق من أن جميع متغيرات `.env` موجودة في Vercel/Netlify
2. تحقق من السجلات (Logs)
3. تأكد من أن `PORT` صحيح

---

## ✅ قائمة التحقق النهائية

- [ ] تم تثبيت `npm install`
- [ ] تم إنشاء `.env` من `.env.example`
- [ ] تم تحديث جميع المعلومات في `.env`
- [ ] تم إعداد SMTP للبريد الإلكتروني
- [ ] تم تغيير كلمات المرور الافتراضية
- [ ] تم اختبار النماذج
- [ ] تم اختبار لوحة التحكم
- [ ] تم النشر على الخادم
- [ ] تم إضافة متغيرات البيئة في Vercel/Netlify
- [ ] تم تفعيل HTTPS
- [ ] الموقع يعمل بشكل صحيح

---

**🎉 موقعك جاهز للإنتاج!**
