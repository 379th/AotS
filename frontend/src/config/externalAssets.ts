// Конфигурация внешних ресурсов (изображения на ISPmanager)
export const EXTERNAL_ASSETS = {
  // Базовый URL для изображений на ISPmanager
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? (import.meta.env.VITE_EXTERNAL_ASSETS_BASE_URL || 'https://www.shadow-quest.online')
    : '/images', // Для локальной разработки
  
  // Изображения для кнопок и панелей
  BUTTONS: {
    // Фон для BottomButtonPanel
    PANEL_BACKGROUND: '/images/buttons/button-panel-bg.png',
    
    // Фон для NavigationPanel
    NAVIGATION_BACKGROUND: '/images/buttons/navigation-panel-bg.png',
    
    // Иконки для RoundButton
    TRAINING_ICON: '/images/buttons/training-icon.png',
    QUEST_ICON: '/images/buttons/quest-icon.png',
    DECK_ICON: '/images/buttons/deck-icon.png',
    JOURNAL_ICON: '/images/buttons/journal-icon.png',
    EXIT_ICON: '/images/buttons/exit-icon.png',
    
    // Кнопки главного экрана (IntroScreen)
    ABOUT_CREATOR: '/images/buttons/about-creator.png',
    ABOUT_QUEST: '/images/buttons/about-quest.png',
    FAQ: '/images/buttons/faq.png',
    SETTINGS: '/images/buttons/settings.png',
    START: '/images/buttons/start.png',
  },
  
  // Фоновые изображения для экранов
  BACKGROUNDS: {
    MAIN_BACKGROUND: '/images/main-bg.png',
    DAY2_BACKGROUND: '/images/day2-bg.png',
    PANEL_BACKGROUND: '/images/panel-bg.png',
  },
  
  // Основные изображения экранов
  SCREENS: {
    INTRO: '/images/first screens/intro.png',
    DAY1_FOREST: '/images/first screens/day1Forest.png',
    DAY2_CAVE: '/images/first screens/day2Cave.png',
    DAY2_ECHO: '/images/first screens/day2.png',
    DAY3_MIRROR: '/images/first screens/day3Mirror.png',
    DAY4_TEMPLE: '/images/first screens/day4Temple.png',
  },
  
  // Декоративные элементы
  DECORATIVE: {
    FRAME_BORDER: '/images/frame-border.png',
    SHADOW_OVERLAY: '/images/shadow-overlay.png',
    TEXTURE: '/images/texture.png',
  },
  
  // Навигационные плашки для TitleBar
  NAVIGATION: {
    DAY1_TITLE: '/images/navigation/day1-title.png',
    DAY2_TITLE: '/images/navigation/day2-title.png',
    DAY2_LETTERS_TITLE: '/images/navigation/day2-letters-title.png',
    SHADOW_TITLE: '/images/navigation/shadow-title.png',
    ARCHETYPE_TITLE: '/images/navigation/archetype-title.png',
    QUEST_TITLE: '/images/navigation/quest-title.png',
    DECK_TITLE: '/images/navigation/deck-title.png',
    JOURNAL_TITLE: '/images/navigation/journal-title.png',
    FAQ_TITLE: '/images/navigation/faq-title.png',
    SETTINGS_TITLE: '/images/navigation/settings-title.png',
    CREATOR_TITLE: '/images/navigation/creator-title.png',
  },
  
  // Пары изображений Тень/Архетип
  SHADOW_ARCHETYPE_PAIRS: [
    {
      shadow: '/images/shadow-archetype/pair1-shadow.png',
      archetype: '/images/shadow-archetype/pair1-archetype.png',
      name: 'Пара 1: Тень и Архетип'
    },
    {
      shadow: '/images/shadow-archetype/pair2-shadow.png',
      archetype: '/images/shadow-archetype/pair2-archetype.png',
      name: 'Пара 2: Тень и Архетип'
    },
    {
      shadow: '/images/shadow-archetype/pair3-shadow.png',
      archetype: '/images/shadow-archetype/pair3-archetype.png',
      name: 'Пара 3: Тень и Архетип'
    },
    {
      shadow: '/images/shadow-archetype/pair4-shadow.png',
      archetype: '/images/shadow-archetype/pair4-archetype.png',
      name: 'Пара 4: Тень и Архетип'
    },
    {
      shadow: '/images/shadow-archetype/pair5-shadow.png',
      archetype: '/images/shadow-archetype/pair5-archetype.png',
      name: 'Пара 5: Тень и Архетип'
    }
  ]
};

// Функция для получения полного URL изображения
export const getImageUrl = (path: string): string => {
  if (path.startsWith('http')) {
    return path; // Уже полный URL
  }
  return `${EXTERNAL_ASSETS.BASE_URL}${path}`;
};

// Функция для получения фонового изображения
export const getBackgroundImage = (path: string): string => {
  return `url(${getImageUrl(path)})`;
};

// Функция для получения случайной пары изображений Тень/Архетип
export const getRandomShadowArchetypePair = () => {
  const pairs = EXTERNAL_ASSETS.SHADOW_ARCHETYPE_PAIRS;
  const randomIndex = Math.floor(Math.random() * pairs.length);
  return pairs[randomIndex];
};

// Функция для получения случайного изображения из пары
export const getRandomShadowImage = () => {
  const pair = getRandomShadowArchetypePair();
  return getImageUrl(pair.shadow);
};

export const getRandomArchetypeImage = () => {
  const pair = getRandomShadowArchetypePair();
  return getImageUrl(pair.archetype);
};

// Функция для получения связанной пары (одинаковый индекс)
export const getRelatedPair = (index: number) => {
  const pairs = EXTERNAL_ASSETS.SHADOW_ARCHETYPE_PAIRS;
  if (index >= 0 && index < pairs.length) {
    return pairs[index];
  }
  return pairs[0]; // fallback
};
