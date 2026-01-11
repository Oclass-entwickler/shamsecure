# 🧪 Lokaler Test - Admin Login

## Server Status:
✅ Server läuft auf: `http://localhost:3000`

## Test-Schritte:

### 1. Überprüfen Sie die .env Datei:

Stellen Sie sicher, dass Ihre `.env` Datei diese Werte hat:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=12345
JWT_SECRET=your-secret-key-here
SESSION_SECRET=your-session-secret-here
NODE_ENV=development
PORT=3000
```

### 2. Testen Sie die Admin Login Seite:

Öffnen Sie im Browser:
```
http://localhost:3000/admin/login
```

Sie sollten die Login-Seite sehen.

### 3. Testen Sie den Login:

1. **Username:** `admin`
2. **Password:** `12345`
3. Klicken Sie auf "تسجيل الدخول" (Login)

### 4. Erwartetes Ergebnis:

✅ **Erfolg:** Sie werden zu `/admin/` weitergeleitet (Dashboard)

❌ **Fehler:** Sie sehen eine Fehlermeldung

---

## Debugging:

### Problem: Login funktioniert nicht

**Überprüfen Sie:**

1. **Server-Logs:**
   - Schauen Sie in das Terminal, wo der Server läuft
   - Sie sollten sehen: `🚀 ShamSecure server running on port 3000`

2. **.env Datei:**
   - Öffnen Sie `.env` in einem Editor
   - Stellen Sie sicher, dass `ADMIN_USERNAME=admin` und `ADMIN_PASSWORD=12345` gesetzt sind
   - **Wichtig:** Keine Leerzeichen um das `=` Zeichen!

3. **Server neu starten:**
   ```bash
   # Stoppen Sie den Server (Ctrl+C)
   # Dann starten Sie neu:
   npm start
   ```

### Problem: 404 Fehler

**Überprüfen Sie:**

1. Läuft der Server?
   - Terminal sollte zeigen: `🚀 ShamSecure server running on port 3000`

2. Ist der Port 3000 frei?
   - Versuchen Sie einen anderen Port in `.env`: `PORT=3001`

### Problem: "Cannot find module"

**Lösung:**
```bash
npm install
```

---

## Browser Console Test:

Öffnen Sie die Browser-Entwicklertools (F12) und testen Sie direkt:

```javascript
// Test POST Request
fetch('http://localhost:3000/admin/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'admin',
        password: '12345'
    })
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
```

**Erwartete Antwort:**
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح"
}
```

---

## Server stoppen:

Um den Server zu stoppen:
- Drücken Sie `Ctrl+C` im Terminal

---

**Wenn der lokale Test funktioniert, können Sie zu Netlify deployen! 🚀**
