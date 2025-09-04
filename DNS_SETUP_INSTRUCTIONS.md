# 🌐 Настройка DNS для shadow-quest.online

## Текущая ситуация
- ✅ **Railway URL**: `https://aots-production-9a30.up.railway.app`
- ✅ **Домен**: `shadow-quest.online` (reg.ru)
- ✅ **Хостинг изображений**: ispmanager

## Шаг 1: Настройка DNS в reg.ru

### 1.1 Вход в панель управления
1. Откройте [reg.ru](https://reg.ru)
2. Войдите в свой аккаунт
3. Перейдите в **"Мои домены"**
4. Найдите домен `shadow-quest.online`
5. Нажмите **"Управление"**

### 1.2 Настройка DNS записей
1. Перейдите в раздел **"DNS-записи"**
2. **Удалите существующие записи** для `www.shadow-quest.online` (если есть):
   - A-запись
   - AAAA-запись
3. **Создайте новую CNAME запись**:
   - **Имя**: `www`
   - **Тип**: `CNAME`
   - **Значение**: `aots-production-9a30.up.railway.app`
   - **TTL**: `3600` (или оставьте по умолчанию)

### 1.3 Сохранение изменений
1. Нажмите **"Сохранить"**
2. Подождите подтверждения

## Шаг 2: Проверка DNS

### 2.1 Очистка DNS кэша
```bash
ipconfig /flushdns
```

### 2.2 Проверка DNS записей
```bash
nslookup www.shadow-quest.online
```

Ожидаемый результат:
```
www.shadow-quest.online canonical name = aots-production-9a30.up.railway.app
```

### 2.3 Онлайн проверка DNS
Используйте онлайн сервисы:
- [whatsmydns.net](https://www.whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)

## Шаг 3: Тестирование

### 3.1 Проверка приложения
После настройки DNS (подождите 5-15 минут):
- **URL**: `https://www.shadow-quest.online`
- **Ожидаемый результат**: Загружается ваше приложение

### 3.2 Проверка изображений
- **URL**: `https://www.shadow-quest.online/images/...`
- **Ожидаемый результат**: Изображения загружаются с ispmanager

### 3.3 Проверка API
- **URL**: `https://www.shadow-quest.online/health`
- **Ожидаемый результат**: `{"status": "ok"}`

## Возможные проблемы

### DNS не обновляется
- **Решение**: Подождите до 24 часов
- **Ускорение**: Очистите DNS кэш: `ipconfig /flushdns`

### Изображения не загружаются
- **Проверьте**: CORS настройки на ispmanager
- **Проверьте**: Переменную `VITE_EXTERNAL_ASSETS_BASE_URL`

### SSL сертификат
Railway автоматически предоставляет SSL сертификат для вашего домена.

## Контакты для поддержки

- **Railway**: [docs.railway.com](https://docs.railway.com)
- **reg.ru**: [help.reg.ru](https://help.reg.ru)
- **ispmanager**: [docs.ispsystem.com](https://docs.ispsystem.com)

---

## Резюме настроек

| Параметр | Значение |
|----------|----------|
| **Railway URL** | `aots-production-9a30.up.railway.app` |
| **Домен** | `www.shadow-quest.online` |
| **Тип записи** | `CNAME` |
| **Значение** | `aots-production-9a30.up.railway.app` |
| **Изображения** | `https://www.shadow-quest.online/images/...` |
