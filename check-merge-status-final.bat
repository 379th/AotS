@echo off
echo 🔍 ПРОВЕРКА СЛИЯНИЯ ВЕТОК - Shadow Quest
echo.
echo 🎯 ЦЕЛЬ: Проверить статус слияния Workapp_01 в main
echo.
echo 📊 Шаг 1: ПРОВЕРКА ТЕКУЩЕЙ ВЕТКИ
echo.
echo Текущая ветка:
git branch --show-current
echo.
echo 📊 Шаг 2: СТАТУС GIT
echo.
echo Статус Git:
git status
echo.
echo 📊 Шаг 3: СПИСОК ВЕТОК
echo.
echo Все ветки:
git branch -a
echo.
echo 📊 Шаг 4: ИСТОРИЯ КОММИТОВ
echo.
echo Последние 10 коммитов:
git log --oneline -10
echo.
echo 📊 Шаг 5: ИСТОРИЯ СЛИЯНИЙ
echo.
echo Последние слияния:
git log --merges --oneline -5
echo.
echo 📊 Шаг 6: РАЗНИЦА МЕЖДУ ВЕТКАМИ
echo.
echo Разница между main и Workapp_01:
git diff main..Workapp_01 --name-only
echo.
echo 📊 Шаг 7: ПРОВЕРКА УДАЛЕННЫХ ВЕТОК
echo.
echo Удаленные ветки:
git branch -r
echo.
echo 🎯 АНАЛИЗ РЕЗУЛЬТАТОВ:
echo.
echo ✅ Если main содержит все изменения из Workapp_01 - слияние успешно
echo ❌ Если есть различия - слияние не завершено
echo ⚠️ Если Workapp_01 опережает main - нужно слияние
echo.
echo 🚀 СЛЕДУЮЩИЕ ШАГИ:
echo.
echo Если слияние не завершено:
echo 1. git checkout main
echo 2. git pull origin main
echo 3. git merge Workapp_01 --no-edit
echo 4. git push origin main
echo.
echo Если слияние завершено:
echo 1. Проверить Railway деплой
echo 2. Убедиться в видимости изменений
echo.
pause

