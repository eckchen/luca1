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

Für GitHub Pages wird **Formspree** direkt vom Browser genutzt (kein eigener Server, keine API-Route nötig). Deine E-Mail steht nur im Formspree-Dashboard, nicht im Repo.

1. Account auf https://formspree.io — neues Formular, Empfänger-E-Mail im Dashboard eintragen.
2. Form-ID aus der URL kopieren (z.B. `xyzabc` aus `https://formspree.io/f/xyzabc`).
3. **Form-ID für den Build** — eine der beiden Varianten:

   - **A)** Datei `portfolio/.env.local` (nicht committen):

     ```env
     NEXT_PUBLIC_FORMSPREE_ID=xyzabc
     ```

   - **B)** In `portfolio/lib/site-config.ts` die Konstante `FORMSPREE_FORM_ID_FALLBACK` auf deine ID setzen (z. B. wenn du ohne `.env.local` baust). `NEXT_PUBLIC_FORMSPREE_ID` hat Vorrang.

4. Statischen Export bauen (`npm run build:static` bzw. `deploy-subtree.ps1`). `NEXT_PUBLIC_*` bzw. der Fallback wird beim Build ins JavaScript eingetragen.

**Ohne Form-ID** (weder Env noch Fallback) bleibt das Formular deaktiviert; es erscheint ein Hinweis zur Konfiguration.

### Optional: reCAPTCHA v3

1. In [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) eine v3-Site für deine Domain (z.B. `lucarue.vip`) anlegen.
2. **Site Key** in `.env.local`: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...`
3. In Formspree unter Spam Protection reCAPTCHA aktivieren und die Keys dort hinterlegen.

Zusätzlich sind im Formular **Honeypot** und **Eingabevalidierung** aktiv.

---

## Änderungen gegenüber dynamischem Modus

| Feature      | Dynamisch (Vercel etc.) | Statisch (GitHub Pages) |
|-------------|--------------------------|--------------------------|
| Kontaktform | API + Formspree + IP-Bann | Formspree direkt vom Browser |
| Middleware  | IP-Bann aktiv            | Deaktiviert (nicht unterstützt) |
