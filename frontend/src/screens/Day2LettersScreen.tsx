import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';

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
  const { theme } = useTheme();
  const [shadowLetter, setShadowLetter] = useLocalStorageString('day2_letter_shadow', '');
  const [adultReply, setAdultReply] = useLocalStorageString('day2_letter_adult', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 2 — Письма" />

            <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-3 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e]'
          : 'border-[#5c4032]/50 bg-[#e2d0b6]'
      }`}>
                <div className={`h-[66svh] overflow-y-auto rounded-xl border space-y-6 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-white/20 bg-[#2d1b4e]'
            : 'border-[#5c4032]/40 bg-[#f7f0e6]'
        }`}>
          <div className="flex-1 min-h-0 p-4">
            <div className={`text-sm font-medium mb-3 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-amber-900'
            }`}>Напиши письмо от лица Тени.</div>
            <textarea
              value={shadowLetter}
              onChange={(e) => setShadowLetter(e.target.value)}
              placeholder="Дорогой взрослый, я хочу сказать тебе..."
              style={{ height: '190px' }}
              className={`w-full px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                  : 'bg-[#f7f0e6] border-[#5c4032]/40 text-amber-900 placeholder-amber-900/50'
              }`}
            />
          </div>
          <div className="flex-1 min-h-0 p-4">
            <div className={`text-sm font-medium mb-3 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-amber-900'
            }`}>Ответь на него от лица взрослого тебя. Заверши фразой: «Я вижу тебя. Я готов быть с тобой».</div>
            <textarea
              value={adultReply}
              onChange={(e) => setAdultReply(e.target.value)}
              placeholder="Дорогая Тень, я слышу тебя..."
              style={{ height: '190px' }}
              className={`w-full px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                  : 'bg-[#f7f0e6] border-[#5c4032]/40 text-amber-900 placeholder-amber-900/50'
              }`}
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
