# ⚙️ Первоначальная настройка Shadow Quest

## 🚀 Быстрый старт

### 1. Клонирование репозитория
```bash
git clone https://github.com/379th/AotS.git
cd AotS
```

### 2. Установка зависимостей
```bash
cd frontend
npm install
```

### 3. Настройка переменных окружения
Создайте файл `.env` в папке `frontend/`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id

# Telegram Bot Configuration
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_BOT_USERNAME=your_bot_username

# App Configuration
VITE_APP_NAME=Shadow Quest
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

### 4. Запуск в режиме разработки
```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

## 🔧 Настройка Firebase

### 1. Создание проекта
1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Нажмите "Create a project"
3. Введите название: "Shadow Quest"
4. Включите Google Analytics (опционально)
5. Выберите аккаунт для Analytics

### 2. Настройка Firestore
1. В боковом меню выберите "Firestore Database"
2. Нажмите "Create database"
3. Выберите "Start in test mode"
4. Выберите ближайший регион

### 3. Получение конфигурации
1. В боковом меню выберите "Project settings"
2. Прокрутите до "Your apps"
3. Нажмите "Add app" → "Web"
4. Введите название: "Shadow Quest Web"
5. Скопируйте конфигурацию

### 4. Правила безопасности
В Firestore Database → Rules замените на:

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

## 🤖 Настройка Telegram Bot

### 1. Создание бота
1. Откройте [@BotFather](https://t.me/botfather) в Telegram
2. Отправьте `/newbot`
3. Введите название: "Shadow Quest"
4. Введите username: "your_shadow_quest_bot"
5. Сохраните Bot Token

### 2. Настройка Web App
1. Отправьте `/newapp`
2. Выберите созданного бота
3. Введите название: "Shadow Quest"
4. Введите описание: "Психологический квест 'Принятие тени'"
5. Загрузите иконку (опционально)

### 3. Настройка меню
1. Отправьте `/setmenubutton`
2. Выберите бота
3. Введите текст кнопки: "🎭 Shadow Quest"
4. Введите URL: "https://your-app-url.com"

## 🐳 Docker настройка

### 1. Установка Docker
- [Windows](https://docs.docker.com/desktop/install/windows/)
- [macOS](https://docs.docker.com/desktop/install/mac/)
- [Linux](https://docs.docker.com/engine/install/)

### 2. Сборка образа
```bash
# Из корневой папки проекта
docker build -t shadow-quest .
```

### 3. Запуск контейнера
```bash
docker run -p 3000:3000 shadow-quest
```

### 4. Docker Compose
```bash
# Создайте .env файл в корневой папке
cp .env.example .env
# Отредактируйте переменные

docker-compose up --build
```

## 📱 Тестирование

### 1. Локальное тестирование
```bash
npm run dev
# Откройте http://localhost:5173
```

### 2. Сборка для продакшена
```bash
npm run build
npm run preview
# Откройте http://localhost:4173
```

### 3. Тестирование в Telegram
1. Настройте бота с локальным URL (ngrok)
2. Протестируйте все экраны
3. Проверьте сохранение данных

## 🔍 Отладка

### Логи разработки
```bash
npm run dev
# Следите за консолью браузера
```

### Логи сборки
```bash
npm run build
# Проверьте ошибки TypeScript
```

### Логи Docker
```bash
docker logs container_name
```

## 📚 Полезные команды

```bash
# Разработка
npm run dev          # Запуск dev сервера
npm run build        # Сборка для продакшена
npm run preview      # Предварительный просмотр
npm run lint         # Проверка кода
npm run lint:fix     # Автоисправление

# Docker
docker build -t shadow-quest .     # Сборка образа
docker run -p 3000:3000 shadow-quest  # Запуск контейнера
docker-compose up --build          # Запуск с compose

# Git
git add .                          # Добавить изменения
git commit -m "message"            # Создать коммит
git push origin main               # Отправить изменения
```

## 🚨 Частые проблемы

### 1. Ошибка "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. Ошибка сборки TypeScript
```bash
npm run lint:fix
# Проверьте импорты и типы
```

### 3. Firebase не подключается
- Проверьте переменные окружения
- Убедитесь, что Firestore включен
- Проверьте правила безопасности

### 4. Telegram Web App не работает
- Проверьте URL в настройках бота
- Убедитесь, что HTTPS настроен
- Проверьте консоль браузера

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи
2. Убедитесь в правильности настроек
3. Проверьте документацию
4. Создайте issue в репозитории

---

**Готово к разработке!** 🚀✨
