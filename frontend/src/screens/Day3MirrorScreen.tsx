import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { getImageUrl, EXTERNAL_ASSETS } from '../config/externalAssets';

interface Day3MirrorScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day3MirrorScreen: React.FC<Day3MirrorScreenProps> = ({ 
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
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="День 3 — Зеркало Перехода" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.DAY3_MIRROR}
        />

        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          <div className={`mx-auto mt-3 w-[92%] rounded-2xl border overflow-hidden transition-colors duration-300 ${
            theme === 'dark'
              ? 'border-amber-900/30'
              : 'border-amber-900/50'
          }`}>
            <img 
              src={getImageUrl(EXTERNAL_ASSETS.SCREENS.DAY3_MIRROR)} 
              alt="Зеркало Перехода" 
              className="w-full h-[75svh] object-cover" 
            />
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-[92%]">
            {/* Панель кнопок */}
            <BottomButtonPanel
              onBack={onBack}
              onContinue={onNext}
              continueText="К Архетипу"
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
