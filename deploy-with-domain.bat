@echo off
echo ========================================
echo Деплой приложения с подключением домена
echo ========================================
echo.

echo 1. Проверка переменных окружения...
if not exist "frontend\env.local" (
    echo ОШИБКА: Файл frontend\env.local не найден!
    echo Создай файл с переменными окружения для продакшена
    pause
    exit /b 1
)

echo 2. Копирование переменных окружения...
copy "frontend\env.local" "frontend\.env" >nul

echo 3. Установка зависимостей...
call npm install

echo 4. Сборка frontend...
cd frontend
call npm run build
cd ..

echo 5. Коммит изменений...
git add .
git commit -m "Deploy: настройка для продакшена с внешними ресурсами"

echo 6. Пуш в Railway...
git push origin Workapp-01

echo.
echo ========================================
echo Деплой завершен!
echo ========================================
echo.
echo Следующие шаги:
echo 1. В панели Railway добавь кастомный домен: shadow-quest.online
echo 2. Настрой DNS записи в reg.ru:
echo    - CNAME: www -> [твой-railway-url].up.railway.app
echo 3. Загрузи картинки на ispmanager хостинг согласно ISP_MANAGER_SETUP.md
echo 4. Проверь доступность картинок по URL
echo.
echo Проверь работу приложения:
echo https://www.shadow-quest.online
echo.

pause
