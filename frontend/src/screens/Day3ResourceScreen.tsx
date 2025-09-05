import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';
import { useArchetypeResource } from '../hooks/useArchetypeResource';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

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
  
  // Получаем ресурс архетипа из CSV
  const { archetypeResource, loading, error, hasCurrentPair } = useArchetypeResource();

  return (
    <ScreenFrame>
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="День 3 - Ресурс" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.DAY3_RESOURCE_TITLE}
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
                }`}>Опиши, что Архетип даёт тебе.</div>
                <textarea
                  value={resourceDesc}
                  onChange={(e) => setResourceDesc(e.target.value)}
                  placeholder="Подумай о том, какие качества и ресурсы даёт тебе твой архетип..."
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
                }`}>Ресурс</div>
                
                {!hasCurrentPair ? (
                  <div className={`w-full h-32 px-4 py-3 text-sm border rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/20 text-white/70' 
                      : 'bg-[#f7f0e6]/50 border-[#5c4032]/40 text-amber-900/70'
                  }`}>
                    Сначала выберите пару на экранах Тень и Архетип
                  </div>
                ) : loading ? (
                  <div className={`w-full h-32 px-4 py-3 text-sm border rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/20 text-white/70' 
                      : 'bg-[#f7f0e6]/50 border-[#5c4032]/40 text-amber-900/70'
                  }`}>
                    Загрузка ресурса архетипа...
                  </div>
                ) : error ? (
                  <div className={`w-full h-32 px-4 py-3 text-sm border rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                      : 'bg-red-100 border-red-300 text-red-700'
                  }`}>
                    Ошибка загрузки ресурса
                  </div>
                ) : (
                  <div className={`w-full h-32 px-4 py-3 text-sm border rounded-lg overflow-y-auto transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/20 text-white/90' 
                      : 'bg-[#f7f0e6]/50 border-[#5c4032]/40 text-amber-900/90'
                  }`}>
                    {archetypeResource || 'Ресурс архетипа не найден'}
                  </div>
                )}
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
