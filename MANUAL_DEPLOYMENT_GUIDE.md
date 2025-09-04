# 🚀 Ручное развертывание на Railway

## Шаг 1: Аутентификация в Railway

### Вариант A: Через браузер
1. Откройте [railway.app](https://railway.app)
2. Войдите в свой аккаунт
3. В терминале выполните:
   ```bash
   railway login
   ```
4. Нажмите `y` для открытия браузера
5. Авторизуйтесь в браузере

### Вариант B: Через токен
1. В Railway Dashboard перейдите в Settings → Tokens
2. Создайте новый токен
3. В терминале выполните:
   ```bash
   $env:RAILWAY_API_TOKEN="ваш_токен"
   ```

## Шаг 2: Создание/подключение проекта

### Если у вас уже есть проект на Railway:
```bash
railway link
```
Выберите существующий проект.

### Если нужно создать новый проект:
```bash
railway init
```
Введите название проекта: `shadow-quest`

## Шаг 3: Настройка переменных окружения

В Railway Dashboard → Project → Variables добавьте:

```
VITE_EXTERNAL_ASSETS_BASE_URL=https://www.shadow-quest.online
VITE_APP_ENV=production
NODE_ENV=production
PORT=3001
```

## Шаг 4: Развертывание

```bash
railway up
```

Или для фонового развертывания:
```bash
railway up --detach
```

## Шаг 5: Получение URL

После развертывания Railway предоставит URL вида:
```
https://your-project-name.up.railway.app
```

## Шаг 6: Настройка DNS

1. Скопируйте URL из Railway
2. В reg.ru создайте CNAME запись:
   - **Имя**: `www`
   - **Тип**: `CNAME`
   - **Значение**: `your-project-name.up.railway.app`

## Шаг 7: Проверка

1. Подождите 5-15 минут для обновления DNS
2. Проверьте: `https://www.shadow-quest.online`
3. Проверьте изображения: `https://www.shadow-quest.online/images/...`

## Возможные проблемы

### Ошибка аутентификации
- Убедитесь, что вы вошли в правильный аккаунт Railway
- Попробуйте `railway logout` и `railway login` снова

### Ошибка развертывания
- Проверьте, что все файлы загружены
- Убедитесь, что Dockerfile корректен
- Проверьте логи в Railway Dashboard

### DNS не работает
- Подождите до 24 часов
- Очистите DNS кэш: `ipconfig /flushdns`
- Проверьте настройки в reg.ru

## Полезные команды

```bash
# Проверка статуса
railway status

# Просмотр логов
railway logs

# Переменные окружения
railway variables

# SSH подключение
railway ssh
```
