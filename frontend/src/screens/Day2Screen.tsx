import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

interface Day2ScreenProps {
  onNext: () => void;
  onBack: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const Day2Screen: React.FC<Day2ScreenProps> = ({
  onNext,
  onBack,
  onAboutQuest,
  onGoDay1,
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
          <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-2 transition-colors duration-300 ${
            theme === 'dark' 
              ? 'border-white/20 bg-[#1a0b2e]'
              : 'border-[#5c4032]/50 bg-[#e2d0b6]'
          }`}>
            <div className={`relative h-[55svh] overflow-hidden rounded-xl border p-4 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'border-white/20 bg-[#2d1b4e]'
                : 'border-[#5c4032]/40 bg-[#f7f0e6]'
            }`}>
              
              {/* Основной контент */}
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <h2 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-amber-900'
          }`}>
                    Второй день путешествия
                  </h2>
                  
                  <div className={`text-sm mb-4 space-y-2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white/80' : 'text-amber-900/80'
          }`}>
                    <p>
                      Сегодня мы углубимся в исследование вашей тени. 
                      Какие качества вы обычно скрываете от других?
                    </p>
                    <p>
                      Подумайте о моментах, когда вы чувствовали стыд, 
                      гнев или другие &quot;негативные&quot; эмоции.
                    </p>
                  </div>

                  {/* Поле для размышлений */}
                  <div className="mb-4">
                    <label className={`block text-xs mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white/70' : 'text-amber-900/70'
              }`}>
                      Ваши размышления:
                    </label>
                    <textarea
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Запишите свои мысли о встрече с тенью..."
                      className={`w-full h-24 px-3 py-2 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
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
                    <h3 className={`text-xs font-medium mb-2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-amber-900'
          }`}>
                      Вопросы для размышления:
                    </h3>
                    <ul className={`text-xs space-y-1 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white/70' : 'text-amber-900/70'
          }`}>
                      <li>• Что вызывает у вас стыд?</li>
                      <li>• Какие качества вы считаете &quot;плохими&quot;?</li>
                      <li>• Что вы скрываете от других?</li>
                      <li>• Как ваша тень защищает вас?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-[92%] space-y-0.5">
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
      </div>
    </ScreenFrame>
  );
};
