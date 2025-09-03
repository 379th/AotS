import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';

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
  const [imgUrl, setImgUrl] = useLocalStorageString("sq.shadow.image.url");

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
          {imgUrl ? (
            <img 
              src={imgUrl} 
              alt="Образ Тени" 
              className="h-full w-full object-cover" 
            />
          ) : (
            <button 
              onClick={() => {
                const next = window.prompt("Укажи URL картинки", imgUrl || "");
                if (next !== null) setImgUrl(next.trim());
              }} 
              className={`flex h-full w-full items-start justify-center pt-2 text-sm hover:opacity-80 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-amber-900/80 hover:text-amber-900'
              }`}
            >
              (Укажи URL картинки)
            </button>
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
