# 🚂 Деплой Shadow Quest на Railway

## 📋 Предварительные требования

1. **GitHub аккаунт** с репозиторием проекта
2. **Railway аккаунт** (https://railway.app/)
3. **PostgreSQL база данных** (можно создать в Railway)

## 🚀 Пошаговый деплой

### 1. Подготовка репозитория

```bash
# Убедитесь, что все файлы закоммичены
git add .
git commit -m "feat: подготовка к деплою на Railway"
git push origin main
```

### 2. Создание проекта на Railway

1. Перейдите на [Railway](https://railway.app/)
2. Нажмите "New Project"
3. Выберите "Deploy from GitHub repo"
4. Выберите ваш репозиторий `AotS`
5. Railway автоматически определит Dockerfile

### 3. Настройка переменных окружения

В настройках проекта Railway добавьте переменные:

```env
# Основные настройки
NODE_ENV=production
PORT=3001

# База данных (Railway автоматически добавит DATABASE_URL)
DATABASE_URL=postgresql://...

# Безопасность
JWT_SECRET=your_super_secret_jwt_key_here
SESSION_SECRET=your_super_secret_session_key_here

# Frontend URL (Railway автоматически добавит)
FRONTEND_URL=https://your-app-name.railway.app

# Telegram Bot (добавьте позже)
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_BOT_USERNAME=your_bot_username_here
```

### 4. Добавление PostgreSQL

1. В проекте Railway нажмите "New"
2. Выберите "Database" → "PostgreSQL"
3. Railway автоматически создаст базу и добавит `DATABASE_URL`

### 5. Деплой

1. Railway автоматически запустит деплой
2. Дождитесь завершения сборки
3. Приложение будет доступно по URL вида: `https://your-app-name.railway.app`

## 🔧 Локальная разработка

```bash
# Установка всех зависимостей
npm run install-all

# Запуск в режиме разработки
npm run dev

# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

## 📊 Мониторинг

- **Логи**: Railway Dashboard → Logs
- **Метрики**: Railway Dashboard → Metrics
- **База данных**: Railway Dashboard → PostgreSQL → Connect

## 🔒 Безопасность

1. **Переменные окружения**: Все секреты хранятся в Railway
2. **HTTPS**: Railway автоматически предоставляет SSL
3. **Rate Limiting**: Настроен в backend/server.js
4. **CORS**: Настроен для продакшена

## 🚨 Troubleshooting

### Ошибка подключения к базе данных
```bash
# Проверьте DATABASE_URL в Railway
# Убедитесь, что PostgreSQL запущен
```

### Ошибка сборки
```bash
# Проверьте логи в Railway Dashboard
# Убедитесь, что все зависимости установлены
```

### Frontend не загружается
```bash
# Проверьте, что статические файлы копируются в backend/public
# Убедитесь, что VITE_API_URL настроен правильно
```

## 📈 Масштабирование

Railway автоматически масштабирует приложение:
- **CPU**: До 4 vCPU
- **RAM**: До 8GB
- **Сеть**: Неограниченный трафик

## 💰 Стоимость

- **Бесплатный план**: $5 кредитов/месяц
- **Pro план**: $20/месяц
- **PostgreSQL**: $5/месяц за 1GB

## 🔄 CI/CD

Railway автоматически деплоит при каждом push в main ветку.

## 📞 Поддержка

- **Railway Docs**: https://docs.railway.app/
- **Discord**: https://discord.gg/railway
- **GitHub Issues**: https://github.com/railwayapp/railway
