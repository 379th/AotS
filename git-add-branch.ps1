# 🚂 Добавление ветки в Git для Shadow Quest - PowerShell версия
Write-Host "🚂 Добавление ветки в Git для Shadow Quest..." -ForegroundColor Green
Write-Host ""

# Проверяем, что мы в Git репозитории
if (!(Test-Path ".git")) {
    Write-Host "❌ Ошибка: Это не Git репозиторий!" -ForegroundColor Red
    Write-Host "Перейдите в папку с проектом Shadow Quest" -ForegroundColor Yellow
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "📋 Текущий статус Git:" -ForegroundColor Cyan
git status

Write-Host ""
Write-Host "📍 Текущая ветка:" -ForegroundColor Yellow
git branch --show-current

Write-Host ""
Write-Host "🔄 Добавление всех изменений в Git..." -ForegroundColor Magenta

# Добавляем все файлы
try {
    git add .
    if ($LASTEXITCODE -ne 0) {
        throw "Ошибка при добавлении файлов"
    }
} catch {
    Write-Host "❌ Ошибка при добавлении файлов: $_" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "✅ Файлы добавлены успешно!" -ForegroundColor Green

Write-Host ""
Write-Host "📝 Создание коммита..." -ForegroundColor Cyan

# Получаем сообщение коммита
$commitMessage = Read-Host "Введите сообщение коммита (или нажмите Enter для стандартного)"

if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "feat: добавить файлы для ветки Workapp_02"
}

# Создаем коммит
try {
    git commit -m $commitMessage
    if ($LASTEXITCODE -ne 0) {
        throw "Ошибка при создании коммита"
    }
} catch {
    Write-Host "❌ Ошибка при создании коммита: $_" -ForegroundColor Red
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "✅ Коммит создан успешно!" -ForegroundColor Green

Write-Host ""
Write-Host "🚀 Отправка изменений в GitHub..." -ForegroundColor Magenta

# Отправляем изменения
try {
    git push origin Workapp_02
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️ Внимание: Не удалось отправить изменения" -ForegroundColor Yellow
        Write-Host "Возможно, ветка Workapp_02 еще не создана" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "💡 Создание ветки Workapp_02..." -ForegroundColor Blue
        
        git checkout -b Workapp_02
        
        Write-Host "💡 Отправка новой ветки..." -ForegroundColor Blue
        git push -u origin Workapp_02
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Ветка Workapp_02 создана и отправлена в GitHub!" -ForegroundColor Green
        } else {
            Write-Host "❌ Ошибка при отправке ветки" -ForegroundColor Red
        }
    } else {
        Write-Host "✅ Изменения успешно отправлены в GitHub!" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ Ошибка при отправке: $_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎭 Информация о проекте Shadow Quest:" -ForegroundColor Cyan
Write-Host "- Тип: Telegram Mini App" -ForegroundColor White
Write-Host "- Технологии: React 18 + TypeScript + Vite" -ForegroundColor White
Write-Host "- Деплой: Railway + Docker" -ForegroundColor White
Write-Host ""

Write-Host "💡 Следующие шаги:" -ForegroundColor Magenta
Write-Host "1. Проверьте изменения в GitHub" -ForegroundColor White
Write-Host "2. В Railway создайте новый сервис из ветки Workapp_02" -ForegroundColor White
Write-Host "3. Настройте переменные окружения" -ForegroundColor White
Write-Host ""
Write-Host "💡 Для возврата на основную ветку: git checkout main" -ForegroundColor Blue
Write-Host ""

Read-Host "Нажмите Enter для продолжения"
