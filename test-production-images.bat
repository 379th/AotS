@echo off
echo ========================================
echo Тестирование картинок в продакшене
echo ========================================
echo.

echo Проверка доступности основных картинок...
echo.

echo 1. Проверка главного экрана:
curl -I "https://www.shadow-quest.online/images/first screens/intro.png" 2>nul
if %errorlevel% equ 0 (
    echo ✓ Главный экран доступен
) else (
    echo ✗ Главный экран недоступен
)

echo.
echo 2. Проверка кнопки Start:
curl -I "https://www.shadow-quest.online/images/buttons/Start.png" 2>nul
if %errorlevel% equ 0 (
    echo ✓ Кнопка Start доступна
) else (
    echo ✗ Кнопка Start недоступна
)

echo.
echo 3. Проверка фонового изображения:
curl -I "https://www.shadow-quest.online/Sorce/Background.png" 2>nul
if %errorlevel% equ 0 (
    echo ✓ Фоновое изображение доступно
) else (
    echo ✗ Фоновое изображение недоступно
)

echo.
echo 4. Проверка навигационной плашки:
curl -I "https://www.shadow-quest.online/images/navigation/intro.png" 2>nul
if %errorlevel% equ 0 (
    echo ✓ Навигационная плашка доступна
) else (
    echo ✗ Навигационная плашка недоступна
)

echo.
echo 5. Проверка основного приложения:
curl -I "https://www.shadow-quest.online" 2>nul
if %errorlevel% equ 0 (
    echo ✓ Основное приложение доступно
) else (
    echo ✗ Основное приложение недоступно
)

echo.
echo ========================================
echo Ручная проверка в браузере:
echo ========================================
echo.
echo Открой следующие ссылки в браузере:
echo.
echo 1. Основное приложение:
echo    https://www.shadow-quest.online
echo.
echo 2. Картинки для проверки:
echo    https://www.shadow-quest.online/images/first screens/intro.png
echo    https://www.shadow-quest.online/images/buttons/Start.png
echo    https://www.shadow-quest.online/Sorce/Background.png
echo    https://www.shadow-quest.online/images/navigation/intro.png
echo.
echo 3. Проверь в консоли браузера (F12) на ошибки загрузки ресурсов
echo.

pause
