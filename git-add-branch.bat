@echo off
echo 🚂 Добавление ветки в Git для Shadow Quest...
echo.

REM Проверяем, что мы в Git репозитории
if not exist ".git" (
    echo ❌ Ошибка: Это не Git репозиторий!
    echo Перейдите в папку с проектом Shadow Quest
    pause
    exit /b 1
)

echo 📋 Текущий статус Git:
git status

echo.
echo 📍 Текущая ветка:
git branch --show-current

echo.
echo 🔄 Добавление всех изменений в Git...
git add .

if %errorlevel% neq 0 (
    echo ❌ Ошибка при добавлении файлов!
    pause
    exit /b 1
)

echo ✅ Файлы добавлены успешно!

echo.
echo 📝 Создание коммита...
set /p commit_message="Введите сообщение коммита (или нажмите Enter для стандартного): "

if "%commit_message%"=="" (
    set commit_message="feat: добавить файлы для ветки Workapp_02"
)

git commit -m %commit_message%

if %errorlevel% neq 0 (
    echo ❌ Ошибка при создании коммита!
    pause
    exit /b 1
)

echo ✅ Коммит создан успешно!

echo.
echo 🚀 Отправка изменений в GitHub...
git push origin Workapp_02

if %errorlevel% neq 0 (
    echo ⚠️ Внимание: Не удалось отправить изменения
    echo Возможно, ветка Workapp_02 еще не создана
    echo.
    echo 💡 Создание ветки Workapp_02...
    git checkout -b Workapp_02
    
    echo 💡 Отправка новой ветки...
    git push -u origin Workapp_02
) else (
    echo ✅ Изменения успешно отправлены в GitHub!
)

echo.
echo 🎭 Информация о проекте Shadow Quest:
echo - Тип: Telegram Mini App
echo - Технологии: React 18 + TypeScript + Vite
echo - Деплой: Railway + Docker
echo.
echo 💡 Следующие шаги:
echo 1. Проверьте изменения в GitHub
echo 2. В Railway создайте новый сервис из ветки Workapp_02
echo 3. Настройте переменные окружения
echo.
echo 💡 Для возврата на основную ветку: git checkout main
echo.

pause
