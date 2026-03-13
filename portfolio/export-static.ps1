# Static Export für GitHub Pages
# Middleware ist mit output: 'export' nicht kompatibel → temporär umbenennen

$root = $PSScriptRoot
$middleware = Join-Path $root "middleware.ts"
$middlewareBak = Join-Path $root "middleware.ts.bak"

if (Test-Path $middleware) {
  Write-Host "Middleware temporär deaktivieren..."
  Rename-Item $middleware "middleware.ts.bak" -Force
}

try {
  $env:EXPORT_STATIC = "1"
  Push-Location $root
  try {
    npm run build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
  } finally {
    Pop-Location
  }
  Write-Host ""
  Write-Host "Statische Dateien in: $root\out"
} finally {
  if (Test-Path $middlewareBak) {
    Write-Host "Middleware wiederherstellen..."
    Rename-Item $middlewareBak "middleware.ts" -Force
  }
}
