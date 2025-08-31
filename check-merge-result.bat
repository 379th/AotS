@echo off
echo 🔍 ПРОВЕРКА РЕЗУЛЬТАТА СЛИЯНИЯ - Shadow Quest
echo.
echo 🎯 ЦЕЛЬ: Проверить результат слияния и отправить в GitHub
echo.
echo 🔍 Шаг 1: ПРОВЕРЯЕМ СТАТУС ПОСЛЕ СЛИЯНИЯ
echo.
echo Текущая ветка:
git branch --show-current
echo.
echo Статус Git:
git status
echo.
echo 🔍 Шаг 2: ПРОВЕРЯЕМ ПОСЛЕДНИЕ КОММИТЫ
echo.
echo Последние коммиты:
git log --oneline -5
echo.
echo 🔍 Шаг 3: ПРОВЕРЯЕМ ИЗМЕНЕНИЯ
echo.
echo Изменения в main (относительно origin/main):
git log origin/main..HEAD --oneline
echo.
echo 🚀 Шаг 4: ОТПРАВЛЯЕМ В GITHUB
echo.
echo Отправляем изменения в GitHub:
git push origin main
echo.
echo 🎯 Шаг 5: ПРОВЕРЯЕМ ФИНАЛЬНЫЙ РЕЗУЛЬТАТ
echo.
echo Статус после push:
git status
echo.
echo 🌟 ОЖИДАЕМЫЙ РЕЗУЛЬТАТ:
echo ✅ Слияние выполнено успешно
echo ✅ Изменения отправлены в GitHub
echo ✅ Railway автоматически обновится
echo ✅ aots-production.up.railway.app обновится
echo ✅ Изменения станут видны через 2-5 минут
echo.
echo 🚨 ЕСЛИ ЕСТЬ ОШИБКИ:
echo 1. Проверьте статус Git
echo 2. Убедитесь, что нет конфликтов
echo 3. Выполните git add . если нужно
echo 4. Выполните git commit если нужно
echo.
pause
