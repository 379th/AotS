import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface Day4IntegrationScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day4IntegrationScreen: React.FC<Day4IntegrationScreenProps> = ({ 
  onBack, 
  onNext,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const [symbol, setSymbol] = useLocalStorageString('day4_symbol', '');
  const [offering, setOffering] = useLocalStorageString('day4_offering', '');
  const [gratitude, setGratitude] = useLocalStorageString('day4_gratitude', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 4 — Интеграция" />

      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-3">
        <div className="h-[66svh] overflow-y-auto rounded-xl border border-amber-900/30 bg-white/5 p-3 space-y-4">
          <div>
            <div className="text-xs text-amber-200/80 mb-2">Нарисуй или опиши символ своей новой целостности.</div>
            <textarea value={symbol} onChange={(e) => setSymbol(e.target.value)} className="w-full h-20 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none" />
          </div>
          <div>
            <div className="text-xs text-amber-200/80 mb-2">Подношение: внутренне и/или письменно вырази благодарность.</div>
            <textarea value={offering} onChange={(e) => setOffering(e.target.value)} className="w-full h-20 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none" />
          </div>
          <div>
            <div className="text-xs text-amber-200/80 mb-2">Благодарность всем существам во всех мирах.</div>
            <textarea value={gratitude} onChange={(e) => setGratitude(e.target.value)} className="w-full h-20 px-3 py-2 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none" />
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
