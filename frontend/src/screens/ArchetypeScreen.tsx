import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';

interface ArchetypeScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const ArchetypeScreen: React.FC<ArchetypeScreenProps> = ({ 
  onBack, 
  onNext,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const { theme } = useTheme();
  return (
    <ScreenFrame>
      <TitleBar text="Архетип" />

      <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-2 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-amber-900/30 bg-[#1b1130]' 
          : 'border-amber-900/50 bg-gradient-to-b from-amber-100/90 to-amber-200/90'
      }`}>
        <div className={`relative h-[66svh] overflow-hidden rounded-xl border p-3 flex flex-col transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-teal-700/30 bg-[#101820]' 
            : 'border-amber-900/40 bg-white/95'
        }`}>
          <div className={`flex-1 rounded-lg border overflow-hidden flex items-center justify-center transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-black/20 border-teal-800/30' 
              : 'bg-amber-50/80 border-amber-900/30'
          }`}>
            <div className={`text-xs transition-colors duration-300 ${
              theme === 'dark' ? 'text-amber-200/50' : 'text-amber-700/70'
            }`}>(Укажи URL картинки)</div>
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
