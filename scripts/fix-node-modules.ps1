# Fix "UNKNOWN: unknown error, read" (errno -4094) when building on Windows with OneDrive.
# This happens when files in node_modules are "online only" placeholders and can't be read.
#
# Option A - Run this script (reinstalls packages that are often placeholders):
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; .\scripts\fix-node-modules.ps1
#
# Option B - Best long-term fix:
#   1. In File Explorer, right-click your project folder "Inuka na Ploti"
#   2. Choose "Always keep on this device" (so OneDrive downloads and keeps all files locally)
#   3. Delete the node_modules folder and .next folder
#   4. Run: npm install
#   5. Run: npm run build
#
# Option C - Move project outside OneDrive (e.g. C:\dev\inuka-na-ploti) and run npm install there.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
if (-not (Test-Path (Join-Path $root "package.json"))) {
    Write-Error "Run this script from repo root or scripts folder. Expected package.json in $root"
}
Set-Location $root

Write-Host "Reinstalling packages that are often unreadable (OneDrive placeholders)..." -ForegroundColor Cyan
$packages = @("react", "react-dom", "@next/env")
foreach ($p in $packages) {
    $target = Join-Path "node_modules" $p
    if ($p -like "@*") {
        $target = Join-Path "node_modules" ($p -replace "/", [System.IO.Path]::DirectorySeparatorChar)
    }
    if (Test-Path $target) {
        Write-Host "  Removing $p..."
        Remove-Item -Recurse -Force $target -ErrorAction SilentlyContinue
    }
}
Write-Host "  Running npm install..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Error "npm install failed. Try Option B in BUILD.md (Always keep on this device, then delete node_modules and npm install)."
}
Write-Host "  Running npm run build..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "Build succeeded." -ForegroundColor Green
} else {
    Write-Host "Build still failed. Use Option B in BUILD.md: pin the folder 'Always keep on this device', delete node_modules and .next, then npm install and npm run build." -ForegroundColor Yellow
}
