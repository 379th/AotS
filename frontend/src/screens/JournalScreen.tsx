import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

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
  const { theme } = useTheme();
  const [notes, setNotes] = useLocalStorageString("sq.journal.notes");
  const [diary, setDiary] = useLocalStorageString("sq.journal.diary");

  return (
    <ScreenFrame>
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="Дневник" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.JOURNAL_TITLE}
        />
        
        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          <div className={`mx-auto mt-2 w-[92%] overflow-hidden flex flex-col min-h-0 rounded-2xl border p-4 transition-colors duration-300 ${
            theme === 'dark' 
              ? 'border-white/20 bg-[#1a0b2e] text-white' 
              : 'border-[#5c4032]/60 bg-[#e2d0b6] text-amber-900'
          }`}>
            <div className="h-[66svh] min-h-0 w-full overflow-auto space-y-4">
              <div className={`rounded-xl border p-3 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'border-white/20 bg-[#2d1b4e] text-white' 
                  : 'border-[#5c4032]/40 bg-[#f7f0e6]'
              }`}>
                <label className={`mb-1 block text-xs transition-colors duration-300 ${
                  theme === 'dark' ? 'opacity-80' : 'opacity-70'
                }`}>Заметки</label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  rows={6} 
                  className={`w-full rounded-lg border p-3 text-sm resize-none transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'border-white/20 bg-[#2d1b4e] text-white' 
                      : 'border-[#5c4032]/40 bg-white text-amber-900'
                  }`}
                />
              </div>
              
              <div className={`rounded-xl border p-3 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'border-white/20 bg-[#2d1b4e] text-white' 
                  : 'border-[#5c4032]/40 bg-[#f7f0e6]'
              }`}>
                <label className={`mb-1 block text-xs transition-colors duration-300 ${
                  theme === 'dark' ? 'opacity-80' : 'opacity-70'
                }`}>Дневник</label>
                <textarea 
                  value={diary} 
                  onChange={(e) => setDiary(e.target.value)} 
                  rows={10} 
                  className={`w-full rounded-lg border p-3 text-sm resize-none transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'border-white/20 bg-[#2d1b4e] text-white' 
                      : 'border-[#5c4032]/40 bg-white text-amber-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-[92%]">
            {/* Панель кнопок */}
            <BottomButtonPanel
              onBack={onBack}
              onContinue={onBack}
              showContinue={false}
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

