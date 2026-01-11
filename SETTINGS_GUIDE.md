# ⚙️ Admin Settings - Anleitung

## Übersicht

Das Admin-Dashboard hat jetzt eine **Settings-Seite**, wo Sie alle wichtigen Informationen aktualisieren können, die normalerweise in der `.env` Datei stehen.

## Zugriff auf Settings

1. **Loggen Sie sich ein:** `http://localhost:3000/admin/login`
2. **Gehen Sie zu Settings:**
   - Klicken Sie auf "الإعدادات" (Settings) in der Navigation
   - Oder direkt: `http://localhost:3000/admin/settings`

## Was können Sie aktualisieren?

### 1. **Site Information (معلومات الموقع)**
- Site Name (Englisch)
- Site Name (Arabisch)
- Site URL
- Site Email

### 2. **Contact Information (معلومات الاتصال)**
- Primary Phone (الهاتف الرئيسي)
- Secondary Phone (الهاتف الثانوي)
- Email Info (البريد الإلكتروني - معلومات)
- Email Sales (البريد الإلكتروني - مبيعات)
- Email Support (البريد الإلكتروني - دعم)

### 3. **Address (العنوان)**
- City (المدينة)
- Street (الشارع والعنوان)
- Country (الدولة)

### 4. **Social Media (وسائل التواصل الاجتماعي)**
- Facebook URL
- Instagram URL
- LinkedIn URL
- Twitter URL

## So verwenden Sie es:

### Schritt 1: Öffnen Sie Settings
- Gehen Sie zu `/admin/settings`

### Schritt 2: Bearbeiten Sie die Felder
- Alle Felder werden automatisch mit den aktuellen Werten aus `.env` geladen
- Ändern Sie die Werte nach Bedarf

### Schritt 3: Speichern
- Klicken Sie auf "حفظ التغييرات" (Save Changes)
- Die Werte werden in die `.env` Datei geschrieben

### Schritt 4: Server neu starten (empfohlen)
- Für die vollständige Anwendung der Änderungen, starten Sie den Server neu:
  ```bash
  # Stoppen: Ctrl+C
  npm start
  ```

## Wichtig:

- ✅ **Änderungen werden sofort in `.env` gespeichert**
- ✅ **Für die aktuelle Session werden die Werte sofort aktualisiert**
- ⚠️ **Für vollständige Anwendung: Server neu starten empfohlen**
- ⚠️ **Sensible Daten (Passwörter, API Keys) können hier NICHT geändert werden** (Sicherheit)

## Was wird NICHT aktualisiert?

Aus Sicherheitsgründen können Sie folgende Werte NICHT über das Dashboard ändern:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET_KEY`
- `JWT_SECRET`
- `SESSION_SECRET`
- `SMTP_PASS`
- `API_KEY`

Diese müssen weiterhin direkt in der `.env` Datei geändert werden.

## Technische Details:

- Die Settings werden in die `.env` Datei geschrieben
- Die Config wird für die aktuelle Session sofort aktualisiert
- Für vollständige Anwendung: Server-Neustart empfohlen
- Die `.env` Datei wird automatisch erstellt, falls sie nicht existiert

---

**Jetzt können Sie alle wichtigen Informationen einfach über das Dashboard aktualisieren! 🎉**
