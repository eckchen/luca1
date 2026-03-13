# Änderungen live schalten (Vercel)

Damit alle das neue Design sehen, musst du die Änderungen zu GitHub pushen.  
Vercel baut und veröffentlicht automatisch bei jedem Push.

---

## 1. Vercel: Root Directory prüfen

1. Gehe zu [vercel.com](https://vercel.com) → dein Projekt
2. **Settings** → **General** → **Root Directory**
3. Dort muss `portfolio` stehen (weil die Next.js-App in dem Ordner liegt)
4. **Save**

---

## 2. Änderungen zu GitHub pushen

### Option A: GitHub Desktop

1. **GitHub Desktop** öffnen
2. Repo öffnen: `C:\Users\luca0\Desktop\luca1`
3. Alle Änderungen sollten links angezeigt werden
4. **Commit message:** z.B. `Update: neues Design, Tagline, guns.lol Link`
5. **Commit to main** klicken
6. **Push origin** klicken

### Option B: Terminal (wenn Git installiert)

```powershell
cd C:\Users\luca0\Desktop\luca1
git add .
git commit -m "Update: neues Design, Tagline, guns.lol Link"
git push origin main
```

---

## 3. Nach dem Push

- Vercel baut automatisch (ca. 1–2 Minuten)
- Den Fortschritt siehst du im Vercel-Dashboard unter **Deployments**
- Wenn der Build grün ist, ist die neue Version live

---

## Tipp: Git installieren

Falls Git fehlt: https://git-scm.com/download/win  
Nach der Installation das Terminal neu starten.
