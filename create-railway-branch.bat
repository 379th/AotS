@echo off
echo 🚂 Создание новой ветки для Railway...
echo.

REM Проверяем, что мы в Git репозитории
if not exist ".git" (
    echo ❌ Ошибка: Это не Git репозиторий!
    echo Перейдите в папку с проектом Shadow Quest
    pause
    exit /b 1
)

REM Получаем имя новой ветки
set /p branch_name="Введите имя новой ветки (например: feature/new-ui): "

if "%branch_name%"=="" (
    echo ❌ Ошибка: Имя ветки не может быть пустым!
    pause
    exit /b 1
)

echo.
echo 📋 Создание ветки: %branch_name%

REM Создаем новую ветку
git checkout -b %branch_name%

if %errorlevel% neq 0 (
    echo ❌ Ошибка при создании ветки!
    pause
    exit /b 1
)

echo ✅ Ветка %branch_name% создана успешно!

REM Показываем текущую ветку
echo.
echo 📍 Текущая ветка:
git branch --show-current

echo.
echo 🚀 Следующие шаги для Railway:
echo 1. Внесите изменения в код
echo 2. Закоммитьте изменения: git add . && git commit -m "feat: ваше сообщение"
echo 3. Отправьте ветку в удаленный репозиторий: git push origin %branch_name%
echo 4. В Railway Dashboard создайте новый сервис из этой ветки
echo.
echo 💡 Для возврата на основную ветку: git checkout main
echo.

pause
