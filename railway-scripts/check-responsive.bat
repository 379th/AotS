@echo off
REM Скрипт для проверки адаптивности в Railway (Windows)

echo 📱 Проверка адаптивности в Railway...

REM Переходим в директорию frontend
cd frontend

REM Запускаем проверку
call npm run check:responsive

REM Сохраняем результат
set RESULT=%errorlevel%

if %RESULT% equ 0 (
    echo ✅ Проверка адаптивности пройдена успешно!
    echo 📊 Все элементы соответствуют требованиям адаптивности.
) else (
    echo ❌ Обнаружены проблемы с адаптивностью.
    echo 📄 Подробный отчет сохранен в responsive-report.txt
)

REM Копируем отчет в общую директорию
if exist "responsive-report.txt" (
    for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
    set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
    set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
    set "timestamp=%YYYY%%MM%%DD%-%HH%%Min%%Sec%"
    copy "responsive-report.txt" "..\responsive-reports\railway-check-%timestamp%.txt"
)

exit /b %RESULT%
