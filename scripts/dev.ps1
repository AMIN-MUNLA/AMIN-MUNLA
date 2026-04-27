$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$backendDir = Join-Path $projectRoot "backend"
$frontendDir = Join-Path $projectRoot "frontend"

Write-Host "[dev] Starting backend and frontend in separate terminals..."
Start-Process -FilePath "cmd.exe" -ArgumentList '/k npm run start' -WorkingDirectory $backendDir | Out-Null
Start-Process -FilePath "cmd.exe" -ArgumentList '/k npm run dev -- --host 127.0.0.1 --port 5173' -WorkingDirectory $frontendDir | Out-Null

Write-Host "[dev] Backend health: http://localhost:5000/api/health"
Write-Host "[dev] Frontend: http://localhost:5173"
Write-Host "[dev] Close both opened terminals to stop the app."
