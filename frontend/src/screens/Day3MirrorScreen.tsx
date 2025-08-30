import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

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
  const [imageUrl, setImageUrl] = useLocalStorageString('day3_mirror_image', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 3 — Зеркало Перехода" />

      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[#1b1130] p-2">
        <div className="relative h-[66svh] overflow-hidden rounded-xl border border-teal-700/30 bg-[#101820] p-3 flex flex-col">
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="(Укажи URL картинки)"
            className="mb-2 w-full rounded border border-teal-700/40 bg-black/20 px-3 py-2 text-xs text-amber-200 placeholder-amber-200/50 focus:outline-none"
          />
          <div className="flex-1 rounded-lg bg-black/20 border border-teal-800/30 overflow-hidden flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt="mirror" className="max-h-full max-w-full object-contain" />
            ) : (
              <div className="text-amber-200/50 text-xs">(Укажи URL картинки)</div>
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
            continueText="К Архетипу"
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
