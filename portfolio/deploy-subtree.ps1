# Portfolio auf GitHub Pages deployen (git subtree)
# Pusht portfolio/out als Root des gh-pages Branch

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path $PSScriptRoot -Parent
$portfolioRoot = $PSScriptRoot
$outDir = Join-Path $portfolioRoot 'out'

Write-Host '=== 1. Export bauen ===' -ForegroundColor Cyan
& "$portfolioRoot\export-static.ps1"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if (-not (Test-Path $outDir)) {
  Write-Host 'FEHLER: out/ nicht gefunden.' -ForegroundColor Red
  exit 1
}

# CNAME fuer Custom Domain
$cnameSrc = Join-Path $repoRoot 'CNAME'
if (Test-Path $cnameSrc) {
  Copy-Item $cnameSrc (Join-Path $outDir 'CNAME') -Force
  Write-Host 'CNAME kopiert' -ForegroundColor Green
}

$gitPath = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitPath) {
  Write-Host ''
  Write-Host 'Git nicht im PATH. Manuell ausfuehren:' -ForegroundColor Yellow
  Write-Host "  cd $repoRoot" -ForegroundColor White
  Write-Host '  git add -f portfolio/out' -ForegroundColor White
  Write-Host "  git commit -m 'Export for gh-pages'" -ForegroundColor White
  Write-Host '  git subtree push --prefix portfolio/out origin gh-pages' -ForegroundColor White
  Write-Host '  git reset --soft HEAD~1' -ForegroundColor White
  Write-Host '  git reset portfolio/out' -ForegroundColor White
  exit 0
}

Push-Location $repoRoot
try {
  Write-Host ''
  Write-Host '=== 2. Subtree pushen ===' -ForegroundColor Cyan
  git add -f portfolio/out
  git status --short portfolio/out | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Write-Host 'Keine Aenderungen in portfolio/out' -ForegroundColor Yellow
    Pop-Location
    exit 0
  }
  git commit -m 'Export: statisches Portfolio fuer gh-pages'
  git subtree push --prefix portfolio/out origin gh-pages
  git reset --soft HEAD~1
  git reset portfolio/out
  Write-Host ''
  Write-Host '=== Deploy fertig ===' -ForegroundColor Green
  Write-Host 'https://lucarue.vip' -ForegroundColor White
} catch {
  Write-Host $_.Exception.Message -ForegroundColor Red
  git reset HEAD~1 2>$null
  git reset portfolio/out 2>$null
  exit 1
} finally {
  Pop-Location
}
