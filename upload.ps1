Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ЗАГРУЗКА ИЗМЕНЕНИЙ В GITHUB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Проверяем статус Git..." -ForegroundColor Green
git status

Write-Host ""
Write-Host "2. Добавляем все изменения..." -ForegroundColor Green
git add .

Write-Host ""
Write-Host "3. Коммитим изменения..." -ForegroundColor Green
git commit -m "Исправление кнопок на странице Запрос"

Write-Host ""
Write-Host "4. Загружаем в ветку Workapp-01..." -ForegroundColor Green
git push origin Workapp-01

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ГОТОВО! Изменения загружены." -ForegroundColor Green
Write-Host "Railway автоматически обновится." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

Read-Host "Нажмите Enter для продолжения"
