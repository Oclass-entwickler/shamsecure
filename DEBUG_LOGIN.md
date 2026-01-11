# 🔍 Debug: Admin Login Problem

## Was ich gemacht habe:

1. ✅ Debug-Logging zu `routes/admin.js` hinzugefügt
2. ✅ Test-Script erstellt: `test-login.js`

## So testen Sie:

### Option 1: Browser Test

1. **Öffnen Sie:** `http://localhost:3000/admin/login`
2. **Eingaben:**
   - Username: `admin`
   - Password: `12345`
3. **Klicken Sie auf Login**
4. **Schauen Sie ins Terminal** - Sie sollten Debug-Ausgaben sehen:
   ```
   === LOGIN ATTEMPT ===
   Received username: admin
   Received password: ***
   Config username: admin
   Config password: ***
   Username match: true
   Password match: true/false
   ====================
   ```

### Option 2: Browser Console Test

1. Öffnen Sie `http://localhost:3000/admin/login`
2. Drücken Sie **F12** (Entwicklertools)
3. Gehen Sie zu **Console**
4. Führen Sie aus:
   ```javascript
   fetch('/admin/login', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ username: 'admin', password: '12345' })
   })
   .then(res => res.json())
   .then(data => {
       console.log('Response:', data);
       if (data.debug) {
           console.log('Debug Info:', data.debug);
       }
   });
   ```

### Option 3: Terminal Test (mit node-fetch)

Falls Sie `node-fetch` installiert haben:
```bash
node test-login.js
```

---

## Was die Debug-Ausgaben bedeuten:

### ✅ Wenn Login funktioniert:
```
=== LOGIN ATTEMPT ===
Received username: admin
Config username: admin
Username match: true
Password match: true
====================
```

### ❌ Wenn Login nicht funktioniert:

**Problem 1: Username stimmt nicht**
```
Username match: false
```
→ Überprüfen Sie `.env`: `ADMIN_USERNAME=admin`

**Problem 2: Password stimmt nicht**
```
Password match: false
```
→ Überprüfen Sie `.env`: `ADMIN_PASSWORD=12345`

**Problem 3: Body wird nicht empfangen**
```
Received username: undefined
Received password: undefined
```
→ Problem mit Body-Parser oder Request-Format

---

## Häufige Probleme:

### Problem: "Received username: undefined"

**Ursache:** Body-Parser empfängt die Daten nicht

**Lösung:**
1. Überprüfen Sie, ob `Content-Type: application/json` im Request-Header ist
2. Überprüfen Sie die Browser-Console auf Fehler
3. Stellen Sie sicher, dass der Server läuft

### Problem: "Config password: undefined"

**Ursache:** `.env` wird nicht geladen

**Lösung:**
1. Überprüfen Sie `.env` Datei:
   ```env
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=12345
   ```
2. **Wichtig:** Keine Leerzeichen um `=`
3. **Server neu starten** nach Änderung der `.env`

### Problem: "Password match: false" obwohl Password richtig ist

**Ursache:** Whitespace oder Encoding-Problem

**Lösung:**
1. Überprüfen Sie `.env` - keine Leerzeichen:
   ```env
   ADMIN_PASSWORD=12345
   ```
   Nicht: `ADMIN_PASSWORD = 12345` oder `ADMIN_PASSWORD=12345 `
2. Server neu starten

---

## Nächste Schritte:

1. **Testen Sie den Login** (siehe oben)
2. **Schauen Sie ins Terminal** für Debug-Ausgaben
3. **Teilen Sie mir die Debug-Ausgaben mit**, dann kann ich das Problem genau identifizieren!

---

**Nach dem Test sollten Sie im Terminal genau sehen, was das Problem ist! 🔍**
