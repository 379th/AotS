import React, { useEffect } from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { useShadowArchetypePair } from '../hooks/useShadowArchetypePair';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

interface ArchetypeScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const ArchetypeScreen: React.FC<ArchetypeScreenProps> = ({ 
  onBack, 
  onNext,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const { theme } = useTheme();
  const { 
    currentPair, 
    getArchetypeImage, 
    hasCurrentPair,
    getNewRandomPair,
    addArchetypeToDeck,
    currentPairIndex
  } = useShadowArchetypePair();

  // Автоматически загружаем связанную пару при входе
  useEffect(() => {
    if (!hasCurrentPair && !currentPair) {
      // Если нет текущей пары, загружаем случайную
      // Это обеспечит синхронизацию с ShadowImageScreen
      getNewRandomPair();
    }
  }, [hasCurrentPair, currentPair, getNewRandomPair]);

  // Автоматически добавляем карту Архетипа в колоду при каждом изменении пары
  useEffect(() => {
    if (currentPair && hasCurrentPair && currentPairIndex >= 0) {
      addArchetypeToDeck();
    }
  }, [currentPairIndex]);

  return (
    <ScreenFrame>
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="Архетип" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.ARCHETYPE_TITLE}
        />

        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          <div className={`mx-auto mt-3 w-full max-w-[90vw] sm:max-w-[521px] h-[70vh] sm:h-[782px] rounded-2xl border overflow-hidden transition-colors duration-300 ${
            theme === 'dark'
              ? 'border-amber-900/30'
              : 'border-amber-900/50'
          }`}>
            <div className="relative w-full h-full overflow-hidden">
                {currentPair && hasCurrentPair ? (
                  <>
                    <img 
                      src={getArchetypeImage()} 
                      alt="Образ Архетипа" 
                      className="w-full h-full object-cover" 
                    />
                  </>
                ) : (
                  <div className={`flex h-full w-full items-center justify-center text-sm transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-white/50' 
                      : 'text-amber-900/70'
                  }`}>
                    Загрузка изображения...
                  </div>
                )}
            </div>
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-full max-w-[90vw] sm:max-w-[92%] px-2 sm:px-0">
            
            {/* Панель кнопок */}
            <BottomButtonPanel
              onBack={onBack}
              onContinue={onNext}
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
