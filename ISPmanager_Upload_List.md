# 📁 Список файлов для загрузки на ISPmanager

## 🎯 **Цель:** Загрузить все изображения на `https://www.shadow-quest.online/images/`

### 📂 **Структура папок на ISPmanager:**

```
/www/shadow-quest.online/images/
├── background/
│   └── Background.png
├── buttons/
│   ├── About Creator.png
│   ├── About Quest.png
│   ├── Back.png
│   ├── Continue.png
│   ├── FAQ.png
│   ├── Settings.png
│   └── Start.png
├── first screens/
│   ├── day1Forest.png
│   ├── day2Cave.png
│   ├── day3Mirror.png
│   ├── day4Temple.png
│   └── intro.png
├── navigation/
│   ├── archetype.png
│   ├── completion.png
│   ├── creator.png
│   ├── day1.png
│   ├── day1Questions.png
│   ├── day2.png
│   ├── day2Letters.png
│   ├── day2Screen.png
│   ├── day3Mirror.png
│   ├── day3PartnerTask.png
│   ├── day3Resource.png
│   ├── day4Integration.png
│   ├── day4Temple.png
│   ├── deck.png
│   ├── faq.png
│   ├── guidance.png
│   ├── intro.png
│   ├── journal.png
│   ├── progress.png
│   ├── quest.png
│   ├── request.png
│   ├── settings.png
│   ├── shadowImage.png
│   ├── timer1.png
│   ├── timer2.png
│   └── timer3.png
├── navigation_panel/
│   ├── 01_Learning.png
│   ├── 02_Quest.png
│   ├── 03_Diary.png
│   ├── 04_Deck.png
│   ├── 05_Exit.png
│   └── back_navigation_panel.png
└── shadow-archetype/
    ├── pair1-shadow.png
    ├── pair1-archetype.png
    ├── pair2-shadow.png
    ├── pair2-archetype.png
    └── ... (все 63 пары)
```

### 📋 **Приоритет загрузки:**

1. **🔥 КРИТИЧНО:**
   - `background/Background.png` - основной фон
   - `buttons/` - все кнопки
   - `navigation_panel/` - панель навигации

2. **⚡ ВАЖНО:**
   - `first screens/` - изображения экранов
   - `navigation/` - плашки заголовков

3. **📊 ДОПОЛНИТЕЛЬНО:**
   - `shadow-archetype/` - 126 файлов пар

### 🔄 **После загрузки:**

1. Раскомментировать код в `externalAssets.ts`
2. Развернуть обновления на Railway
3. Проверить работу продакшн версии

### 📁 **Локальные файлы находятся в:**
`C:\AotS\frontend\public\Sorce\`
