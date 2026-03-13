# Export bauen und in luca1-Root kopieren
# Damit sehen alle die gleiche Version (index.html + _next/)

$ErrorActionPreference = "Stop"
$portfolioRoot = $PSScriptRoot
$repoRoot = Split-Path $portfolioRoot -Parent

& "$portfolioRoot\export-static.ps1"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$outDir = Join-Path $portfolioRoot "out"
if (-not (Test-Path $outDir)) {
  Write-Host "FEHLER: out/ nicht gefunden." -ForegroundColor Red
  exit 1
}

Copy-Item -Path "$outDir\*" -Destination $repoRoot -Recurse -Force
Write-Host "Sync abgeschlossen: index.html + _next/ im Hauptordner aktualisiert." -ForegroundColor Green
