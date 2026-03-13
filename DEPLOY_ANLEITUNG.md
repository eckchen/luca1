# lucarue.vip aktualisieren (GitHub Pages)

**Deine Seite läuft über GitHub Pages** – nicht über Vercel. Die Domain lucarue.vip zeigt auf die Dateien im **Root** deines Repos (index.html + _next/).

---

## Wichtig: Zwei Schritte vor jedem Deploy

### 1. Sync ausführen (Export + Kopie in Root)

```
cd C:\Users\luca0\Desktop\luca1\portfolio
npm run sync
```

Das baut den neuen Stand und kopiert ihn in den Hauptordner.

### 2. Zu GitHub pushen

Mit **GitHub Desktop**:
1. Repo öffnen: `C:\Users\luca0\Desktop\luca1`
2. Alle Änderungen sollten sichtbar sein (index.html, _next/, etc.)
3. Commit: z.B. „Update: Automaten-App, Store-Badges“
4. **Push origin** klicken

Oder mit **Terminal** (wenn Git installiert ist):
```
cd C:\Users\luca0\Desktop\luca1
git add .
git commit -m "Update: Automaten-App, Store-Badges"
git push origin main
```

---

## Nach dem Push

GitHub Pages baut in der Regel innerhalb von 1–2 Minuten. Danach ist die neue Version unter lucarue.vip sichtbar.

**Browser-Cache:** Falls die Seite noch alt aussieht: Strg+Shift+R (Hard Refresh) oder Inkognito-Fenster testen.
