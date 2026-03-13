# Vercel Update — Wichtig: Push zu GitHub!

**Die Änderungen sind lokal gespeichert.** Damit sie auf Vercel erscheinen, musst du sie zu GitHub pushen. Vercel baut erst dann neu.

---

## Schritt 1: Prüfen, ob Git funktioniert

Öffne ein **neues** Terminal (PowerShell oder CMD) und tippe:

```
git --version
```

- **Wenn eine Version angezeigt wird** → weiter mit Schritt 2
- **Wenn "nicht erkannt"** → zuerst [Git installieren](https://git-scm.com/download/win), danach Terminal neu starten

---

## Schritt 2: Änderungen zu GitHub pushen

Im Terminal:

```
cd C:\Users\luca0\Desktop\luca1
git add .
git status
git commit -m "Update: Automaten-App, App Store & Google Play Badges, Snackautomat"
git push origin main
```

*(Falls dein Branch `master` heißt: `git push origin master`)*

---

## Alternative: GitHub Desktop

1. [GitHub Desktop](https://desktop.github.com/) installieren
2. **File → Add Local Repository** → Ordner `C:\Users\luca0\Desktop\luca1` wählen
3. Alle Änderungen sollten links erscheinen
4. Commit Message: `Update: Automaten-App, Store-Badges, neues Design`
5. **Commit to main** klicken
6. **Push origin** klicken

---

## Schritt 3: Vercel-Einstellungen prüfen

1. Gehe zu [vercel.com](https://vercel.com) → dein Projekt
2. **Settings** → **General**
3. **Root Directory** muss `portfolio` sein
4. **Save**

---

## Schritt 4: Nach dem Push

- Vercel startet automatisch einen neuen Build (ca. 1–2 Minuten)
- **Deployments** im Vercel-Dashboard öffnen und warten, bis der Build grün ist
- Danach sollte die Live-Seite aktualisiert sein

---

## Lokal testen (ohne Vercel)

Vor dem Push kannst du alles lokal prüfen:

```
cd C:\Users\luca0\Desktop\luca1\portfolio
npm run dev
```

Dann im Browser: **http://localhost:3000**

 Dort solltest du sehen:

- Sternenhintergrund
- Name „Luca“ mit Glow
- guns.lol/ecke Link
- Zwei Projekte: Security Checker + Automatenshop App
- App Store & Google Play Logos bei der Automaten-App
