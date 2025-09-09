#!/bin/bash

# Скрипт настройки Railway с проверкой адаптивности

echo "🔧 Настраиваем Railway с проверкой адаптивности..."

# Создаем директорию для отчетов
mkdir -p responsive-reports

# Делаем скрипты исполняемыми
chmod +x railway-scripts/*.sh

# Устанавливаем Railway CLI если не установлен
if ! command -v railway &> /dev/null; then
  echo "📦 Устанавливаем Railway CLI..."
  npm install -g @railway/cli
fi

# Логинимся в Railway
echo "🔐 Логинимся в Railway..."
railway login

# Инициализируем проект Railway
echo "🚀 Инициализируем проект Railway..."
railway init

# Настраиваем переменные окружения
echo "⚙️ Настраиваем переменные окружения..."
railway variables set NODE_ENV=production
railway variables set VITE_APP_ENV=production

echo "✅ Настройка Railway завершена!"
echo ""
echo "📋 Доступные команды:"
echo "  railway up                    - Деплой без проверки"
echo "  ./railway-scripts/deploy-with-check.sh - Деплой с проверкой адаптивности"
echo "  ./railway-scripts/check-responsive.sh  - Только проверка адаптивности"
echo ""
echo "🎯 Рекомендуется использовать deploy-with-check.sh для безопасного деплоя!"
