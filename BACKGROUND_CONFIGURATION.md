# 🎨 Конфигурация фоновых изображений

## 📁 Структура папок

### Локальная разработка
```
C:\AotS\frontend\public\Sorce\background\
└── Background.png
```

### Продакшн (ISPmanager)
```
/www/shadow-quest.online/images/background/
└── Background.png
```

## ⚙️ Настройка

### 1. Конфигурация в `externalAssets.ts`
```typescript
BACKGROUNDS: {
  MAIN_BACKGROUND: '/images/background/Background.png',
  DAY2_BACKGROUND: '/images/background/Background.png',
  PANEL_BACKGROUND: '/images/background/Background.png',
}
```

### 2. Автоматическое переключение
- **Локальная разработка**: `/images/` → `/Sorce/`
- **Продакшн**: `/images/` → `https://www.shadow-quest.online/images/`

### 3. Использование в компонентах
```typescript
import { EXTERNAL_ASSETS, getBackgroundStyle } from './config/externalAssets';

// В компоненте
<div style={getBackgroundStyle(EXTERNAL_ASSETS.BACKGROUNDS.MAIN_BACKGROUND)}>
  {/* Контент */}
</div>
```

## 🔄 Обновление

1. **Локально**: Поместите `Background.png` в `frontend/public/Sorce/background/`
2. **Продакшн**: Загрузите `Background.png` в `/www/shadow-quest.online/images/background/`
3. **Перезапустите** приложение

## ✅ Проверка

- **Локально**: `http://localhost:5173`
- **Продакшн**: `https://www.shadow-quest.online`

Фоновое изображение должно отображаться на всех экранах приложения.
