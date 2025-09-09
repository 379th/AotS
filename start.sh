#!/bin/bash

# Скрипт запуска для Railway
cd frontend

# Проверяем, что dist папка существует
if [ ! -d "dist" ]; then
  echo "Building application..."
  npm run build
fi

# Запускаем serve на порту, указанном Railway
PORT=${PORT:-3000}
echo "Starting server on port $PORT"
npx serve -s dist -p $PORT --single
