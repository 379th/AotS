@echo off
REM Скрипт настройки Railway с проверкой адаптивности (Windows)

echo 🔧 Настраиваем Railway с проверкой адаптивности...

REM Создаем директорию для отчетов
if not exist "responsive-reports" mkdir responsive-reports

REM Устанавливаем Railway CLI если не установлен
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Устанавливаем Railway CLI...
    npm install -g @railway/cli
)

REM Логинимся в Railway
echo 🔐 Логинимся в Railway...
railway login

REM Инициализируем проект Railway
echo 🚀 Инициализируем проект Railway...
railway init

REM Настраиваем переменные окружения
echo ⚙️ Настраиваем переменные окружения...
railway variables set NODE_ENV=production
railway variables set VITE_APP_ENV=production

echo ✅ Настройка Railway завершена!
echo.
echo 📋 Доступные команды:
echo   railway up                    - Деплой без проверки
echo   railway-scripts\deploy-with-check.bat - Деплой с проверкой адаптивности
echo   railway-scripts\check-responsive.bat  - Только проверка адаптивности
echo.
echo 🎯 Рекомендуется использовать deploy-with-check.bat для безопасного деплоя!
