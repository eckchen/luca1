# Portfolio auf GitHub Pages deployen

Dieses Projekt ist für **statischen Export** konfiguriert. Die Seite kann auf GitHub Pages gehostet werden (z.B. **lucarue.vip**).

---

## Änderungen für andere sichtbar machen

Nach jeder Änderung (z.B. neuer Glow-Effekt, Texte, Links):

```powershell
cd portfolio
npm run sync
```

Das aktualisiert:
- `portfolio/out/` (statischer Export)
- `index.html` und `_next/` im Hauptordner (luca1)

**Für GitHub Pages (lucarue.vip):** Danach noch deployen (siehe unten).

**Für lokale Ansicht:** `npx serve .` im Hauptordner oder `npm run dev` im portfolio-Ordner.

---

## Schnellstart

```powershell
cd portfolio
.\deploy-subtree.ps1
```

Oder manuell:

```powershell
cd portfolio
npm install
npm run build
npm run export
cd ..

# CNAME kopieren (für lucarue.vip)
Copy-Item CNAME portfolio\out\ -Force

# Subtree pushen
git add -f portfolio/out
git commit -m "Export: statisches Portfolio"
git subtree push --prefix portfolio/out origin gh-pages
git reset --soft HEAD~1
git reset portfolio/out
```

---

## Alternative: deploy-github-pages.ps1

```powershell
cd portfolio
.\deploy-github-pages.ps1
```

Das Script:
1. Baut den statischen Export (`out/`)
2. Kopiert CNAME für die Custom Domain
3. Checkout `gh-pages` und ersetzt den Inhalt

---

## Voraussetzungen

1. **Git** installiert und im PATH: https://git-scm.com/download/win
2. **GitHub Pages** im Repo aktiviert:
   - https://github.com/eckchen/luca1/settings/pages
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**

---

## Manuelle Schritte (ohne Script)

```powershell
# 1. Statischen Export bauen
cd portfolio
npm run build:static

# 2. Zum Repo-Root wechseln (luca1)
cd ..

# 3. gh-pages Branch erstellen und mit out/ füllen
git checkout -B gh-pages
git rm -rf .
Copy-Item portfolio\out\* . -Recurse -Force
Copy-Item CNAME . -Force
git add .
git commit -m "Deploy: statisches Portfolio"
git push -f origin gh-pages

# 4. Zurück zu main
git checkout main
```

---

## Formspree (Kontaktformular)

Für das Kontaktformular wird **Formspree** direkt vom Client genutzt (ohne API-Route, da statischer Export).

1. Erstelle ein Formular auf https://formspree.io
2. Kopiere die Form-ID (z.B. `xyzabc` aus `https://formspree.io/f/xyzabc`)
3. Beim nächsten Build: `NEXT_PUBLIC_FORMSPREE_ID=xyzabc` setzen (Build-Zeit oder .env.local)

Ohne Form-ID fällt das Formular auf `mailto:lucarue200@gmail.com` zurück.

---

## Änderungen gegenüber dynamischem Modus

| Feature      | Dynamisch (Vercel etc.) | Statisch (GitHub Pages) |
|-------------|--------------------------|--------------------------|
| Kontaktform | API + Formspree + IP-Bann | Formspree direkt (oder mailto) |
| Middleware  | IP-Bann aktiv            | Deaktiviert (nicht unterstützt) |
