@echo off
echo 🚂 Создание ветки Workapp_02 для Shadow Quest...
echo.

REM Проверяем, что мы в Git репозитории
if not exist ".git" (
    echo ❌ Ошибка: Это не Git репозиторий!
    echo Перейдите в папку с проектом Shadow Quest
    pause
    exit /b 1
)

echo 📋 Создание ветки: Workapp_02

REM Создаем новую ветку
git checkout -b Workapp_02

if %errorlevel% neq 0 (
    echo ❌ Ошибка при создании ветки!
    pause
    exit /b 1
)

echo ✅ Ветка Workapp_02 создана успешно!

REM Показываем текущую ветку
echo.
echo 📍 Текущая ветка:
git branch --show-current

echo.
echo 🚀 Отправка ветки в GitHub...
git push origin Workapp_02

if %errorlevel% neq 0 (
    echo ⚠️ Внимание: Не удалось отправить ветку в GitHub
    echo Возможно, нужно настроить удаленный репозиторий
    echo.
    echo 💡 Для настройки выполните:
    echo git remote add origin https://github.com/your-username/AotS.git
    echo git push -u origin Workapp_02
) else (
    echo ✅ Ветка Workapp_02 успешно отправлена в GitHub!
)

echo.
echo 🎭 Информация о проекте Shadow Quest:
echo - Тип: Telegram Mini App
echo - Технологии: React 18 + TypeScript + Vite
echo - Деплой: Railway + Docker
echo.
echo 💡 Следующие шаги:
echo 1. Внесите изменения в код
echo 2. Закоммитьте: git add . && git commit -m "feat: ваше сообщение"
echo 3. Отправьте: git push origin Workapp_02
echo 4. В Railway создайте новый сервис из ветки Workapp_02
echo.
echo 💡 Для возврата на основную ветку: git checkout main
echo.

pause
