# 🚀 Railway Deployment с проверкой адаптивности

## 📋 Обзор

Этот проект настроен для автоматического деплоя в Railway с обязательной проверкой адаптивности элементов перед каждым деплоем.

## 🔧 Настройка

### 1. Первоначальная настройка
```bash
# Установка и настройка Railway
npm run railway:setup
```

### 2. Ручная настройка (альтернатива)
```bash
# Установка Railway CLI
npm install -g @railway/cli

# Логин в Railway
railway login

# Инициализация проекта
railway init

# Настройка переменных окружения
railway variables set NODE_ENV=production
railway variables set VITE_APP_ENV=production
```

## 🚀 Деплой

### Безопасный деплой с проверкой адаптивности
```bash
# Рекомендуемый способ
npm run railway:deploy
```

### Обычный деплой (без проверки)
```bash
railway up
```

### Только проверка адаптивности
```bash
npm run railway:check
```

## 📱 Проверка адаптивности

Система автоматически проверяет:

- ✅ **Адаптивные брейкпоинты** - наличие `sm:`, `md:`, `lg:` классов
- ✅ **Базовые классы** - использование `w-full` вместо фиксированных размеров
- ✅ **Ограничения ширины** - правильное использование `max-w-*`
- ✅ **Адаптивность текста** - размеры шрифтов с брейкпоинтами
- ✅ **Мобильная совместимость** - элементы не выходят за границы экрана

## 📊 Отчеты

После каждой проверки создается отчет:
- `frontend/responsive-report.txt` - локальный отчет
- `responsive-reports/railway-check-YYYYMMDD-HHMMSS.txt` - архивные отчеты

## 🐳 Docker конфигурация

### Основной контейнер (`Dockerfile.railway`)
- Проверка адаптивности перед сборкой
- Сборка production версии
- Запуск через `serve`

### Контейнер проверки (`Dockerfile.checker`)
- Отдельный сервис для проверки адаптивности
- Монтирование исходного кода
- Сохранение отчетов

## ⚙️ Конфигурация Railway

### `railway.json`
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd frontend && npm ci && npm run build"
  },
  "deploy": {
    "startCommand": "cd frontend && npm run preview",
    "healthcheckPath": "/"
  }
}
```

### `railway-deploy.yml`
- Многосервисная конфигурация
- Отдельный сервис для проверки адаптивности
- Health checks и restart policies

## 🔍 Мониторинг

### Health Checks
- HTTP проверка на `/`
- Таймаут: 100ms
- Интервал: 30s
- Максимум попыток: 10

### Логи
```bash
# Просмотр логов Railway
railway logs

# Логи конкретного сервиса
railway logs --service frontend
```

## 🚨 Troubleshooting

### Проблемы с адаптивностью
1. Запустите локальную проверку: `npm run check:responsive`
2. Исправьте найденные проблемы
3. Повторите деплой: `npm run railway:deploy`

### Проблемы с деплоем
1. Проверьте логи: `railway logs`
2. Убедитесь в правильности переменных окружения
3. Проверьте доступность портов

### Проблемы с Railway CLI
```bash
# Переустановка CLI
npm uninstall -g @railway/cli
npm install -g @railway/cli

# Повторный логин
railway logout
railway login
```

## 📚 Полезные команды

```bash
# Статус проекта
railway status

# Переменные окружения
railway variables

# Подключение к базе данных (если есть)
railway connect

# Просмотр метрик
railway metrics
```

## 🎯 Best Practices

1. **Всегда используйте** `npm run railway:deploy` для деплоя
2. **Проверяйте отчеты** адаптивности перед деплоем
3. **Тестируйте локально** перед отправкой в Railway
4. **Мониторьте логи** после деплоя
5. **Используйте переменные окружения** для конфигурации

## 🔗 Полезные ссылки

- [Railway Documentation](https://docs.railway.app/)
- [Railway CLI Reference](https://docs.railway.app/develop/cli)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
