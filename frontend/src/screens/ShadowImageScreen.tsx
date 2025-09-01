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
          ? 'border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.08),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.8),rgba(36,48,56,.8))]' 
          : 'border-amber-900/50 bg-gradient-to-b from-amber-100/80 to-amber-200/80'
      }`}>
        <div className={`relative h-[66svh] overflow-hidden rounded-xl border transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-teal-700/30' 
            : 'border-amber-900/40'
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
                  ? 'text-emerald-200/80 hover:text-emerald-200' 
                  : 'text-amber-700/80 hover:text-amber-800'
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
