# 🚀 Netlify Deployment Guide - ShamSecure

## ✅ Vorbereitung Checkliste

### 1. Environment Variables in Netlify setzen

Gehen Sie zu **Netlify Dashboard** → **Site settings** → **Environment variables** und fügen Sie hinzu:

#### Erforderliche Variablen:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ihr_sicheres_passwort
JWT_SECRET=ein_langer_zufaelliger_string
NODE_ENV=production
PORT=8888
```

#### Site Information:
```
SITE_NAME=ShamSecure
SITE_NAME_AR=شام سكيور
SITE_URL=https://ihre-domain.netlify.app
SITE_EMAIL=info@shamsecure.sy
```

#### Contact Information:
```
PHONE_PRIMARY=+963 11 123 4567
PHONE_SECONDARY=+963 11 123 4568
EMAIL_INFO=info@shamsecure.sy
EMAIL_SALES=sales@shamsecure.sy
EMAIL_SUPPORT=support@shamsecure.sy
ADDRESS_CITY=دمشق
ADDRESS_STREET=شارع الرئيسي
ADDRESS_COUNTRY=سوريا
```

#### Social Media (optional):
```
FACEBOOK_URL=https://facebook.com/...
INSTAGRAM_URL=https://instagram.com/...
LINKEDIN_URL=https://linkedin.com/...
TWITTER_URL=https://twitter.com/...
```

#### Hero & Services:
```
HERO_TITLE=حمايتك هي أولويتنا
HERO_SUBTITLE=نقدم حلول أمنية متكاملة وموثوقة لضمان سلامتك وسلامة ممتلكاتك
HERO_IMAGES=
SERVICES_TITLE=خدماتنا
SERVICES_SUBTITLE=حلول أمنية شاملة مصممة لاحتياجاتك
```

#### Email Configuration:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ihre-email@gmail.com
SMTP_PASS=ihr-app-passwort
SMTP_FROM=ShamSecure <ihre-email@gmail.com>
```

### 2. ⚠️ WICHTIG: File Upload Problem auf Netlify

**Netlify Serverless Functions haben ein READ-ONLY Dateisystem!**

Das bedeutet:
- ❌ Lokale File-Uploads funktionieren NICHT auf Netlify
- ✅ Sie müssen einen Cloud-Storage-Service verwenden

#### Lösungen:

**Option 1: Netlify Blobs (Empfohlen)**
- Netlify's eigener Storage-Service
- Einfach zu integrieren
- Kostenlos für kleine Projekte

**Option 2: Cloudinary**
- Kostenloser Plan verfügbar
- Einfache Integration
- Automatische Bildoptimierung

**Option 3: AWS S3**
- Sehr zuverlässig
- Kostengünstig
- Benötigt AWS Account

### 3. Deployment-Schritte

1. **Repository zu GitHub pushen:**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Netlify Site erstellen:**
   - Gehen Sie zu [netlify.com](https://netlify.com)
   - Klicken Sie auf "Add new site" → "Import an existing project"
   - Wählen Sie Ihr GitHub Repository
   - Netlify erkennt automatisch `netlify.toml`

3. **Environment Variables setzen:**
   - Siehe Schritt 1 oben

4. **Deploy!**
   - Netlify deployt automatisch
   - Warten Sie auf "Site is live"

### 4. Nach dem Deployment

1. **Testen Sie die Website:**
   - Öffnen Sie: `https://ihre-site.netlify.app`
   - Überprüfen Sie alle Seiten

2. **Testen Sie Admin-Login:**
   - Gehen Sie zu: `https://ihre-site.netlify.app/admin/login`
   - Login mit: `admin` / `ihr_passwort`

3. **⚠️ File Upload funktioniert NICHT:**
   - Sie müssen zuerst einen Cloud-Storage integrieren
   - Siehe Optionen oben

## 🔧 File Upload Fix für Netlify

### Option 1: Netlify Blobs (Empfohlen)

1. Installieren Sie `@netlify/blobs`:
   ```bash
   npm install @netlify/blobs
   ```

2. Aktualisieren Sie `routes/admin.js`:
   ```javascript
   const { getStore } = require('@netlify/blobs');
   
   // In der Upload-Route:
   const store = getStore('hero-images');
   await store.set(filename, fileBuffer);
   ```

### Option 2: Temporäre Lösung

Für jetzt können Sie:
- Bilder manuell hochladen (z.B. via Netlify CMS)
- Oder URLs in `HERO_IMAGES` direkt eingeben

## 📋 Deployment Checkliste

- [ ] Alle Environment Variables in Netlify gesetzt
- [ ] Repository zu GitHub gepusht
- [ ] Netlify Site erstellt
- [ ] Build erfolgreich
- [ ] Website funktioniert
- [ ] Admin-Login funktioniert
- [ ] ⚠️ File Upload: Cloud-Storage integriert (oder temporär deaktiviert)

## 🆘 Troubleshooting

### Problem: 404 auf `/admin/login`
**Lösung:** Überprüfen Sie:
- Ist `netlify/functions/admin.js` vorhanden?
- Sind alle Dependencies in `package.json`?
- Wurde `npm install` im Build ausgeführt?

### Problem: Environment Variables werden nicht geladen
**Lösung:** 
- Überprüfen Sie Netlify Dashboard → Environment variables
- Stellen Sie sicher, dass sie für "Production" gesetzt sind
- Redeploy nach Änderungen

### Problem: File Upload gibt Fehler
**Lösung:**
- Das ist normal! Netlify Functions können nicht in das Dateisystem schreiben
- Integrieren Sie Cloud-Storage (siehe oben)

## 📞 Support

Bei Problemen:
1. Überprüfen Sie die Netlify Build-Logs
2. Überprüfen Sie die Function-Logs
3. Testen Sie lokal mit `netlify dev`

---

**Viel Erfolg beim Deployment! 🎉**
