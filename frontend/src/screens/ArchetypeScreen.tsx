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
    getPairName,
    hasCurrentPair 
  } = useShadowArchetypePair();

  // Автоматически загружаем связанную пару при входе
  useEffect(() => {
    if (!hasCurrentPair) {
      // Если нет текущей пары, загружаем случайную
      // Это обеспечит синхронизацию с ShadowImageScreen
    }
  }, [hasCurrentPair]);

  return (
    <ScreenFrame>
      <TitleBar 
        text="Архетип" 
        imagePath={EXTERNAL_ASSETS.NAVIGATION.ARCHETYPE_TITLE}
      />

      <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-2 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e]' 
          : 'border-[#5c4032]/50 bg-[#e2d0b6]'
      }`}>
        <div className={`relative h-[66svh] overflow-hidden rounded-xl border p-3 flex flex-col transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-white/20 bg-[#2d1b4e]' 
            : 'border-[#5c4032]/40 bg-[#f7f0e6]'
        }`}>
          <div className={`flex-1 rounded-lg border overflow-hidden flex flex-col transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-black/20 border-white/20' 
              : 'bg-[#f7f0e6] border-[#5c4032]/30'
          }`}>
            {currentPair && hasCurrentPair ? (
              <div className="relative h-full">
                <img 
                  src={getArchetypeImage()} 
                  alt="Образ Архетипа" 
                  className="h-full w-full object-cover" 
                />
                {/* Информация о текущей паре */}
                <div className={`absolute top-2 left-2 px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-black/50 text-white' 
                    : 'bg-white/80 text-amber-900'
                }`}>
                  {getPairName()}
                </div>
              </div>
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
      </div>

      {/* Зафиксированный слой с кнопками и панелью навигации внизу страницы */}
      <div className="fixed bottom-0 left-0 right-0 z-10 px-4 pb-4 max-w-[520px] mx-auto">
        <div className="space-y-4">
          {/* Панель кнопок */}
          <BottomButtonPanel
            onBack={onBack}
            onContinue={onNext}
          />

          {/* Панель навигации */}
          <NavigationPanel
            onAboutQuest={onAboutQuest}
            onGoDay1={onGoDay1}
            onOpenDeck={onOpenDeck}
            onOpenJournal={onOpenJournal}
          />
        </div>
      </div>
    </ScreenFrame>
  );
};
