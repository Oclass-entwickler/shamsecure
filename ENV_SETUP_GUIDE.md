# 🔐 Environment Variables Setup Guide - ShamSecure

## ⚠️ WICHTIG: .env Datei wird beim Deployment NICHT automatisch verwendet!

Wenn Sie auf **Netlify** oder **Vercel** deployen, müssen Sie die Environment Variables **manuell im Dashboard** setzen.

---

## 🚨 Ihr Problem:

1. ✅ Sie haben `.env` lokal aktualisiert
2. ❌ Beim Deployment werden die Werte nicht übernommen
3. ❌ Admin Login funktioniert nicht (verwendet Standardwerte)

**Lösung:** Setzen Sie die Variablen im Deployment-Dashboard!

---

## 📋 Schnelllösung für Admin Login:

### Für Vercel:

1. Gehen Sie zu [vercel.com](https://vercel.com) → Ihr Projekt
2. **Settings** → **Environment Variables**
3. Fügen Sie hinzu:
   - **Key**: `ADMIN_USERNAME` → **Value**: `admin`
   - **Key**: `ADMIN_PASSWORD` → **Value**: `12345`
   - Wählen Sie **Production**, **Preview**, und **Development**
4. Klicken Sie **Save**
5. **Redeployen Sie:**
   - Gehen Sie zu **Deployments**
   - Klicken Sie auf **⋯** → **Redeploy**

### Für Netlify:

1. Gehen Sie zu [netlify.com](https://netlify.com) → Ihre Site
2. **Site settings** → **Environment variables**
3. Fügen Sie hinzu:
   - **Key**: `ADMIN_USERNAME` → **Value**: `admin`
   - **Key**: `ADMIN_PASSWORD` → **Value**: `12345`
   - **Scopes**: Wählen Sie **All scopes**
4. Klicken Sie **Save**
5. **Trigger einen neuen Deploy:**
   - Gehen Sie zu **Deploys**
   - Klicken Sie auf **Trigger deploy** → **Deploy site**

---

## 📝 Alle wichtigen Environment Variables:

Kopieren Sie diese Liste und fügen Sie alle Variablen in das Dashboard ein:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=12345
ADMIN_SECRET_KEY=<ein-zufälliger-string>
JWT_SECRET=<ein-zufälliger-string>
SESSION_SECRET=<ein-zufälliger-string>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ihre-email@gmail.com
SMTP_PASS=ihr-app-passwort
SITE_URL=https://ihre-domain.com
NODE_ENV=production
PORT=3000
```

**Wichtig:** Ersetzen Sie die Platzhalter (`<...>`) mit echten Werten!

---

## 🔍 So überprüfen Sie ob es funktioniert:

1. **Nach dem Redeploy**, gehen Sie zu `/admin/login`
2. Versuchen Sie sich einzuloggen mit:
   - Username: `admin`
   - Password: `12345`
3. Wenn es funktioniert → ✅ Erfolg!
4. Wenn nicht → Überprüfen Sie:
   - Sind die Variablen im Dashboard gesetzt?
   - Haben Sie nach dem Setzen **redeployt**?
   - Sind die Werte **genau** so wie in Ihrer `.env` Datei?

---

## 📚 Detaillierte Anleitung:

Für eine vollständige Anleitung siehe: **`DEPLOYMENT_ENV_VARIABLES.md`**

---

**Nach dem Setzen der Variablen und Redeploy sollte der Admin Login funktionieren! 🎉**
