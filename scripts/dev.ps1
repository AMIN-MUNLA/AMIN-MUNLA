$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "[dev] Starting backend and frontend in separate terminals..."
Start-Process -FilePath "cmd.exe" -ArgumentList '/k npm run start --prefix backend' -WorkingDirectory $projectRoot | Out-Null
Start-Process -FilePath "cmd.exe" -ArgumentList '/k npm run dev --prefix frontend' -WorkingDirectory $projectRoot | Out-Null

Write-Host "[dev] Backend health: http://localhost:5000/api/health"
Write-Host "[dev] Frontend: http://localhost:5173"
Write-Host "[dev] Close both opened terminals to stop the app."
