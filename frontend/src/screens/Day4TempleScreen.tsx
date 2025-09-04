import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { getImageUrl, EXTERNAL_ASSETS } from '../config/externalAssets';

interface Day4TempleScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day4TempleScreen: React.FC<Day4TempleScreenProps> = ({ 
  onBack, 
  onNext,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const { theme } = useTheme();
  return (
    <ScreenFrame>
      <TitleBar 
        text="День 4 — Храм Целостности" 
        imagePath={EXTERNAL_ASSETS.NAVIGATION.DAY4_TEMPLE}
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
          <div className={`flex-1 rounded-lg border overflow-hidden transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-black/20 border-white/20' 
              : 'bg-[#f7f0e6] border-[#5c4032]/30'
          }`}>
            <img 
              src={getImageUrl(EXTERNAL_ASSETS.SCREENS.DAY4_TEMPLE)} 
              alt="Храм Целостности" 
              className="h-full w-full object-cover" 
            />
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
