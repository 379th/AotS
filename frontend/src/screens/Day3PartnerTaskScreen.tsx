import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface Day3PartnerTaskScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day3PartnerTaskScreen: React.FC<Day3PartnerTaskScreenProps> = ({ 
  onBack, 
  onNext,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const [entry1, setEntry1] = useLocalStorageString('day3_partner_1', '');
  const [entry2, setEntry2] = useLocalStorageString('day3_partner_2', '');
  const [entry3, setEntry3] = useLocalStorageString('day3_partner_3', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 3 — Задание пары" />

      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-3">
        <div className="h-[66svh] overflow-y-auto rounded-xl border border-amber-900/30 bg-white/5 p-4 space-y-6">
          <div className="flex-1 min-h-0">
            <div className="text-sm font-medium text-amber-200/90 mb-3">Запись 1</div>
            <textarea 
              value={entry1} 
              onChange={(e) => setEntry1(e.target.value)} 
              placeholder="Опиши первое задание пары..."
              className="w-full h-32 px-4 py-3 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200" 
            />
          </div>
          <div className="flex-1 min-h-0">
            <div className="text-sm font-medium text-amber-200/90 mb-3">Запись 2</div>
            <textarea 
              value={entry2} 
              onChange={(e) => setEntry2(e.target.value)} 
              placeholder="Опиши второе задание пары..."
              className="w-full h-32 px-4 py-3 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200" 
            />
          </div>
          <div className="flex-1 min-h-0">
            <div className="text-sm font-medium text-amber-200/90 mb-3">Запись 3</div>
            <textarea 
              value={entry3} 
              onChange={(e) => setEntry3(e.target.value)} 
              placeholder="Опиши третье задание пары..."
              className="w-full h-32 px-4 py-3 text-sm bg-white/10 border border-amber-900/30 rounded-lg text-amber-200 placeholder-amber-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200" 
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
