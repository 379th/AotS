# 🌐 Настройка DNS для shadow-quest.online

## Текущая ситуация
- ✅ Домен: `shadow-quest.online` (reg.ru)
- ✅ Хостинг: ispmanager (изображения)
- ✅ Приложение: Railway (развертывание)

## Шаг 1: Получить URL Railway

После развертывания на Railway вы получите URL вида:
```
https://your-project-name.up.railway.app
```

## Шаг 2: Настройка DNS в reg.ru

### Вариант A: Только www поддомен (Рекомендуемый)

1. **Удалите существующие записи** для `www.shadow-quest.online`:
   - A-запись
   - AAAA-запись

2. **Создайте CNAME запись**:
   - **Имя**: `www`
   - **Тип**: `CNAME`
   - **Значение**: `your-project-name.up.railway.app`
   - **TTL**: `3600`

### Вариант B: Корневой домен + www

1. **Для корневого домена** (`shadow-quest.online`):
   - **Имя**: `@`
   - **Тип**: `A`
   - **Значение**: IP адрес Railway (получить через `nslookup your-project-name.up.railway.app`)

2. **Для www поддомена**:
   - **Имя**: `www`
   - **Тип**: `CNAME`
   - **Значение**: `your-project-name.up.railway.app`

## Шаг 3: Проверка DNS

После настройки DNS подождите 5-15 минут и проверьте:

```bash
# Проверка www поддомена
nslookup www.shadow-quest.online

# Проверка корневого домена (если настроили)
nslookup shadow-quest.online

# Очистка DNS кэша
ipconfig /flushdns
```

## Шаг 4: Настройка переменных окружения в Railway

В Railway Dashboard добавьте переменные:

```
VITE_EXTERNAL_ASSETS_BASE_URL=https://www.shadow-quest.online
VITE_APP_ENV=production
NODE_ENV=production
PORT=3001
```

## Шаг 5: Тестирование

1. **Проверьте приложение**: `https://www.shadow-quest.online`
2. **Проверьте изображения**: `https://www.shadow-quest.online/images/...`
3. **Проверьте API**: `https://www.shadow-quest.online/health`

## Возможные проблемы

### DNS не обновляется
- Подождите до 24 часов
- Очистите DNS кэш: `ipconfig /flushdns`
- Используйте онлайн DNS checker

### Изображения не загружаются
- Проверьте CORS настройки на ispmanager
- Убедитесь, что пути к изображениям правильные
- Проверьте переменную `VITE_EXTERNAL_ASSETS_BASE_URL`

### SSL сертификат
Railway автоматически предоставляет SSL сертификат для вашего домена.

## Контакты для поддержки

- **Railway**: [docs.railway.com](https://docs.railway.com)
- **reg.ru**: [help.reg.ru](https://help.reg.ru)
- **ispmanager**: [docs.ispsystem.com](https://docs.ispsystem.com)