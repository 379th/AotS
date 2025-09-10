#!/bin/bash

# Скрипт запуска для Railway
echo "🚀 Starting Shadow Quest Application..."

# Собираем frontend
cd frontend
echo "📦 Building frontend..."
npm install
npm run build

# Копируем собранный frontend в backend/public
cd ../backend
echo "📁 Copying frontend build to backend..."
rm -rf public
cp -r ../frontend/dist public

# Устанавливаем зависимости backend
echo "📦 Installing backend dependencies..."
npm install

# Запускаем backend сервер
echo "🚀 Starting backend server on port $PORT"
npm start
