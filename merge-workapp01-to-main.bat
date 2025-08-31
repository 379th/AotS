@echo off
echo 🚀 СЛИЯНИЕ Workapp_01 В MAIN - Shadow Quest
echo.
echo 🎭 Информация о проекте:
echo - Тип: Telegram Mini App
echo - Технологии: React 18 + TypeScript + Vite
echo - Деплой: Railway + Docker
echo - Задача: Слияние Workapp_01 в main
echo.
echo 🎯 ЦЕЛЬ:
echo Перенести ВСЕ изменения из ветки Workapp_01 в main
echo.
echo 🔍 Шаг 1: ПРОВЕРКА ТЕКУЩЕГО СТАТУСА
echo.
echo Текущая ветка:
git branch --show-current
echo.
echo Статус Git:
git status
echo.
echo 🔍 Шаг 2: ПРОВЕРКА ВЕТОК
echo.
echo Все ветки:
git branch -a
echo.
echo 🔍 Шаг 3: ПРОВЕРКА ИЗМЕНЕНИЙ В Workapp_01
echo.
echo Изменения в Workapp_01:
git log main..Workapp_01 --oneline
echo.
echo 🚀 Шаг 4: СЛИЯНИЕ ВЕТОК
echo.
echo ВАЖНО: Выполните эти команды по порядку!
echo.
echo 1. Переключиться на main ветку:
echo    git checkout main
echo.
echo 2. Убедиться, что main обновлена:
echo    git pull origin main
echo.
echo 3. Слить Workapp_01 в main:
echo    git merge Workapp_01 --no-edit
echo.
echo 4. Отправить изменения в GitHub:
echo    git push origin main
echo.
echo 🔍 Шаг 5: ПРОВЕРКА РЕЗУЛЬТАТА
echo.
echo После слияния проверьте:
echo - git log --oneline -5
echo - git status
echo - git branch
echo.
echo 🎯 Шаг 6: ОЖИДАЕМЫЙ РЕЗУЛЬТАТ
echo.
echo После успешного слияния:
echo ✅ Все изменения из Workapp_01 в main
echo ✅ Railway автоматически обновится
echo ✅ Изменения появятся в aots01.up.railway.app
echo ✅ Приложение будет обновлено
echo.
echo 🚨 ЕСЛИ ВОЗНИКНУТ КОНФЛИКТЫ:
echo 1. Разрешите конфликты вручную
echo 2. git add .
echo 3. git commit -m "Resolve merge conflicts"
echo 4. git push origin main
echo.
pause
