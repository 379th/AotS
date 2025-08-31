# 🚂 Создание новой ветки для Railway - PowerShell версия
Write-Host "🚂 Создание новой ветки для Railway..." -ForegroundColor Green
Write-Host ""

# Проверяем, что мы в Git репозитории
if (!(Test-Path ".git")) {
    Write-Host "❌ Ошибка: Это не Git репозиторий!" -ForegroundColor Red
    Write-Host "Перейдите в папку с проектом Shadow Quest" -ForegroundColor Yellow
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

# Получаем имя новой ветки
$branchName = Read-Host "Введите имя новой ветки (например: feature/new-ui)"

if ([string]::IsNullOrWhiteSpace($branchName)) {
    Write-Host "❌ Ошибка: Имя ветки не может быть пустым!" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host ""
Write-Host "📋 Создание ветки: $branchName" -ForegroundColor Cyan

# Создаем новую ветку
try {
    git checkout -b $branchName
    if ($LASTEXITCODE -ne 0) {
        throw "Ошибка при создании ветки"
    }
} catch {
    Write-Host "❌ Ошибка при создании ветки: $_" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "✅ Ветка $branchName создана успешно!" -ForegroundColor Green

# Показываем текущую ветку
Write-Host ""
Write-Host "📍 Текущая ветка:" -ForegroundColor Yellow
git branch --show-current

Write-Host ""
Write-Host "🚀 Следующие шаги для Railway:" -ForegroundColor Magenta
Write-Host "1. Внесите изменения в код" -ForegroundColor White
Write-Host "2. Закоммитьте изменения: git add . && git commit -m 'feat: ваше сообщение'" -ForegroundColor White
Write-Host "3. Отправьте ветку в удаленный репозиторий: git push origin $branchName" -ForegroundColor White
Write-Host "4. В Railway Dashboard создайте новый сервис из этой ветки" -ForegroundColor White
Write-Host ""
Write-Host "💡 Для возврата на основную ветку: git checkout main" -ForegroundColor Blue
Write-Host ""

# Показываем информацию о Railway
Write-Host "🎭 Информация о проекте Shadow Quest:" -ForegroundColor Cyan
Write-Host "- Тип: Telegram Mini App" -ForegroundColor White
Write-Host "- Технологии: React 18 + TypeScript + Vite" -ForegroundColor White
Write-Host "- Деплой: Railway + Docker" -ForegroundColor White
Write-Host ""

Read-Host "Нажмите Enter для продолжения"
