Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ЗАГРУЗКА ВСЕХ ИЗМЕНЕНИЙ В GITHUB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Проверяем статус Git..." -ForegroundColor Green
git status

Write-Host ""
Write-Host "2. Добавляем все изменения..." -ForegroundColor Green
git add .

Write-Host ""
Write-Host "3. Коммитим изменения..." -ForegroundColor Green
git commit -m "Исправление нижней панели и layout страницы Запрос"

Write-Host ""
Write-Host "4. Загружаем в ветку Workapp-01..." -ForegroundColor Green
git push origin Workapp-01

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ГОТОВО! Все изменения загружены." -ForegroundColor Green
Write-Host "Railway автоматически обновится через 2-5 минут." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Нажмите любую клавишу для продолжения..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
