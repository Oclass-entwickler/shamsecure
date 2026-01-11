# 🚀 دليل النشر (Deployment Guide) - ShamSecure

## نظرة عامة

هذا الدليل يشرح كيفية نشر موقع ShamSecure على الإنترنت.

---

## 📋 المتطلبات الأساسية

- حساب استضافة ويب (Web Hosting)
- اسم نطاق (Domain Name) - اختياري
- برنامج FTP أو وصول SSH (حسب نوع الاستضافة)

---

## 🎯 خيارات النشر

### 1. النشر على استضافة تقليدية (Shared Hosting)

#### الخطوات:

1. **تحضير الملفات**
   ```bash
   # تأكد من وجود جميع الملفات:
   - index.html
   - services.html
   - about.html
   - contact.html
   - faq.html
   - privacy.html
   - terms.html
   - styles.css
   - script.js
   - .htaccess (للخوادم Apache)
   ```

2. **رفع الملفات عبر FTP**
   - استخدم برنامج مثل FileZilla أو WinSCP
   - اتصل بخادم الاستضافة
   - ارفع جميع الملفات إلى مجلد `public_html` أو `www` أو `htdocs`

3. **التحقق من الموقع**
   - افتح المتصفح وانتقل إلى: `http://yourdomain.com`
   - تأكد من عمل جميع الصفحات

---

### 2. النشر على GitHub Pages (مجاني)

#### الخطوات:

1. **إنشاء مستودع GitHub**
   ```bash
   # على جهازك المحلي
   git init
   git add .
   git commit -m "Initial commit - ShamSecure website"
   git branch -M main
   git remote add origin https://github.com/yourusername/shamsecure.git
   git push -u origin main
   ```

2. **تفعيل GitHub Pages**
   - اذهب إلى Settings في المستودع
   - اختر Pages من القائمة الجانبية
   - اختر Branch: `main` و Folder: `/ (root)`
   - اضغط Save

3. **الوصول للموقع**
   - الموقع سيكون متاحاً على: `https://yourusername.github.io/shamsecure`

---

### 3. النشر على Netlify (مجاني وسهل)

#### الخطوات:

1. **الطريقة الأولى: السحب والإفلات**
   - اذهب إلى [netlify.com](https://netlify.com)
   - سجل حساب مجاني
   - اسحب مجلد المشروع وأفلته في Netlify

2. **الطريقة الثانية: عبر Git**
   - اربط مستودع GitHub مع Netlify
   - Netlify سينشر الموقع تلقائياً

3. **النتيجة**
   - ستحصل على رابط مثل: `https://shamsecure.netlify.app`
   - يمكنك إضافة اسم نطاق مخصص

---

### 4. النشر على Vercel (مجاني وسريع)

#### الخطوات:

1. **تثبيت Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **النشر**
   ```bash
   cd /path/to/security
   vercel
   ```

3. **أو عبر الموقع**
   - اذهب إلى [vercel.com](https://vercel.com)
   - اربط مستودع GitHub
   - Vercel سينشر الموقع تلقائياً

---

## 🔧 الإعدادات المهمة بعد النشر

### 1. إعداد HTTPS (SSL Certificate)

**للاستضافة التقليدية:**
- معظم الاستضافات توفر SSL مجاناً (Let's Encrypt)
- فعّل SSL من لوحة التحكم (cPanel)
- فعّل إعادة التوجيه من HTTP إلى HTTPS في `.htaccess`

**لـ Netlify/Vercel:**
- HTTPS مفعّل تلقائياً

### 2. إعداد اسم النطاق المخصص

**للاستضافة التقليدية:**
- أضف اسم النطاق من لوحة التحكم
- غيّر DNS records إلى خوادم الاستضافة

**لـ Netlify:**
- Settings → Domain management → Add custom domain
- اتبع التعليمات لتغيير DNS

**لـ Vercel:**
- Project Settings → Domains → Add Domain

### 3. تحديث معلومات الاتصال

بعد النشر، تأكد من تحديث:
- أرقام الهواتف الحقيقية في جميع الصفحات
- عناوين البريد الإلكتروني
- العنوان الفعلي للشركة

---

## 📝 خطوات ما بعد النشر

### 1. اختبار الموقع

- [ ] افتح جميع الصفحات وتأكد من عملها
- [ ] اختبر النماذج (Contact Form, Quote Form)
- [ ] اختبر على الهاتف المحمول
- [ ] اختبر على متصفحات مختلفة (Chrome, Firefox, Safari)

### 2. ربط النماذج بخادم خلفي

حالياً النماذج تعرض إشعارات فقط. لربطها بخادم:

**خيارات:**
- استخدام خدمة مثل Formspree أو Netlify Forms
- إنشاء API endpoint خاص
- استخدام PHP script بسيط

**مثال: Formspree**
```html
<!-- في contact.html -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- حقول النموذج -->
</form>
```

### 3. إضافة Google Analytics

أضف هذا الكود قبل `</head>` في جميع الصفحات:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 4. إضافة Google Maps

في `contact.html`، استبدل قسم الخريطة بـ:
```html
<iframe 
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
  width="100%" 
  height="450" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy">
</iframe>
```

---

## 🚀 أوامر سريعة للنشر

### النشر على Netlify (CLI)
```bash
npm install -g netlify-cli
netlify deploy
netlify deploy --prod
```

### النشر على Vercel (CLI)
```bash
npm install -g vercel
vercel
vercel --prod
```

### النشر عبر Git
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

---

## 🔍 التحقق من الأداء

بعد النشر، اختبر الموقع على:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

---

## 📞 الدعم

إذا واجهت مشاكل في النشر:
1. تحقق من أن جميع الملفات موجودة
2. تأكد من أن `.htaccess` موجود (للخوادم Apache)
3. تحقق من أذونات الملفات (755 للمجلدات، 644 للملفات)
4. راجع سجلات الأخطاء في لوحة التحكم

---

## ✅ قائمة التحقق النهائية

- [ ] جميع الملفات مرفوعة
- [ ] الموقع يعمل على جميع الصفحات
- [ ] HTTPS مفعّل
- [ ] اسم النطاق مرتبط (إن وجد)
- [ ] النماذج مربوطة بخادم خلفي
- [ ] Google Analytics مثبت (اختياري)
- [ ] الخريطة محدثة (إن أضفتها)
- [ ] معلومات الاتصال محدثة
- [ ] الموقع سريع ومحسّن

---

**تم النشر بنجاح! 🎉**
