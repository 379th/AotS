# Скрипт для развертывания на Railway
# Использование: .\deploy-railway.ps1

Write-Host "🚀 Начинаем развертывание на Railway..." -ForegroundColor Green

# Проверяем, установлен ли Railway CLI
try {
    $railwayVersion = railway --version
    Write-Host "✅ Railway CLI установлен: $railwayVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Railway CLI не установлен. Устанавливаем..." -ForegroundColor Red
    npm i -g @railway/cli
}

# Проверяем аутентификацию
Write-Host "🔐 Проверяем аутентификацию..." -ForegroundColor Yellow
try {
    $whoami = railway whoami
    Write-Host "✅ Аутентификация успешна: $whoami" -ForegroundColor Green
} catch {
    Write-Host "❌ Необходима аутентификация. Запускаем railway login..." -ForegroundColor Red
    railway login
}

# Проверяем статус проекта
Write-Host "📊 Проверяем статус проекта..." -ForegroundColor Yellow
try {
    $status = railway status
    Write-Host "✅ Проект подключен: $status" -ForegroundColor Green
} catch {
    Write-Host "❌ Проект не подключен. Подключаем..." -ForegroundColor Red
    railway link
}

# Развертываем приложение
Write-Host "🚀 Развертываем приложение..." -ForegroundColor Yellow
railway up --detach

Write-Host "✅ Развертывание завершено!" -ForegroundColor Green
Write-Host "🌐 Проверьте ваш проект на Railway Dashboard" -ForegroundColor Cyan
