@echo off
REM Скрипт для деплоя в Railway с проверкой адаптивности (Windows)

echo 🚀 Начинаем деплой в Railway с проверкой адаптивности...

REM Переходим в директорию frontend
cd frontend

REM Проверяем адаптивность
echo 📱 Проверяем адаптивность...
call npm run check:responsive

REM Если проверка не прошла, прерываем деплой
if %errorlevel% neq 0 (
    echo ❌ Обнаружены проблемы с адаптивностью. Деплой отменен.
    echo 💡 Исправьте проблемы и попробуйте снова.
    exit /b 1
)

echo ✅ Проверка адаптивности пройдена успешно!

REM Собираем приложение
echo 🔨 Собираем приложение...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Ошибка при сборке приложения.
    exit /b 1
)

echo ✅ Сборка завершена успешно!

REM Деплоим в Railway
echo 🚀 Деплоим в Railway...
railway up

if %errorlevel% equ 0 (
    echo 🎉 Деплой в Railway завершен успешно!
) else (
    echo ❌ Ошибка при деплое в Railway.
    exit /b 1
)
