# 🚂 Создание ветки Workapp_02 для Shadow Quest - PowerShell версия
Write-Host "🚂 Создание ветки Workapp_02 для Shadow Quest..." -ForegroundColor Green
Write-Host ""

# Проверяем, что мы в Git репозитории
if (!(Test-Path ".git")) {
    Write-Host "❌ Ошибка: Это не Git репозиторий!" -ForegroundColor Red
    Write-Host "Перейдите в папку с проектом Shadow Quest" -ForegroundColor Yellow
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "📋 Создание ветки: Workapp_02" -ForegroundColor Cyan

# Создаем новую ветку
try {
    git checkout -b Workapp_02
    if ($LASTEXITCODE -ne 0) {
        throw "Ошибка при создании ветки"
    }
} catch {
    Write-Host "❌ Ошибка при создании ветки: $_" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "✅ Ветка Workapp_02 создана успешно!" -ForegroundColor Green

# Показываем текущую ветку
Write-Host ""
Write-Host "📍 Текущая ветка:" -ForegroundColor Yellow
git branch --show-current

Write-Host ""
Write-Host "🚀 Отправка ветки в GitHub..." -ForegroundColor Magenta

# Отправляем ветку в GitHub
try {
    git push origin Workapp_02
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️ Внимание: Не удалось отправить ветку в GitHub" -ForegroundColor Yellow
        Write-Host "Возможно, нужно настроить удаленный репозиторий" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "💡 Для настройки выполните:" -ForegroundColor Blue
        Write-Host "git remote add origin https://github.com/your-username/AotS.git" -ForegroundColor White
        Write-Host "git push -u origin Workapp_02" -ForegroundColor White
    } else {
        Write-Host "✅ Ветка Workapp_02 успешно отправлена в GitHub!" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ Ошибка при отправке ветки: $_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎭 Информация о проекте Shadow Quest:" -ForegroundColor Cyan
Write-Host "- Тип: Telegram Mini App" -ForegroundColor White
Write-Host "- Технологии: React 18 + TypeScript + Vite" -ForegroundColor White
Write-Host "- Деплой: Railway + Docker" -ForegroundColor White
Write-Host ""

Write-Host "💡 Следующие шаги:" -ForegroundColor Magenta
Write-Host "1. Внесите изменения в код" -ForegroundColor White
Write-Host "2. Закоммитьте: git add . && git commit -m 'feat: ваше сообщение'" -ForegroundColor White
Write-Host "3. Отправьте: git push origin Workapp_02" -ForegroundColor White
Write-Host "4. В Railway создайте новый сервис из ветки Workapp_02" -ForegroundColor White
Write-Host ""
Write-Host "💡 Для возврата на основную ветку: git checkout main" -ForegroundColor Blue
Write-Host ""

Read-Host "Нажмите Enter для продолжения"
