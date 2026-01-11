# 🔄 Server neu starten

## Wichtig: Server muss neu gestartet werden!

Die Änderungen (cookie-parser) werden erst nach Neustart wirksam.

## So starten Sie den Server neu:

### Schritt 1: Server stoppen
- Gehen Sie zum Terminal, wo der Server läuft
- Drücken Sie **Ctrl+C**

### Schritt 2: Server neu starten
```bash
npm start
```

### Schritt 3: Testen Sie erneut
1. Öffnen Sie: `http://localhost:3000/admin/login`
2. Username: `admin`
3. Password: `12345`
4. Klicken Sie auf Login

**Jetzt sollte es funktionieren!** ✅

---

## Was wurde behoben:

- ✅ `cookie-parser` installiert und konfiguriert
- ✅ Cookies werden jetzt richtig gelesen
- ✅ Debug-Logging hinzugefügt (sehen Sie im Terminal)

---

**Nach dem Neustart sollte der Login zum Dashboard weiterleiten! 🎉**
