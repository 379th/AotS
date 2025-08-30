import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface JournalScreenProps {
  onBack: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const JournalScreen: React.FC<JournalScreenProps> = ({ 
  onBack,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const [notes, setNotes] = useLocalStorageString("sq.journal.notes");
  const [diary, setDiary] = useLocalStorageString("sq.journal.diary");

  return (
    <ScreenFrame>
      <TitleBar text="Дневник" />
      
      <div className="mx-auto mt-2 w-[92%] overflow-hidden h-[60svh] flex flex-col min-h-0 rounded-2xl border border-amber-900/40 bg-input-gradient p-4 text-amber-900">
        <div className="flex-1 min-h-0 w-full overflow-auto space-y-4">
          <div className="rounded-xl border border-amber-900/30 bg-white/80 p-3">
            <label className="mb-1 block text-xs opacity-80">Заметки</label>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              rows={6} 
              className="w-full rounded-lg border border-amber-900/30 bg-white/95 p-3 text-sm resize-none"
            />
          </div>
          
          <div className="rounded-xl border border-amber-900/30 bg-white/80 p-3">
            <label className="mb-1 block text-xs opacity-80">Дневник</label>
            <textarea 
              value={diary} 
              onChange={(e) => setDiary(e.target.value)} 
              rows={10} 
              className="w-full rounded-lg border border-amber-900/30 bg-white/95 p-3 text-sm resize-none"
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
            onContinue={onBack}
            continueText="Сохранить"
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

