# Portfolio auf GitHub hochladen

## Voraussetzung: Git installieren

Falls Git noch nicht installiert ist:
- Download: https://git-scm.com/download/win
- Installation durchführen (Standard-Optionen)
- **Terminal neu starten** danach

---

## Option A: GitHub Desktop (am einfachsten)

1. **GitHub Desktop** installieren: https://desktop.github.com/
2. **File** → **Add local repository**
3. Ordner wählen: `C:\Users\luca0\Desktop\luca1\portfolio`
4. Falls "kein Repository": **Create repository** klicken
5. **Publish repository** (oder **Push origin** wenn schon verbunden)
6. Dein GitHub-Repo auswählen oder neues erstellen

---

## Option B: Über die Kommandozeile

### 1. Terminal öffnen (PowerShell oder CMD)

### 2. In den Portfolio-Ordner wechseln
```
cd C:\Users\luca0\Desktop\luca1\portfolio
```

### 3. Git initialisieren (falls noch nicht geschehen)
```
git init
```

### 4. Alle Dateien hinzufügen
```
git add .
```

### 5. Ersten Commit erstellen
```
git commit -m "Portfolio Website - Next.js 15"
```

### 6. Mit deinem GitHub-Repo verbinden

Ersetze `DEIN-USERNAME` und `DEIN-REPO` mit deinen Werten:
```
git remote add origin https://github.com/DEIN-USERNAME/DEIN-REPO.git
```

### 7. Hochladen
```
git branch -M main
git push -u origin main
```

---

## Was wird hochgeladen?

- Alle Quellcode-Dateien
- `package.json`, `tsconfig.json`, etc.
- `.env.example` (als Vorlage – **nicht** `.env.local` mit echten Passwörtern!)

## Was wird NICHT hochgeladen?

- `node_modules/` (wird bei Deployment neu installiert)
- `.next/` (Build-Ordner)
- `.env` und `.env.local` (geheime Daten)

---

## Dein Repo- bereits verbunden?

Falls du das Repo schon mal verbunden hast:
```
cd C:\Users\luca0\Desktop\luca1\portfolio
git add .
git commit -m "Update Portfolio"
git push
```
