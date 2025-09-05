import React, { Suspense, lazy, ComponentType } from 'react';
import Preloader from './Preloader';
import { ScreenTransition, ContentLoader } from './ScreenTransition';

interface LazyScreenProps {
  screenName: string;
  fallbackMessage?: string;
}

// Функция для создания lazy компонента с fallback
const createLazyScreen = (
  importFunction: () => Promise<{ default: ComponentType<any> }>,
  fallbackMessage: string = "Загрузка экрана..."
) => {
  const LazyComponent = lazy(importFunction);
  
  const WrappedComponent = (props: any) => (
    <Suspense 
      fallback={
        <div className="min-h-[100svh] flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <Preloader 
            isLoading={true} 
            message={fallbackMessage}
          />
        </div>
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  );
  
  return WrappedComponent;
};

// Lazy загрузка всех экранов
export const LazyIntroScreen = createLazyScreen(
  () => import('../../screens/IntroScreen'),
  "Загрузка главного экрана..."
);

export const LazyQuestScreen = createLazyScreen(
  () => import('../../screens/QuestScreen'),
  "Загрузка информации о квесте..."
);

export const LazyDay1Screen = createLazyScreen(
  () => import('../../screens/Day1Screen'),
  "Загрузка Дня 1: Лес забытого..."
);

export const LazyDay2EchoScreen = createLazyScreen(
  () => import('../../screens/Day2EchoScreen'),
  "Загрузка Дня 2: Пещера Эха..."
);

export const LazyDay2Screen = createLazyScreen(
  () => import('../../screens/Day2Screen'),
  "Загрузка промежуточного экрана..."
);

export const LazyDay2LettersScreen = createLazyScreen(
  () => import('../../screens/Day2LettersScreen'),
  "Загрузка писем..."
);

export const LazyDay3MirrorScreen = createLazyScreen(
  () => import('../../screens/Day3MirrorScreen'),
  "Загрузка Дня 3: Зеркало Перехода..."
);

export const LazyDay3PartnerTaskScreen = createLazyScreen(
  () => import('../../screens/Day3PartnerTaskScreen'),
  "Загрузка задания партнера..."
);

export const LazyDay3ResourceScreen = createLazyScreen(
  () => import('../../screens/Day3ResourceScreen'),
  "Загрузка ресурсов..."
);

export const LazyDay4TempleScreen = createLazyScreen(
  () => import('../../screens/Day4TempleScreen'),
  "Загрузка Дня 4: Храм..."
);

export const LazyDay4IntegrationScreen = createLazyScreen(
  () => import('../../screens/Day4IntegrationScreen'),
  "Загрузка интеграции..."
);

export const LazyShadowImageScreen = createLazyScreen(
  () => import('../../screens/ShadowImageScreen'),
  "Загрузка изображения тени..."
);

export const LazyArchetypeScreen = createLazyScreen(
  () => import('../../screens/ArchetypeScreen'),
  "Загрузка архетипа..."
);

export const LazyShadowDetailsScreen = createLazyScreen(
  () => import('../../screens/ShadowDetailsScreen'),
  "Загрузка деталей тени..."
);

export const LazyDay1QuestionsScreen = createLazyScreen(
  () => import('../../screens/Day1QuestionsScreen'),
  "Загрузка вопросов..."
);

export const LazyTimerScreen = createLazyScreen(
  () => import('../../screens/TimerScreen'),
  "Загрузка таймера..."
);

export const LazyCompletionScreen = createLazyScreen(
  () => import('../../screens/CompletionScreen'),
  "Загрузка завершения..."
);

export const LazyProgressScreen = createLazyScreen(
  () => import('../../screens/ProgressScreen'),
  "Загрузка прогресса..."
);

export const LazyGuidanceScreen = createLazyScreen(
  () => import('../../screens/GuidanceScreen'),
  "Загрузка руководства..."
);

export const LazyJournalScreen = createLazyScreen(
  () => import('../../screens/JournalScreen'),
  "Загрузка дневника..."
);

export const LazyDeckScreen = createLazyScreen(
  () => import('../../screens/DeckScreen'),
  "Загрузка колоды карт..."
);

export const LazySettingsScreen = createLazyScreen(
  () => import('../../screens/SettingsScreen'),
  "Загрузка настроек..."
);

export const LazyFaqScreen = createLazyScreen(
  () => import('../../screens/FaqScreen'),
  "Загрузка FAQ..."
);

export const LazyCreatorScreen = createLazyScreen(
  () => import('../../screens/CreatorScreen'),
  "Загрузка информации о создателе..."
);

export const LazyRequestScreen = createLazyScreen(
  () => import('../../screens/RequestScreen'),
  "Загрузка запроса..."
);

// Компонент для отображения lazy экрана с дополнительными возможностями
export const LazyScreen: React.FC<LazyScreenProps> = ({ 
  screenName, 
  fallbackMessage 
}) => {
  return (
    <Suspense 
      fallback={
        <Preloader 
          isLoading={true} 
          message={fallbackMessage || `Загрузка ${screenName}...`}
        />
      }
    >
      {/* Здесь будет рендериться нужный экран */}
    </Suspense>
  );
};

export default LazyScreen;
