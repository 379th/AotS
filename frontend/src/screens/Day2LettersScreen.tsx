import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface Day2LettersScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day2LettersScreen: React.FC<Day2LettersScreenProps> = ({ 
  onBack, 
  onNext,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const [shadowLetter, setShadowLetter] = useLocalStorageString('day2_letter_shadow', '');
  const [adultReply, setAdultReply] = useLocalStorageString('day2_letter_adult', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 2 — Письма" />

      <div className="mx-auto mt-3 w-[92%] h-[66svh] rounded-2xl border border-amber-900/30 bg-[#1b1130] p-3">
        <div className="h-full overflow-y-auto rounded-xl border border-amber-900/30 bg-[#241b2f] p-3 space-y-4">
          <div>
            <div className="text-xs text-amber-200/80 mb-2">Напиши письмо от лица Тени.</div>
            <textarea
              value={shadowLetter}
              onChange={(e) => setShadowLetter(e.target.value)}
              className="w-full h-28 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
          <div>
            <div className="text-xs text-amber-200/80 mb-2">Ответь на него от лица взрослого тебя. Заверши фразой: «Я вижу тебя. Я готов быть с тобой».</div>
            <textarea
              value={adultReply}
              onChange={(e) => setAdultReply(e.target.value)}
              className="w-full h-28 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
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
