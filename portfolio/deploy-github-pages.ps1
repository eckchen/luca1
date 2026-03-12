# Portfolio auf GitHub Pages deployen
# Ersetzt die alte index.html mit der statischen Next.js-Seite

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path $PSScriptRoot -Parent
$portfolioRoot = $PSScriptRoot
$outDir = Join-Path $portfolioRoot "out"

# 1. Statischen Export ausführen
Write-Host "=== Statischen Export bauen ===" -ForegroundColor Cyan
& "$portfolioRoot\export-static.ps1"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# 2. Prüfen ob out/ existiert
if (-not (Test-Path $outDir)) {
  Write-Host "FEHLER: out/ Ordner nicht gefunden." -ForegroundColor Red
  exit 1
}

# 3. CNAME für Custom Domain (lucarue.vip) hinzufügen
$cnameSource = Join-Path $repoRoot "CNAME"
$cnameDest = Join-Path $outDir "CNAME"
if (Test-Path $cnameSource) {
  Copy-Item $cnameSource $cnameDest -Force
  Write-Host "CNAME kopiert für lucarue.vip" -ForegroundColor Green
}

# 4. Git-Befehle (muss im PATH sein)
$gitPath = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitPath) {
  Write-Host ""
  Write-Host "HINWEIS: Git nicht im PATH gefunden." -ForegroundColor Yellow
  Write-Host "Manuelle Schritte:" -ForegroundColor Yellow
  Write-Host "  1. Git installieren: https://git-scm.com/download/win" -ForegroundColor White
  Write-Host "  2. Terminal neu starten" -ForegroundColor White
  Write-Host "  3. Dieses Script erneut ausführen" -ForegroundColor White
  Write-Host ""
  Write-Host "Oder manuell deployen:" -ForegroundColor Yellow
  Write-Host "  cd $repoRoot" -ForegroundColor White
  Write-Host "  git checkout -B gh-pages" -ForegroundColor White
  Write-Host "  git rm -rf . 2>`$null; Copy-Item $outDir\* . -Recurse -Force" -ForegroundColor White
  Write-Host "  git add ." -ForegroundColor White
  Write-Host "  git commit -m 'Deploy static portfolio'" -ForegroundColor White
  Write-Host "  git push -f origin gh-pages" -ForegroundColor White
  exit 0
}

# 5. Zu Repo-Root wechseln
Push-Location $repoRoot

try {
  # gh-pages Branch: nur statische Dateien
  Write-Host ""
  Write-Host '=== gh-pages Branch vorbereiten ===' -ForegroundColor Cyan
  git checkout -B gh-pages 2>$null
  git rm -rf . 2>$null
  git clean -fd 2>$null

  # Inhalt von out/ in Root kopieren
  Get-ChildItem $outDir -Force | ForEach-Object {
    Copy-Item $_.FullName -Destination $repoRoot -Recurse -Force
  }

  git add -A
  $count = (git status -s | Measure-Object -Line).Lines
  if ($count -eq 0) {
    Write-Host 'Keine Änderungen.' -ForegroundColor Yellow
    git checkout main 2>$null
    Pop-Location
    exit 0
  }

  git commit -m 'Deploy: statisches Portfolio (Next.js export)'
  git push -f origin gh-pages

  Write-Host ""
  Write-Host '=== Deploy abgeschlossen ===' -ForegroundColor Green
  Write-Host 'GitHub Pages: https://lucarue.vip (nach wenigen Minuten)' -ForegroundColor White
  Write-Host ('Prüfe Einstellungen: https://github.com/eckchen/luca1/settings/pages') -ForegroundColor Gray
} catch {
  Write-Host $_.Exception.Message -ForegroundColor Red
  git checkout main 2>$null
  exit 1
} finally {
  Pop-Location
}
