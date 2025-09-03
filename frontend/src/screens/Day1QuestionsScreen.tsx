import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';

interface Day1QuestionsScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day1QuestionsScreen: React.FC<Day1QuestionsScreenProps> = ({ 
  onBack, 
  onNext,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const { theme } = useTheme();
  const [q1, setQ1] = useLocalStorageString('day1_q_where', '');
  const [q2, setQ2] = useLocalStorageString('day1_q_protects', '');
  const [q3, setQ3] = useLocalStorageString('day1_q_inner_child', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 1 — Вопросы" />

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
            }`}>Где в жизни ты это проявляешь?</div>
            <textarea
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
              placeholder="Опиши ситуации, где ты замечаешь это поведение..."
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
            }`}>Как это защищает тебя?</div>
            <textarea
              value={q2}
              onChange={(e) => setQ2(e.target.value)}
              placeholder="Подумай о том, какую защиту даёт тебе это поведение..."
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
            }`}>Что чувствует твой внутренний ребёнок?</div>
            <textarea
              value={q3}
              onChange={(e) => setQ3(e.target.value)}
              placeholder="Прислушайся к чувствам своего внутреннего ребёнка..."
              className={`w-full h-32 px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
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


