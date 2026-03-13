# Export bauen und in luca1-Root kopieren
$ErrorActionPreference = "Stop"
$portfolioRoot = $PSScriptRoot
$repoRoot = Split-Path $portfolioRoot -Parent
$outDir = Join-Path $portfolioRoot "out"

Write-Host "=== Export bauen ===" -ForegroundColor Cyan
& "$portfolioRoot\export-static.ps1"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "=== Nach Hauptordner kopieren ===" -ForegroundColor Cyan
Copy-Item "$outDir\*" $repoRoot -Recurse -Force

if (Test-Path (Join-Path $repoRoot "CNAME")) {
  Copy-Item (Join-Path $repoRoot "CNAME") $outDir -Force
  Copy-Item "$outDir\CNAME" $repoRoot -Force
}

Write-Host "Fertig. index.html und _next/ sind aktualisiert." -ForegroundColor Green
