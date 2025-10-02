import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { getImageUrl, EXTERNAL_ASSETS } from '../config/externalAssets';

interface Day1ScreenProps {
  onBackToRequest: () => void;
  onAccept: () => void;
  onAboutQuest: () => void;
  onOpenProgress: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day1Screen: React.FC<Day1ScreenProps> = ({ 
  onBackToRequest, 
  onAccept,
  onAboutQuest,
  onOpenProgress,
  onOpenDeck,
  onOpenJournal
}) => {
  const { theme } = useTheme();

  return (
    <ScreenFrame>
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="День 1 — Призыв Тени" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.DAY1_TITLE}
        />

        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          <div className={`mx-auto mt-3 w-full max-w-[90vw] sm:max-w-[521px] h-[70vh] sm:h-[782px] rounded-2xl border overflow-hidden transition-colors duration-300 ${
            theme === 'dark'
              ? 'border-amber-900/30'
              : 'border-amber-900/50'
          }`}>
            <img 
              src={getImageUrl(EXTERNAL_ASSETS.SCREENS.DAY1_FOREST)} 
              alt="Лес, где шепчут тени" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-full max-w-[90vw] sm:max-w-[92%] px-2 sm:px-0">
            {/* Панель кнопок */}
            <BottomButtonPanel
              onBack={onBackToRequest}
              onContinue={onAccept}
              continueText="Принять Тень"
            />

            {/* Панель навигации */}
            <div className="mt-0.5">
              <NavigationPanel
                onAboutQuest={onAboutQuest}
                onOpenProgress={onOpenProgress}
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

