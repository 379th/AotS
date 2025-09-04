@echo off
echo ========================================
echo Загрузка картинок на ISPmanager хостинг
echo ========================================
echo.

echo Создание структуры папок...
echo.

echo ВАЖНО: 
echo 1. Убедись, что у тебя есть доступ к FTP/SFTP твоего хостинга
echo 2. Замени FTP_CREDENTIALS на реальные данные
echo 3. Замени DOMAIN на твой домен shadow-quest.online
echo.

echo Структура папок для создания на хостинге:
echo /images/buttons/
echo /images/first screens/
echo /images/navigation/
echo /images/shadow-archetype/
echo /Sorce/
echo.

echo Файлы для загрузки:
echo.
echo Из Sorce/ в images/first screens/:
echo - Screen_Start.png → intro.png
echo - Screen_09.jpg → day1Forest.png
echo - Screen_10.jpg → day2Cave.png
echo - Screen_11.jpg → day3Mirror.png
echo - Screen_12.jpg → day4Temple.png
echo.
echo Из Sorce/ в images/buttons/:
echo - Creator.png → About Creator.png
echo - Quest_boton.png → About Quest.png
echo - F_A_Q.png → FAQ.png
echo - Setings.png → Settings.png
echo - AotS_begine.png → Start.png
echo.
echo Из Sorce/ в Sorce/:
echo - Begine.png → Background.png
echo.

echo После загрузки проверь доступность:
echo https://www.shadow-quest.online/images/first screens/intro.png
echo https://www.shadow-quest.online/images/buttons/Start.png
echo https://www.shadow-quest.online/Sorce/Background.png
echo.

pause
