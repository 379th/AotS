import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

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
  const [imgUrl, setImgUrl] = useLocalStorageString("sq.day1.forest.url");

  return (
    <ScreenFrame>
      <TitleBar text="День 1 — Призыв Тени" />

      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.08),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.8),rgba(36,48,56,.8))] p-2">
        <div className="relative h-[66svh] overflow-hidden rounded-xl border border-teal-700/30">
          {imgUrl ? (
            <img 
              src={imgUrl} 
              alt="Лес, где шепчут тени" 
              className="h-full w-full object-cover" 
            />
          ) : (
            <button 
              onClick={() => {
                const next = window.prompt("Укажи URL картинки для Дня 1", imgUrl || "");
                if (next !== null) setImgUrl(next.trim());
              }} 
              className="flex h-full w-full items-start justify-center pt-2 text-emerald-200/80 text-sm hover:text-emerald-200"
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
            onBack={onBackToRequest}
            onContinue={onAccept}
            continueText="Принять Тень"
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

