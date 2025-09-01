import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';

interface Day3ResourceScreenProps {
  onBack: () => void;
  onNext: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day3ResourceScreen: React.FC<Day3ResourceScreenProps> = ({ 
  onBack, 
  onNext,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
  const { theme } = useTheme();
  const [resourceDesc, setResourceDesc] = useLocalStorageString('day3_resource', '');
  const [archetypeResource, setArchetypeResource] = useLocalStorageString('day3_archetype_resource', '');

  return (
    <ScreenFrame>
      <TitleBar text="День 3 - Ресурс" />

      <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-3 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))]' 
          : 'border-amber-900/50 bg-gradient-to-b from-amber-100/80 to-amber-200/80'
      }`}>
        <div className={`h-[66svh] overflow-y-auto rounded-xl border p-4 space-y-6 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-amber-900/30 bg-white/5' 
            : 'border-amber-900/40 bg-white/90'
        }`}>
          <div className="flex-1 min-h-0">
            <div className={`text-sm font-medium mb-3 transition-colors duration-300 ${
              theme === 'dark' ? 'text-amber-200/90' : 'text-amber-800'
            }`}>Опиши, что Архетип даёт тебе.</div>
            <textarea
              value={resourceDesc}
              onChange={(e) => setResourceDesc(e.target.value)}
              placeholder="Подумай о том, какие качества и ресурсы даёт тебе твой архетип..."
              className={`w-full h-32 px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-white/10 border-amber-900/30 text-amber-200 placeholder-amber-200/50' 
                  : 'bg-white/95 border-amber-900/40 text-amber-800 placeholder-amber-700/50'
              }`}
            />
          </div>
          
          <div className="flex-1 min-h-0">
            <div className={`text-sm font-medium mb-3 transition-colors duration-300 ${
              theme === 'dark' ? 'text-amber-200/90' : 'text-amber-800'
            }`}>Ресурс</div>
            <textarea
              value={archetypeResource}
              onChange={(e) => setArchetypeResource(e.target.value)}
              placeholder="Информация о ресурсах архетипа будет добавлена позже..."
              className={`w-full h-32 px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-white/10 border-amber-900/30 text-amber-200 placeholder-amber-200/50' 
                  : 'bg-white/95 border-amber-900/40 text-amber-800 placeholder-amber-700/50'
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
