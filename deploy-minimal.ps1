# Скрипт для создания минимального проекта для развертывания
Write-Host "🚀 Создаем минимальный проект для развертывания..." -ForegroundColor Green

# Создаем временную папку
$tempDir = "minimal-deploy"
if (Test-Path $tempDir) {
    Remove-Item -Path $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir

# Копируем основные файлы
Write-Host "📁 Копируем основные файлы..." -ForegroundColor Yellow
Copy-Item -Path "package.json", "package-lock.json", "railway.json", "Dockerfile", ".dockerignore" -Destination $tempDir

# Копируем backend
Write-Host "📁 Копируем backend..." -ForegroundColor Yellow
Copy-Item -Path "backend" -Destination $tempDir -Recurse

# Копируем frontend (без node_modules)
Write-Host "📁 Копируем frontend..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "$tempDir/frontend"
Copy-Item -Path "frontend/src" -Destination "$tempDir/frontend" -Recurse
Copy-Item -Path "frontend/public" -Destination "$tempDir/frontend" -Recurse
Copy-Item -Path "frontend/package.json", "frontend/package-lock.json", "frontend/vite.config.ts", "frontend/tsconfig.json", "frontend/tsconfig.node.json", "frontend/tailwind.config.js", "frontend/postcss.config.js", "frontend/index.html" -Destination "$tempDir/frontend"

Write-Host "✅ Минимальный проект создан в папке $tempDir" -ForegroundColor Green
Write-Host "📊 Размер проекта:" -ForegroundColor Cyan
Get-ChildItem -Path $tempDir -Recurse | Measure-Object -Property Length -Sum | ForEach-Object { 
    $sizeMB = [math]::Round($_.Sum / 1MB, 2)
    Write-Host "   $sizeMB MB" -ForegroundColor White
}
