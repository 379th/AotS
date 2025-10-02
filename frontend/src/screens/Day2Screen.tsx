import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

interface Day2ScreenProps {
  onNext: () => void;
  onBack: () => void;
  onAboutQuest: () => void;
  onOpenProgress: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day2Screen: React.FC<Day2ScreenProps> = ({
  onNext,
  onBack,
  onAboutQuest,
  onOpenProgress,
  onOpenDeck,
  onOpenJournal
}) => {
  const { theme } = useTheme();
  const [reflection, setReflection] = useLocalStorageString('day2_reflection', '');

  return (
    <ScreenFrame>
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="День 2: Встреча с тенью" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.DAY2_SCREEN_TITLE}
        />

        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          <div 
            className={`mx-auto mt-3 w-full max-w-[90vw] sm:max-w-[521px] h-[70vh] sm:h-[782px] rounded-2xl border p-3 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'border-white/20'
                : 'border-[#5c4032]/50'
            }`}
        style={{
          backgroundImage: theme === 'dark' 
            ? 'linear-gradient(135deg, rgba(45, 55, 45, 0.8) 0%, rgba(35, 45, 35, 0.9) 100%)' 
            : 'url(/Sorce/windows/external_container.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
          >
            <div 
              className={`h-full overflow-y-auto rounded-xl border space-y-6 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'border-white/20'
                  : 'border-[#5c4032]/40'
              }`}
          style={{
            backgroundImage: theme === 'dark' 
              ? 'linear-gradient(135deg, rgba(30, 40, 30, 0.9) 0%, rgba(20, 30, 20, 0.95) 100%)' 
              : 'url(/Sorce/windows/internal_container.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
            >
              
              <div className="flex-1 min-h-0 p-4">
                <h2 className={`text-[27px] font-semibold mb-3 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-amber-900'
                }`}>
                  Второй день путешествия
                </h2>
                
                <div className={`text-[17px] mb-4 space-y-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white/80' : 'text-amber-900/80'
                }`}>
                  <p>
                    Сегодня углубись в исследование своей тени. 
                    Какие качества ты обычно скрываешь от себя и других?
                  </p>
                  <p>
                    Подумай о моментах, когда ты чувствовал(а) стыд, 
                    гнев или другие &quot;негативные&quot; эмоции.
                  </p>
                </div>

                {/* Поле для размышлений */}
                <div className="mb-4">
                  <label className={`block text-[27px] font-bold mb-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-amber-900'
                  }`}>
                    Размышления:
                  </label>
                  <textarea
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    placeholder="Запиши свои мысли о встрече с тенью..."
                    className={`w-full h-24 px-3 py-2 text-[15px] border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
                      theme === 'dark' 
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                        : 'bg-[#f7f0e6] border-[#5c4032]/40 text-amber-900 placeholder-amber-900/50'
                    }`}
                  />
                </div>

                {/* Вопросы для размышления */}
                <div className={`rounded-lg p-3 mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-[#f7f0e6]'
                }`}>
                  <h3 className={`text-[27px] font-medium mb-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-amber-900'
                  }`}>
                    Вопросы для размышления:
                  </h3>
                  <ul className={`text-[17px] space-y-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white/70' : 'text-amber-900/70'
                  }`}>
                    <li>• Что вызывает у тебя &quot;негативные&quot; эмоции?</li>
                    <li>• Какие качества ты считаешь &quot;плохими&quot;?</li>
                    <li>• Что ты скрываешь от других?</li>
                    <li>• Как твоя тень защищает тебя?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-full max-w-[90vw] sm:max-w-[92%] px-2 sm:px-0">
            {/* Панель кнопок */}
            <BottomButtonPanel
              onBack={onBack}
              onContinue={onNext}
              continueDisabled={reflection.trim().length === 0}
            />

            {/* Панель навигации */}
            <div className="mt-0.5">
              <NavigationPanel
                onAboutQuest={onAboutQuest}
                onOpenProgress={onOpenProgress}
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
