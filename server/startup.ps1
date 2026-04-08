$BackendDir = "c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\server"
$FrontendDir = "c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp"

Write-Host "Killing existing processes on ports 5000, 5173, 5174, 5175..."
Get-NetTCPConnection -LocalPort 5000, 5173, 5174, 5175 -ErrorAction SilentlyContinue | ForEach-Object {
    try { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } catch {}
}

Write-Host "Starting Backend..."
Start-Process node -ArgumentList "index.js" -WorkingDirectory $BackendDir -NoNewWindow -RedirectStandardOutput "$BackendDir\backend.log" -RedirectStandardError "$BackendDir\backend.err.log"

Write-Host "Starting Frontend..."
Start-Process npx -ArgumentList "vite" -WorkingDirectory $FrontendDir -NoNewWindow -RedirectStandardOutput "$FrontendDir\frontend.log" -RedirectStandardError "$FrontendDir\frontend.err.log"

Write-Host "Waiting for 15 seconds..."
Start-Sleep -Seconds 15

Write-Host "Port Status:"
Get-NetTCPConnection -LocalPort 5000, 5173, 5174, 5175 -ErrorAction SilentlyContinue | Select-Object LocalPort, State, OwningProcess

Write-Host "Backend Log Tail:"
Get-Content "$BackendDir\backend.log" -Tail 5 -ErrorAction SilentlyContinue

Write-Host "Frontend Log Tail:"
Get-Content "$FrontendDir\frontend.log" -Tail 5 -ErrorAction SilentlyContinue

Write-Host "Frontend Error Log Tail:"
Get-Content "$FrontendDir\frontend.err.log" -Tail 5 -ErrorAction SilentlyContinue
