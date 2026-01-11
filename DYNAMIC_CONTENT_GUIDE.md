# 📝 Dynamic Content - Anleitung

## ✅ Was wurde gemacht:

Alle Kontaktinformationen auf der Website werden jetzt **dynamisch** aus der `.env` Datei geladen!

### Aktualisierte Dateien:

1. ✅ **API-Route:** `/api/config` gibt alle Config-Werte zurück
2. ✅ **Config-Loader:** `public/config-loader.js` wurde erweitert
3. ✅ **HTML-Dateien:** Alle Footer-Bereiche verwenden jetzt `data-*` Attribute

### Aktualisierte HTML-Dateien:

- ✅ `index.html`
- ✅ `contact.html`
- ✅ `about.html`
- ✅ `services.html`
- ✅ `faq.html`
- ✅ `privacy.html`
- ✅ `terms.html`

## 🎯 So funktioniert es:

### 1. **Admin Settings aktualisieren:**
- Gehen Sie zu: `http://localhost:3000/admin/settings`
- Ändern Sie die Werte (Telefon, Email, Adresse, etc.)
- Klicken Sie auf "حفظ التغييرات" (Save)

### 2. **Automatische Aktualisierung:**
- Die Werte werden in `.env` gespeichert
- Beim Laden der Seite wird `/api/config` aufgerufen
- Der `config-loader.js` aktualisiert alle Elemente mit `data-*` Attributen

### 3. **Server neu starten (empfohlen):**
```bash
# Stoppen: Ctrl+C
npm start
```

## 📋 Data-Attribute:

Die folgenden `data-*` Attribute werden automatisch aktualisiert:

### Telefon:
- `data-phone-primary` - Haupttelefonnummer
- `data-phone-secondary` - Zweite Telefonnummer

### Email:
- `data-email-info` - Info Email
- `data-email-sales` - Sales Email
- `data-email-support` - Support Email

### Adresse:
- `data-address-city` - Stadt
- `data-address-street` - Straße
- `data-address-country` - Land
- `data-address-full` - "Stadt، Land"
- `data-address-complete` - "Straße, Stadt, Land"

### Site Name:
- `data-site-name` - Englischer Name
- `data-site-name-ar` - Arabischer Name

### Social Media:
- `data-social-facebook` - Facebook Link
- `data-social-instagram` - Instagram Link
- `data-social-linkedin` - LinkedIn Link
- `data-social-twitter` - Twitter Link

## 🔍 Beispiel:

### Vorher (hardcodiert):
```html
<li>📞 +963 11 123 4567</li>
<li>📧 info@shamsecure.sy</li>
<li>📍 دمشق، سوريا</li>
```

### Nachher (dynamisch):
```html
<li>📞 <span data-phone-primary>+963 11 123 4567</span></li>
<li>📧 <span data-email-info>info@shamsecure.sy</span></li>
<li>📍 <span data-address-full>دمشق، سوريا</span></li>
```

## ⚠️ Wichtig:

- **Server neu starten:** Nach Änderungen in Settings sollte der Server neu gestartet werden
- **Browser-Cache:** Bei Problemen: Browser-Cache leeren (Ctrl+F5)
- **Fallback:** Falls die API nicht erreichbar ist, werden die Standardwerte angezeigt

## 🧪 Testen:

1. **Öffnen Sie:** `http://localhost:3000/admin/settings`
2. **Ändern Sie:** Telefonnummer oder Email
3. **Speichern Sie:** Klicken Sie auf "حفظ التغييرات"
4. **Öffnen Sie:** Eine beliebige Seite (z.B. `index.html`)
5. **Überprüfen Sie:** Die Footer-Informationen sollten aktualisiert sein!

---

**Jetzt können Sie alle Kontaktinformationen über das Admin-Dashboard aktualisieren! 🎉**
