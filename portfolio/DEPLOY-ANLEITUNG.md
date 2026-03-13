# Website deployen – lucarue.vip aktualisieren

## Automatisch (empfohlen)

Dein Portfolio wird jetzt **automatisch** deployed, wenn du auf `main` pushst.

### So geht’s

1. **Änderungen committen** (in Cursor oder GitHub Desktop)
   - z. B. alle geänderten Dateien stagen
   - Commit: `Deploy: Updates (Glow, Mobile, Schrift)`

2. **Auf GitHub pushen**
   - In Cursor: Sync/Push
   - Oder in GitHub Desktop: Push origin

3. **Deploy prüfen**
   - GitHub → dein Repo → **Actions**
   - Workflow „Deploy Portfolio“ sollte laufen und grün sein
   - Nach 1–2 Minuten: https://lucarue.vip prüfen

### GitHub Pages einstellen

Falls die Seite nicht aktualisiert wird:

1. Gehe zu **GitHub** → dein Repo (z. B. eckchen/luca1)
2. **Settings** → **Pages**
3. Unter **Build and deployment** → **Source**: **GitHub Actions** auswählen
4. Speichern

---

## Manuell (falls nötig)

Mit **Git** im Terminal:

```powershell
cd C:\Users\luca0\Desktop\luca1

.\portfolio\export-static.ps1

git add -f portfolio/out
git commit -m "Deploy: Portfolio-Update"
git subtree push --prefix portfolio/out origin gh-pages
git reset --soft HEAD~1
git reset portfolio/out
```

Hinweis: Git muss installiert und im PATH sein.
