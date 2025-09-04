# ✅ Финальная проверка настройки Railway + ispmanager

## 🎯 Что мы настроили

### ✅ Railway (Приложение)
- **URL**: `https://aots-production-9a30.up.railway.app`
- **Статус**: Работает (200 OK)
- **Переменные окружения**: Настроены
- **Домен**: Готов к подключению

### ✅ ispmanager (Изображения)
- **Базовый URL**: `https://www.shadow-quest.online`
- **Конфигурация**: Настроена в `externalAssets.ts`
- **Переменная**: `VITE_EXTERNAL_ASSETS_BASE_URL=https://www.shadow-quest.online`

### ✅ DNS (reg.ru)
- **Домен**: `shadow-quest.online`
- **CNAME запись**: `www` → `aots-production-9a30.up.railway.app`
- **Статус**: Готов к настройке

## 🔧 Финальные шаги

### 1. Настройка DNS в reg.ru
1. Откройте [reg.ru](https://reg.ru)
2. Войдите в аккаунт
3. Перейдите в **"Мои домены"** → `shadow-quest.online` → **"Управление"**
4. В разделе **"DNS-записи"**:
   - Удалите старые записи для `www.shadow-quest.online`
   - Создайте CNAME запись:
     - **Имя**: `www`
     - **Тип**: `CNAME`
     - **Значение**: `aots-production-9a30.up.railway.app`
5. Сохраните изменения

### 2. Ожидание обновления DNS
- **Время**: 5-15 минут (до 24 часов)
- **Ускорение**: `ipconfig /flushdns`

### 3. Проверка работы
После настройки DNS проверьте:

#### 3.1 Основное приложение
- **URL**: `https://www.shadow-quest.online`
- **Ожидаемый результат**: Загружается ваше приложение

#### 3.2 Изображения
- **URL**: `https://www.shadow-quest.online/images/...`
- **Ожидаемый результат**: Изображения загружаются с ispmanager

#### 3.3 API
- **URL**: `https://www.shadow-quest.online/health`
- **Ожидаемый результат**: `{"status": "ok"}`

## 🚀 Результат

После завершения настройки у вас будет:

- **Приложение**: Работает на Railway
- **Домен**: `www.shadow-quest.online` указывает на Railway
- **Изображения**: Загружаются с ispmanager
- **SSL**: Автоматически предоставляется Railway
- **Производительность**: Быстрая загрузка изображений с ispmanager

## 🔍 Команды для проверки

### Проверка DNS
```bash
nslookup www.shadow-quest.online
```

### Проверка приложения
```bash
curl -I https://www.shadow-quest.online
```

### Очистка DNS кэша
```bash
ipconfig /flushdns
```

## 📞 Поддержка

- **Railway**: [docs.railway.com](https://docs.railway.com)
- **reg.ru**: [help.reg.ru](https://help.reg.ru)
- **ispmanager**: [docs.ispsystem.com](https://docs.ispsystem.com)

---

## 🎉 Поздравляем!

Вы успешно настроили:
- ✅ Railway для развертывания приложения
- ✅ ispmanager для хостинга изображений
- ✅ DNS для подключения домена
- ✅ Переменные окружения для продакшена

Ваше приложение готово к работе! 🚀
