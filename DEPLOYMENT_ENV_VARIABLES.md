# 🔐 Environment Variables für Deployment - ShamSecure

## ⚠️ WICHTIG: .env Datei wird beim Deployment NICHT automatisch verwendet!

Wenn Sie auf **Netlify** oder **Vercel** deployen, müssen Sie die Environment Variables **manuell im Dashboard** setzen.

---

## 📋 Schritt-für-Schritt Anleitung

### Für Vercel:

1. **Gehen Sie zu Ihrem Vercel Dashboard**
   - Öffnen Sie [vercel.com](https://vercel.com)
   - Wählen Sie Ihr Projekt aus

2. **Öffnen Sie Project Settings**
   - Klicken Sie auf Ihr Projekt
   - Gehen Sie zu **Settings** → **Environment Variables**

3. **Fügen Sie alle Variablen hinzu**
   - Klicken Sie auf **Add New**
   - Fügen Sie jede Variable einzeln hinzu:
     - **Key**: `ADMIN_USERNAME`
     - **Value**: `admin`
     - **Environment**: Wählen Sie `Production`, `Preview`, und `Development`
   - Wiederholen Sie dies für alle Variablen

4. **Wichtige Variablen die Sie setzen müssen:**
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

5. **Redeployen Sie das Projekt**
   - Gehen Sie zu **Deployments**
   - Klicken Sie auf die drei Punkte (⋯) neben dem letzten Deployment
   - Wählen Sie **Redeploy**

---

### Für Netlify:

1. **Gehen Sie zu Ihrem Netlify Dashboard**
   - Öffnen Sie [netlify.com](https://netlify.com)
   - Wählen Sie Ihre Site aus

2. **Öffnen Sie Site Settings**
   - Gehen Sie zu **Site settings** → **Environment variables**

3. **Fügen Sie alle Variablen hinzu**
   - Klicken Sie auf **Add a variable**
   - Fügen Sie jede Variable hinzu:
     - **Key**: `ADMIN_USERNAME`
     - **Value**: `admin`
     - **Scopes**: Wählen Sie `All scopes` oder spezifische Scopes
   - Wiederholen Sie dies für alle Variablen

4. **Wichtige Variablen die Sie setzen müssen:**
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

5. **Trigger einen neuen Deploy**
   - Gehen Sie zu **Deploys**
   - Klicken Sie auf **Trigger deploy** → **Deploy site**

---

## 🔍 So überprüfen Sie ob die Variablen gesetzt sind:

### In Vercel:
1. Gehen Sie zu **Deployments**
2. Klicken Sie auf ein Deployment
3. Gehen Sie zu **Runtime Logs**
4. Die Variablen sollten in den Logs sichtbar sein (wenn Sie sie loggen)

### In Netlify:
1. Gehen Sie zu **Deploys**
2. Klicken Sie auf ein Deployment
3. Gehen Sie zu **Deploy log**
4. Überprüfen Sie ob die Variablen geladen wurden

---

## 🚨 Häufige Probleme:

### Problem: Admin Login funktioniert nicht
**Lösung:**
- Überprüfen Sie ob `ADMIN_USERNAME` und `ADMIN_PASSWORD` in den Environment Variables gesetzt sind
- Stellen Sie sicher, dass die Werte **genau** so sind wie in Ihrer `.env` Datei
- **Redeployen** Sie nach dem Setzen der Variablen

### Problem: .env Datei wird nicht verwendet
**Lösung:**
- Das ist normal! `.env` Dateien werden beim Deployment **nicht** automatisch verwendet
- Sie **müssen** die Variablen im Dashboard setzen
- Die `.env` Datei wird nur lokal verwendet

### Problem: Variablen werden nicht übernommen
**Lösung:**
- Stellen Sie sicher, dass Sie **nach dem Setzen** der Variablen **redeployen**
- Überprüfen Sie ob die Variablen für den richtigen **Scope** (Production/Preview) gesetzt sind
- Überprüfen Sie ob es **Tippfehler** in den Variablennamen gibt

---

## 📝 Checkliste:

- [ ] Alle Environment Variables im Dashboard gesetzt
- [ ] `ADMIN_USERNAME` und `ADMIN_PASSWORD` korrekt gesetzt
- [ ] `JWT_SECRET` und `SESSION_SECRET` auf sichere Werte geändert
- [ ] `SITE_URL` auf die Produktions-URL gesetzt
- [ ] `NODE_ENV=production` gesetzt
- [ ] Nach dem Setzen der Variablen redeployt
- [ ] Admin Login getestet

---

## 💡 Tipp:

Erstellen Sie eine Liste aller Variablen aus Ihrer `.env` Datei und kopieren Sie sie in das Dashboard. So stellen Sie sicher, dass nichts vergessen wird.

**Beispiel Liste:**
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=12345
ADMIN_SECRET_KEY=mein-geheimer-schlüssel-123
JWT_SECRET=mein-jwt-secret-456
SESSION_SECRET=mein-session-secret-789
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=meine-email@gmail.com
SMTP_PASS=mein-app-passwort
SITE_URL=https://shamsecure.netlify.app
NODE_ENV=production
PORT=3000
```

---

**Nach dem Setzen der Variablen und Redeploy sollte alles funktionieren! 🎉**
