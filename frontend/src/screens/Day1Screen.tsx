import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { getImageUrl, EXTERNAL_ASSETS } from '../config/externalAssets';

interface Day1ScreenProps {
  onBackToRequest: () => void;
  onAccept: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day1Screen: React.FC<Day1ScreenProps> = ({
  onBackToRequest,
  onAccept,
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
          text="День 1 — Призыв Тени" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.DAY1_TITLE}
        />

        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          <div className={`mx-auto mt-3 w-[92%] rounded-2xl border overflow-hidden transition-colors duration-300 ${
            theme === 'dark' 
              ? 'border-amber-900/30' 
              : 'border-amber-900/50'
          }`}>
            <img 
              src={getImageUrl(EXTERNAL_ASSETS.SCREENS.DAY1_FOREST)} 
              alt="Лес, где шепчут тени" 
              className="w-full h-[65svh] object-cover object-top" 
            />
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-[92%]">
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

