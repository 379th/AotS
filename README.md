# 🎭 Shadow Quest - Telegram Mini App

> **Интерактивный психологический квест "Принятие тени" для Telegram**

[![Telegram Mini App](https://img.shields.io/badge/Telegram-Mini%20App-blue.svg)](https://core.telegram.org/bots/webapps)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-yellow.svg)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0+-orange.svg)](https://firebase.google.com/)

## 🌟 Обзор проекта

**Shadow Quest** - это интерактивный Telegram Mini App, представляющий собой психологический квест "Принятие тени". Приложение помогает пользователям исследовать различные аспекты своей личности через систему карт и персонажей-архетипов, основанную на работах Карла Юнга.

## 🎭 О проекте

Это современное веб-приложение для Telegram, основанное на психологических практиках Карла Юнга и методах работы с тенью. Квест помогает пользователям:

- Осознать свои внутренние конфликты
- Наладить диалог с "теневыми" аспектами личности  
- Найти архетипические опоры для гармонизации
- Создать личный символ целостности

## 🚀 Технологии

### Frontend
- **React 18** с TypeScript
- **Vite** для быстрой разработки
- **Tailwind CSS** для стилизации
- **Telegram WebApp SDK** для интеграции
- **Lucide React** для иконок

### Backend (планируется)
- Node.js / Express
- PostgreSQL / MongoDB
- Docker для контейнеризации

### Деплой
- **Railway** для хостинга
- Docker контейнеры
- CI/CD через GitHub Actions

## 📁 Структура проекта

```
AotS/
├── frontend/                 # React приложение
│   ├── src/
│   │   ├── components/       # UI компоненты
│   │   ├── screens/          # Экраны приложения
│   │   ├── hooks/            # React хуки
│   │   ├── utils/            # Утилиты
│   │   └── config/           # Конфигурация
│   └── ...
├── backend/                  # API сервер (планируется)
├── docker-compose.yml        # Конфигурация Docker
└── README.md
```

## 🛠 Разработка

### Установка зависимостей
```bash
cd frontend
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка для продакшена
```bash
npm run build
```

## 🎨 Дизайн

Приложение использует мистическую цветовую палитру с готическими элементами:
- Темно-фиолетовый градиентный фон
- Золотисто-янтарные акценты
- Готический шрифт UnifrakturMaguntia для заголовков
- Декоративные рамки в стиле кинцуги

## 📱 Экраны

1. **Intro** - Главный экран с введением
2. **Request** - Формулирование запроса
3. **Day 1-4** - Этапы квеста
4. **Creator** - О создателе
5. **Quest Info** - Информация о квесте
6. **FAQ** - Часто задаваемые вопросы
7. **Deck** - Колода карт
8. **Journal** - Дневник пользователя

## 🔄 Этапы разработки

- [x] ✅ Анализ исходного кода
- [x] ✅ Создание структуры React проекта  
- [x] ✅ Базовые UI компоненты
- [ ] 🔄 Все экраны приложения
- [ ] ⏳ Интеграция бэкенда
- [ ] ⏳ Docker настройка
- [ ] ⏳ Деплой на Railway

## 👨‍💻 Автор

Vladimir Lakshman Das - практик пути «Радость. Осознанность. Баланс. Гармония»

## 📄 Лицензия

MIT License - см. файл LICENSE для деталей

