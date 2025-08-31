@echo off
echo 📚 Сохранение истории переписки...
echo.

REM Создаем папку для истории, если её нет
if not exist "conversation-history" mkdir conversation-history

REM Получаем текущую дату и время
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "datestamp=%YYYY%-%MM%-%DD%_%HH%-%Min%-%Sec%"

REM Создаем файл с историей
echo # 💬 История переписки - %datestamp% > "conversation-history\conversation_%datestamp%.md"
echo. >> "conversation-history\conversation_%datestamp%.md"
echo ## 📅 Дата: %YYYY%-%MM%-%DD% >> "conversation-history\conversation_%datestamp%.md"
echo ## 🕐 Время: %HH%:%Min%:%Sec% >> "conversation-history\conversation_%datestamp%.md"
echo. >> "conversation-history\conversation_%datestamp%.md"
echo ### 🎭 Проект: Shadow Quest >> "conversation-history\conversation_%datestamp%.md"
echo ### 👨‍💻 Автор: Vladimir Lakshman Das >> "conversation-history\conversation_%datestamp%.md"
echo. >> "conversation-history\conversation_%datestamp%.md"

REM Копируем основной файл истории
copy "HISTORY.md" "conversation-history\HISTORY_%datestamp%.md" >nul

echo ✅ История переписки сохранена в папку: conversation-history\
echo 📁 Файлы:
echo    - conversation_%datestamp%.md
echo    - HISTORY_%datestamp%.md
echo.
echo 💡 Для просмотра истории используйте любой текстовый редактор
echo    или откройте файлы в браузере
echo.
pause
