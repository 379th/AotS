@echo off
echo Добавляем изменения...
git add .

echo Коммитим изменения...
git commit -m "Подготовка к деплою на Railway - исправления UI и PWA"

echo Загружаем в GitHub...
git push origin Workapp-01

echo Готово! Теперь можно деплоить на Railway
echo Перейдите на https://railway.app
echo Создайте новый проект и подключите репозиторий: 379th/AotS
echo Выберите ветку: Workapp-01
pause
