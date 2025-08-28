# 🚀 Руководство по развертыванию Shadow Quest

## 📋 Предварительные требования

### 1. Firebase проект
1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Создайте новый проект
3. Включите Firestore Database
4. Получите конфигурацию:
   - Project ID
   - API Key
   - Auth Domain
   - Storage Bucket
   - Messaging Sender ID
   - App ID

### 2. Telegram Bot
1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите Bot Token
3. Настройте Web App:
   ```
   /newapp
   Выберите бота
   Введите название: Shadow Quest
   Введите описание: Психологический квест "Принятие тени"
   ```

## 🔧 Локальная разработка

### Установка зависимостей
```bash
cd frontend
npm install
```

### Настройка переменных окружения
Создайте файл `.env` в папке `frontend/`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id

# Telegram Bot Configuration
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TELEGRAM_BOT_USERNAME=your_bot_username

# App Configuration
VITE_APP_NAME=Shadow Quest
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

### Запуск в режиме разработки
```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

## 🐳 Docker развертывание

### Локальная сборка
```bash
# Из корневой папки проекта
docker build -t shadow-quest .
docker run -p 3000:3000 shadow-quest
```

### Docker Compose
```bash
# Создайте .env файл в корневой папке
cp .env.example .env
# Отредактируйте переменные окружения

# Запустите
docker-compose up --build
```

## ☁️ Railway развертывание

### 1. Подготовка
1. Создайте аккаунт на [Railway](https://railway.app/)
2. Подключите GitHub репозиторий
3. Создайте новый проект

### 2. Настройка переменных окружения
В Railway Dashboard добавьте переменные:

```
NODE_ENV=production
PORT=3000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TELEGRAM_BOT_USERNAME=your_bot_username
VITE_APP_NAME=Shadow Quest
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production
```

### 3. Деплой
1. Railway автоматически обнаружит `Dockerfile`
2. При каждом push в main ветку произойдет автоматический деплой
3. Получите URL приложения из Railway Dashboard

### 4. Настройка Telegram Web App
В настройках бота укажите URL Railway приложения:
```
/setmenubutton
Выберите бота
Введите URL: https://your-app.railway.app
```

## 🔒 Безопасность

### Firebase Security Rules
Настройте правила безопасности для Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Переменные окружения
- Никогда не коммитьте `.env` файлы
- Используйте секреты в Railway
- Регулярно обновляйте токены

## 📊 Мониторинг

### Railway Metrics
- CPU и Memory usage
- Request/Response times
- Error rates

### Firebase Analytics
- User engagement
- Screen views
- Custom events

## 🚨 Troubleshooting

### Частые проблемы

1. **Ошибка сборки**
   ```bash
   npm run build
   # Проверьте ошибки TypeScript
   ```

2. **Firebase не подключается**
   - Проверьте переменные окружения
   - Убедитесь, что Firestore включен

3. **Telegram Web App не работает**
   - Проверьте URL в настройках бота
   - Убедитесь, что HTTPS настроен

4. **Docker не собирается**
   ```bash
   docker build --no-cache -t shadow-quest .
   ```

### Логи
```bash
# Railway logs
railway logs

# Docker logs
docker logs container_name

# Local logs
npm run dev
```

## 📈 Масштабирование

### Railway
- Автоматическое масштабирование
- Load balancing
- CDN для статических файлов

### Firebase
- Автоматическое масштабирование
- Offline поддержка
- Real-time обновления

## 🔄 CI/CD

### GitHub Actions (опционально)
Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Railway
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: railway/deploy@v1
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи
2. Убедитесь в правильности переменных окружения
3. Проверьте документацию Firebase и Telegram
4. Создайте issue в репозитории

---

**Удачи с развертыванием!** 🚀✨
