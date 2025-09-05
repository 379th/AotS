import React from 'react';

// Конфигурация внешних ресурсов (изображения на ISPmanager)
export const EXTERNAL_ASSETS = {
  // Базовый URL для изображений на ISPmanager
  BASE_URL: import.meta.env.VITE_EXTERNAL_ASSETS_BASE_URL || 'https://www.shadow-quest.online',
  
  // Изображения для кнопок и панелей
  BUTTONS: {
    // Фон для BottomButtonPanel
    PANEL_BACKGROUND: '/images/buttons/button-panel-bg.png',
    
    // Фон для NavigationPanel
    NAVIGATION_BACKGROUND: '/images/navigation panel/back_navigation_panel.png',
    
    // Иконки для RoundButton
    TRAINING_ICON: '/images/navigation panel/01_Learning.png',
    QUEST_ICON: '/images/navigation panel/02_Quest.png',
    DECK_ICON: '/images/navigation panel/04_Deck.png',
    JOURNAL_ICON: '/images/navigation panel/03_Diary.png',
    EXIT_ICON: '/images/navigation panel/05_Exit.png',
    
    // Кнопки главного экрана (IntroScreen)
    ABOUT_CREATOR: '/images/buttons/About Creator.png',
    ABOUT_QUEST: '/images/buttons/About Quest.png',
    FAQ: '/images/buttons/FAQ.png',
    SETTINGS: '/images/buttons/Settings.png',
    START: '/images/buttons/Start.png',
  },
  
  // Фоновые изображения для экранов
  BACKGROUNDS: {
    MAIN_BACKGROUND: '/images/background/Background.png',
    DAY2_BACKGROUND: '/images/background/Background.png',
    PANEL_BACKGROUND: '/images/background/Background.png',
  },
  
  // Основные изображения экранов
  SCREENS: {
    INTRO: '/images/first screens/intro.png',
    DAY1_FOREST: '/images/first screens/day1Forest.png',
    DAY2_CAVE: '/images/first screens/day2Cave.png',
    DAY2_ECHO: '/images/first screens/day2Cave.png',
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
    INTRO_TITLE: '/images/navigation/intro.png',
    DAY1_TITLE: '/images/navigation/day1.png',
    DAY1_QUESTIONS_TITLE: '/images/navigation/day1Questions.png',
    DAY2_TITLE: '/images/navigation/day2.png',
    DAY2_SCREEN_TITLE: '/images/navigation/day2Screen.png',
    DAY2_ECHO_TITLE: '/images/navigation/day2.png',
    DAY2_LETTERS_TITLE: '/images/navigation/day2Letters.png',
    DAY3_MIRROR: '/images/navigation/day3Mirror.png',
    DAY3_PARTNER_TASK_TITLE: '/images/navigation/day3PartnerTask.png',
    DAY3_RESOURCE_TITLE: '/images/navigation/day3Resource.png',
    DAY4_TEMPLE: '/images/navigation/day4Temple.png',
    DAY4_INTEGRATION_TITLE: '/images/navigation/day4Integration.png',
    REQUEST_TITLE: '/images/navigation/request.png',
    PROGRESS_TITLE: '/images/navigation/progress.png',
    GUIDANCE_TITLE: '/images/navigation/guidance.png',
    COMPLETION_TITLE: '/images/navigation/completion.png',
    TIMER_TITLE: '/images/navigation/timer1.png',
    SHADOW_TITLE: '/images/navigation/shadowImage.png',
    SHADOW_DETAILS_TITLE: '/images/navigation/shadowImage.png',
    ARCHETYPE_TITLE: '/images/navigation/archetype.png',
    QUEST_TITLE: '/images/navigation/quest.png',
    DECK_TITLE: '/images/navigation/deck.png',
    JOURNAL_TITLE: '/images/navigation/journal.png',
    FAQ_TITLE: '/images/navigation/faq.png',
    SETTINGS_TITLE: '/images/navigation/settings.png',
    CREATOR_TITLE: '/images/navigation/creator.png',
  },
  
  // Пары изображений Тень/Архетип (все 63 пары)
  SHADOW_ARCHETYPE_PAIRS: Array.from({ length: 63 }, (_, i) => ({
    shadow: `/images/shadow-archetype/pair${i + 1}-shadow.png`,
    archetype: `/images/shadow-archetype/pair${i + 1}-archetype.png`,
    name: `Пара ${i + 1}: Тень и Архетип`
  }))
};

// Функция для получения полного URL изображения
export const getImageUrl = (path: string): string => {
  if (path.startsWith('http')) {
    return path; // Уже полный URL
  }
  
  // Временно используем локальные изображения для всех сред
  // пока не исправим проблемы с загрузкой с ISPmanager
  const localPath = path.replace('/images/', '/Sorce/');
  return localPath;
  
  // TODO: После исправления проблем с ISPmanager раскомментировать:
  // // Для локальной разработки используем локальные изображения
  // if (import.meta.env.DEV) {
  //   const localPath = path.replace('/images/', '/Sorce/');
  //   return localPath;
  // }
  // 
  // // Для продакшена используем внешний хостинг
  // if (import.meta.env.PROD) {
  //   return `${EXTERNAL_ASSETS.BASE_URL}${path}`;
  // }
  // 
  // return `${EXTERNAL_ASSETS.BASE_URL}${path}`;
};

// Функция для получения фонового изображения
export const getBackgroundImage = (path: string): string => {
  return `url(${getImageUrl(path)})`;
};

// Функция для получения CSS стиля фона
export const getBackgroundStyle = (path: string): React.CSSProperties => {
  return {
    backgroundImage: getBackgroundImage(path),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  };
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
