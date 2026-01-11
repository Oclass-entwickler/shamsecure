# ⚡ دليل البدء السريع - ShamSecure

## 🚀 النشر السريع (5 دقائق)

### الطريقة الأسهل: Netlify (موصى بها)

1. **اذهب إلى [netlify.com](https://netlify.com)**
   - سجل حساب مجاني (أو سجل دخول)

2. **اسحب وأفلت مجلد المشروع**
   - افتح مجلد `security` على جهازك
   - اسحبه إلى نافذة Netlify في المتصفح
   - انتظر حتى ينتهي الرفع

3. **تم! 🎉**
   - ستحصل على رابط مثل: `https://random-name-123.netlify.app`
   - يمكنك تغيير الاسم من Settings → Site details → Change site name

---

### طريقة بديلة: GitHub Pages

1. **أنشئ مستودع جديد على GitHub**
   ```bash
   # في مجلد المشروع
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/shamsecure.git
   git push -u origin main
   ```

2. **فعّل GitHub Pages**
   - اذهب إلى Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, Folder: / (root)
   - Save

3. **الموقع جاهز!**
   - `https://YOUR_USERNAME.github.io/shamsecure`

---

### طريقة أخرى: Vercel

1. **ثبّت Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **انشر**
   ```bash
   cd security
   vercel
   ```

3. **اتبع التعليمات**
   - اضغط Enter للقيم الافتراضية
   - الموقع سينشر تلقائياً

---

## 📝 ملاحظات مهمة

### قبل النشر:
- ✅ تأكد من تحديث أرقام الهواتف الحقيقية
- ✅ حدّث عناوين البريد الإلكتروني
- ✅ راجع جميع النصوص

### بعد النشر:
- 🔗 أضف اسم نطاق مخصص (اختياري)
- 📧 ربط النماذج بخادم خلفي (Formspree أو Netlify Forms)
- 📊 أضف Google Analytics (اختياري)

---

## 🆘 مشاكل شائعة

**المشكلة:** الموقع لا يظهر
- **الحل:** تأكد من رفع جميع الملفات، خاصة `index.html`

**المشكلة:** الصور أو CSS لا تعمل
- **الحل:** تحقق من المسارات في الملفات

**المشكلة:** النماذج لا تعمل
- **الحل:** هذا طبيعي، تحتاج ربطها بخادم خلفي (راجع DEPLOYMENT.md)

---

## 📞 الخطوات التالية

1. ✅ انشر الموقع
2. ✅ اختبر جميع الصفحات
3. ✅ ربط النماذج بخادم خلفي
4. ✅ أضف Google Analytics
5. ✅ أضف اسم نطاق مخصص

**للمزيد من التفاصيل، راجع `DEPLOYMENT.md`**
