# 🚀 Schnellstart-Anleitung - ShamSecure

## Installation

### 1. Abhängigkeiten installieren

```bash
npm install
```

### 2. Umgebungsvariablen einrichten

```bash
# Kopieren Sie die Beispiel-Datei
cp .env.example .env

# Bearbeiten Sie .env und füllen Sie Ihre Werte ein
```

### 3. Wichtige Einstellungen in .env

```env
# Kontaktinformationen (WICHTIG: Ändern Sie diese!)
PHONE_PRIMARY=+963 11 123 4567
PHONE_SECONDARY=+963 11 123 4568
EMAIL_INFO=info@shamsecure.sy
EMAIL_SALES=sales@shamsecure.sy

# E-Mail-Konfiguration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ihre-email@gmail.com
SMTP_PASS=ihr-app-passwort

# Admin-Panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ändern-sie-dieses-passwort
ADMIN_SECRET_KEY=generieren-sie-einen-zufälligen-string
```

### 4. Server starten

```bash
# Entwicklung
npm run dev

# Produktion
npm start
```

## E-Mail-Konfiguration (Gmail)

1. Gehen Sie zu [Google Account Settings](https://myaccount.google.com/)
2. Sicherheit → 2-Schritt-Verifizierung → App-Passwörter
3. Erstellen Sie ein App-Passwort
4. Verwenden Sie es in `SMTP_PASS`

## Admin-Panel

- URL: `http://localhost:3000/admin`
- Benutzername: Aus `.env` → `ADMIN_USERNAME`
- Passwort: Aus `.env` → `ADMIN_PASSWORD`

## Deployment

### Vercel (Empfohlen)

```bash
npm install -g vercel
vercel
```

Fügen Sie dann alle `.env` Variablen in Vercel Dashboard hinzu.

### Netlify

1. Laden Sie die Dateien hoch
2. Fügen Sie Environment Variables hinzu
3. Build Command: `npm install && npm start`

## Wichtige Hinweise

- ✅ Ändern Sie alle Standard-Passwörter
- ✅ Verwenden Sie HTTPS in der Produktion
- ✅ Testen Sie die E-Mail-Funktion nach dem Setup
- ✅ Überprüfen Sie alle Kontaktinformationen

Für detaillierte Anweisungen siehe `PRODUCTION_SETUP.md`
