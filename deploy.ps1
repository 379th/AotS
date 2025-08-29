# Скрипт для загрузки изменений в GitHub
Write-Host "Добавляем изменения..." -ForegroundColor Green
git add .

Write-Host "Коммитим изменения..." -ForegroundColor Green
git commit -m "Подготовка к деплою на Railway - исправления UI и PWA"

Write-Host "Загружаем в GitHub..." -ForegroundColor Green
git push origin Workapp-01

Write-Host "Готово! Теперь можно деплоить на Railway" -ForegroundColor Green
Write-Host "Перейдите на https://railway.app" -ForegroundColor Yellow
Write-Host "Создайте новый проект и подключите репозиторий: 379th/AotS" -ForegroundColor Yellow
Write-Host "Выберите ветку: Workapp-01" -ForegroundColor Yellow
