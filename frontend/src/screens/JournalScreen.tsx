import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface JournalScreenProps {
  onBack: () => void;
}

export const JournalScreen: React.FC<JournalScreenProps> = ({ onBack }) => {
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
      
      <div className="mx-auto mt-2 w-[92%] text-right">
        <Pill onClick={onBack}>
          <span className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4"/> Назад
          </span>
        </Pill>
      </div>
    </ScreenFrame>
  );
};

