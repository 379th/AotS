import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

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
  const { theme } = useTheme();
  const [entry1, setEntry1] = useLocalStorageString('day3_partner_1', '');
  const [entry2, setEntry2] = useLocalStorageString('day3_partner_2', '');
  const [entry3, setEntry3] = useLocalStorageString('day3_partner_3', '');

  return (
    <ScreenFrame>
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="День 3 — Задание пары" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.DAY3_PARTNER_TASK_TITLE}
        />

        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-3 transition-colors duration-300 ${
            theme === 'dark' 
              ? 'border-white/20 bg-[#1a0b2e]' 
              : 'border-[#5c4032]/50 bg-[#e2d0b6]'
          }`}>
            <div className={`h-[66svh] overflow-y-auto rounded-xl border p-4 space-y-6 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'border-white/20 bg-[#2d1b4e]' 
                : 'border-[#5c4032]/40 bg-[#f7f0e6]'
            }`}>
              <div className="flex-1 min-h-0">
                <div className={`text-sm font-medium mb-3 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-amber-900'
                }`}>Запись 1</div>
                <textarea 
                  value={entry1} 
                  onChange={(e) => setEntry1(e.target.value)} 
                  placeholder="Опиши первое задание пары..."
                  className={`w-full h-32 px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                      : 'bg-[#f7f0e6] border-[#5c4032]/40 text-amber-900 placeholder-amber-900/50'
                  }`} 
                />
              </div>
              <div className="flex-1 min-h-0">
                <div className={`text-sm font-medium mb-3 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-amber-900'
                }`}>Запись 2</div>
                <textarea 
                  value={entry2} 
                  onChange={(e) => setEntry2(e.target.value)} 
                  placeholder="Опиши второе задание пары..."
                  className={`w-full h-32 px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-900/50 transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                      : 'bg-[#f7f0e6] border-[#5c4032]/40 text-amber-900 placeholder-amber-900/50'
                  }`} 
                />
              </div>
              <div className="flex-1 min-h-0">
                <div className={`text-sm font-medium mb-3 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-amber-900'
                }`}>Запись 3</div>
                <textarea 
                  value={entry3} 
                  onChange={(e) => setEntry3(e.target.value)} 
                  placeholder="Опиши третье задание пары..."
                  className={`w-full h-32 px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                      : 'bg-[#f7f0e6] border-[#5c4032]/40 text-amber-900 placeholder-amber-900/50'
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
              onContinue={onNext}
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
