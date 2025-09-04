import React, { useEffect } from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { useShadowArchetypePair } from '../hooks/useShadowArchetypePair';

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
    hasCurrentPair 
  } = useShadowArchetypePair();

  // Автоматически загружаем случайную пару при первом входе
  useEffect(() => {
    if (!hasCurrentPair) {
      // Если нет текущей пары, загружаем случайную
      // Это обеспечит синхронизацию с ArchetypeScreen
    }
  }, [hasCurrentPair]);

  return (
    <ScreenFrame>
      <TitleBar text="Тень" />

      <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-2 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e]' 
          : 'border-[#5c4032]/50 bg-[#e2d0b6]'
      }`}>
        <div className={`relative h-[66svh] overflow-hidden rounded-xl border transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-white/20' 
            : 'border-[#5c4032]/40'
        }`}>
          {currentPair && hasCurrentPair ? (
            <div className="relative h-full">
              <img 
                src={getShadowImage()} 
                alt="Образ Тени" 
                className="h-full w-full object-cover" 
              />
            </div>
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

      {/* Зафиксированный слой с кнопками и панелью навигации внизу страницы */}
      <div className="fixed bottom-0 left-0 right-0 z-10 px-4 pb-4 max-w-[520px] mx-auto">
        <div className="space-y-4">
          {/* Панель кнопок */}
          <BottomButtonPanel
            onBack={onBackToDay1}
            onContinue={onContinue}
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
