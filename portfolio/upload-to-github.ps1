# Portfolio auf GitHub hochladen
# Voraussetzung: Git muss installiert sein (https://git-scm.com/download/win)
# 
# ANPASSEN: Ersetze unten DEIN-USERNAME und DEIN-REPO mit deinen GitHub-Daten
# Beispiel: https://github.com/eckchen/portfolio

$REPO_URL = "https://github.com/DEIN-USERNAME/DEIN-REPO.git"

Write-Host "=== Portfolio GitHub Upload ===" -ForegroundColor Cyan
Write-Host ""

$portfolioPath = $PSScriptRoot
Set-Location $portfolioPath

# Prüfen ob Git existiert
try {
    $null = git --version
} catch {
    Write-Host "FEHLER: Git ist nicht installiert!" -ForegroundColor Red
    Write-Host "Bitte installiere Git: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Oder nutze GitHub Desktop: https://desktop.github.com/" -ForegroundColor Yellow
    exit 1
}

if ($REPO_URL -match "DEIN-USERNAME|DEIN-REPO") {
    Write-Host "WICHTIG: Bitte oeffne upload-to-github.ps1 und ersetze DEIN-USERNAME und DEIN-REPO mit deinen GitHub-Daten!" -ForegroundColor Yellow
    Write-Host "Beispiel: https://github.com/eckchen/portfolio" -ForegroundColor Gray
    exit 1
}

# Git init falls nötig
if (-not (Test-Path ".git")) {
    git init
    Write-Host "Git initialisiert." -ForegroundColor Green
}

# Remote hinzufügen (überschreibt falls schon vorhanden)
git remote remove origin 2>$null
git remote add origin $REPO_URL
Write-Host "Remote gesetzt: $REPO_URL" -ForegroundColor Green

# Alles hinzufügen
git add .
$status = git status --short
if ($status) {
    git commit -m "Portfolio - Next.js 15, Mehrsprachig, Kontaktformular"
    Write-Host "Commit erstellt." -ForegroundColor Green
    git branch -M main
    git push -u origin main
    Write-Host ""
    Write-Host "Erfolgreich hochgeladen!" -ForegroundColor Green
} else {
    Write-Host "Nichts zu committen - alles ist bereits aktuell." -ForegroundColor Yellow
    Write-Host "Zum Pushen: git push" -ForegroundColor Gray
}
