import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel, DrawingCanvas } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

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
  const { theme } = useTheme();
  const [symbol, setSymbol] = useLocalStorageString('day4_symbol', '');
  const [offering, setOffering] = useLocalStorageString('day4_offering', '');

  return (
    <ScreenFrame>
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="День 4 — Интеграция" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.DAY4_INTEGRATION_TITLE}
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
                }`}>Нарисуй или опиши символ своей новой целостности</div>
                <DrawingCanvas 
                  value={symbol} 
                  onChange={setSymbol}
                  className="mb-3"
                />
                <textarea 
                  value={symbol.startsWith('data:image') ? '' : symbol} 
                  onChange={(e) => setSymbol(e.target.value)} 
                  placeholder="Или опиши символ текстом..."
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
                }`}>Подношение: внутренне и/или письменно вырази благодарность всем существам во всех мирах</div>
                <textarea 
                  value={offering} 
                  onChange={(e) => setOffering(e.target.value)} 
                  placeholder="Вырази свою благодарность всем существам..."
                  className={`w-full h-20 px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
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
