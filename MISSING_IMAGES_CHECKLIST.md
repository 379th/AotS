# 🔍 Список недостающих изображений на ISPmanager

## ❌ **Проблемные изображения (видно на скриншоте):**

### 📋 **Навигационные плашки:**
- `navigation/day2.png` - плашка "День 2 — Пещера Эха"
- `navigation/day2Screen.png` - плашка "Пещера Эха"

### 🖼️ **Изображения экранов:**
- `first screens/day2Cave.png` - основное изображение экрана "Пещера Эха"

## ✅ **Проверьте наличие на ISPmanager:**

### 📁 **Структура папок:**
```
/www/shadow-quest.online/images/
├── navigation/
│   ├── day2.png ✅
│   ├── day2Screen.png ✅
│   └── ... (остальные)
├── first screens/
│   ├── day2Cave.png ✅
│   └── ... (остальные)
```

## 🔧 **Как проверить:**

1. **Откройте** `https://www.shadow-quest.online/images/navigation/day2.png`
2. **Откройте** `https://www.shadow-quest.online/images/navigation/day2Screen.png`
3. **Откройте** `https://www.shadow-quest.online/images/first screens/day2Cave.png`

## 📋 **Если изображения отсутствуют:**

1. **Загрузите** недостающие файлы на ISPmanager
2. **Проверьте** правильность путей и имен файлов
3. **Убедитесь** что файлы доступны по прямым ссылкам
4. **После загрузки** раскомментируйте код в `externalAssets.ts`

## 🎯 **Приоритет загрузки:**

1. **🔥 КРИТИЧНО:** `navigation/day2.png`, `navigation/day2Screen.png`
2. **⚡ ВАЖНО:** `first screens/day2Cave.png`
3. **📊 ДОПОЛНИТЕЛЬНО:** Остальные изображения экранов и навигации
