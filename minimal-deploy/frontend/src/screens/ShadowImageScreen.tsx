import React, { useEffect } from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { useShadowArchetypePair } from '../hooks/useShadowArchetypePair';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

interface ShadowImageScreenProps {
  onBackToDay1: () => void;
  onContinue: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const ShadowImageScreen: React.FC<ShadowImageScreenProps> = ({
  onBackToDay1,
  onContinue,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const { theme } = useTheme();
  const { 
    currentPair, 
    getShadowImage, 
    hasCurrentPair,
    getNewRandomPair
  } = useShadowArchetypePair();

  // Автоматически загружаем случайную пару при первом входе
  useEffect(() => {
    if (!hasCurrentPair && !currentPair) {
      // Если нет текущей пары, загружаем случайную
      // Это обеспечит синхронизацию с ArchetypeScreen
      getNewRandomPair();
    }
  }, [hasCurrentPair, currentPair, getNewRandomPair]);

  return (
    <ScreenFrame>
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="Тень" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.SHADOW_TITLE}
        />

        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          <div className={`mx-auto mt-3 w-[92%] rounded-2xl border overflow-hidden transition-colors duration-300 ${
            theme === 'dark'
              ? 'border-amber-900/30'
              : 'border-amber-900/50'
          }`}>
            <div className="relative h-[80svh] overflow-hidden">
              {currentPair && hasCurrentPair ? (
                <img 
                  src={getShadowImage()} 
                  alt="Образ Тени" 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <div className={`flex h-full w-full items-center justify-center text-sm transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'text-emerald-200/80' 
                    : 'text-amber-900/80'
                }`}>
                  Загрузка изображения...
                </div>
              )}
            </div>
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-[92%]">
            {/* Панель кнопок */}
            <BottomButtonPanel
              onBack={onBackToDay1}
              onContinue={onContinue}
            />

            {/* Панель навигации */}
            <div className="mt-0.5">
              <NavigationPanel
                onAboutQuest={onAboutQuest}
                onGoDay1={onGoDay1}
                onOpenDeck={onOpenDeck}
                onOpenJournal={onOpenJournal}
              />
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};
