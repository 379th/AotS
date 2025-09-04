# Руководство по прокрутке страниц

## 🎯 **Цель**
Добавить прокрутку на все страницы приложения, чтобы кнопки не заходили на основной блок контента.

## 🔧 **Компонент ScrollableScreen**

### **Использование:**
```tsx
import { ScrollableScreen } from '../components/ui';

return (
  <ScreenFrame>
    <ScrollableScreen>
      {/* TitleBar */}
      <TitleBar text="Заголовок" />
      
      {/* Основной контент */}
      <div className="mx-auto mt-3 w-[92%]">
        {/* Ваш контент */}
      </div>

      {/* Кнопки и панель навигации */}
      <div className="mx-auto mt-6 w-[92%] space-y-4">
        <BottomButtonPanel onBack={onBack} onContinue={onNext} />
        <NavigationPanel {...navigationProps} />
      </div>
    </ScrollableScreen>
  </ScreenFrame>
);
```

### **Параметры:**
- `bottomPadding` (опционально): отступ снизу в пикселях (по умолчанию 32px)

## 📱 **Структура страницы с прокруткой:**

1. **ScreenFrame** - основной контейнер
2. **ScrollableScreen** - контейнер с прокруткой
   - TitleBar
   - Основной контент
   - Кнопки и панель навигации (внутри ScrollableScreen)
3. **Прокрутка** - все элементы прокручиваются вместе

## ✅ **Уже обновленные страницы:**
- ✅ IntroScreen
- ✅ Day1Screen  
- ✅ Day2Screen (использует day2Screen.png для TitleBar)
- ✅ Day2EchoScreen

## 🔄 **Следующие страницы для обновления:**
- Day3MirrorScreen
- Day4TempleScreen
- ShadowImageScreen
- ArchetypeScreen
- И другие...

## 💡 **Преимущества:**
- Кнопки не заходят на контент
- Плавная прокрутка
- Единообразный дизайн
- Легко поддерживать
