#!/bin/bash

# Скрипт для проверки адаптивности в Railway

echo "📱 Проверка адаптивности в Railway..."

# Переходим в директорию frontend
cd frontend

# Запускаем проверку
npm run check:responsive

# Сохраняем результат
RESULT=$?

if [ $RESULT -eq 0 ]; then
  echo "✅ Проверка адаптивности пройдена успешно!"
  echo "📊 Все элементы соответствуют требованиям адаптивности."
else
  echo "❌ Обнаружены проблемы с адаптивностью."
  echo "📄 Подробный отчет сохранен в responsive-report.txt"
fi

# Копируем отчет в общую директорию
if [ -f "responsive-report.txt" ]; then
  cp responsive-report.txt ../responsive-reports/railway-check-$(date +%Y%m%d-%H%M%S).txt
fi

exit $RESULT
