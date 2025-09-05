import React, { useEffect } from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';
import { useCurrentPair } from '../hooks/useCurrentPair';
import { EXTERNAL_ASSETS } from '../config/externalAssets';
import { testCardsData } from '../utils/testCardsData';

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
  const { exercises, loading, error, hasCurrentPair } = useCurrentPair();
  const [entry1, setEntry1] = useLocalStorageString('day3_partner_1', '');
  const [entry2, setEntry2] = useLocalStorageString('day3_partner_2', '');
  const [entry3, setEntry3] = useLocalStorageString('day3_partner_3', '');

  // Запускаем тест загрузки данных при монтировании компонента
  useEffect(() => {
    testCardsData();
  }, []);

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
            {/* Состояние загрузки */}
            {loading && (
              <div className={`text-center py-8 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-amber-900'
              }`}>
                Загрузка заданий...
              </div>
            )}

            {/* Ошибка загрузки */}
            {error && (
              <div className={`text-center py-8 transition-colors duration-300 ${
                theme === 'dark' ? 'text-red-400' : 'text-red-600'
              }`}>
                {error}
              </div>
            )}

            {/* Сообщение если пара не выбрана */}
            {!hasCurrentPair && !loading && !error && (
              <div className={`text-center py-8 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white/70' : 'text-amber-900/70'
              }`}>
                Сначала выберите пару на экранах Тень и Архетип
              </div>
            )}

            {/* Упражнения */}
            {!loading && hasCurrentPair && (
              <div className={`h-[66svh] overflow-y-auto rounded-xl border p-4 space-y-6 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'border-white/20 bg-[#2d1b4e]' 
                  : 'border-[#5c4032]/40 bg-[#f7f0e6]'
              }`}>
                {exercises.length > 0 ? (
                  exercises.slice(0, 3).map((exercise, index) => (
                    <div key={index} className="flex-1 min-h-0">
                      <div className={`text-sm font-medium mb-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-amber-900'
                      }`}>
                        Задание {index + 1}
                      </div>
                      <div className={`text-xs mb-2 p-2 rounded border transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'border-white/20 bg-white/5 text-white/80' 
                          : 'border-[#5c4032]/30 bg-[#f7f0e6]/50 text-amber-900/80'
                      }`}>
                        {exercise.text}
                      </div>
                      <textarea 
                        value={index === 0 ? entry1 : index === 1 ? entry2 : entry3} 
                        onChange={(e) => {
                          if (index === 0) setEntry1(e.target.value);
                          else if (index === 1) setEntry2(e.target.value);
                          else setEntry3(e.target.value);
                        }} 
                        placeholder="Пиши первое что пришло..."
                        className={`w-full h-32 px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
                          theme === 'dark' 
                            ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                            : 'bg-[#f7f0e6] border-[#5c4032]/40 text-amber-900 placeholder-amber-900/50'
                        }`} 
                      />
                    </div>
                  ))
                ) : (
                  // Показываем поля для ввода даже если упражнения не загружены
                  [1, 2, 3].map((index) => (
                    <div key={index} className="flex-1 min-h-0">
                      <div className={`text-sm font-medium mb-3 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white' : 'text-amber-900'
                      }`}>
                        Задание {index}
                      </div>
                      <textarea 
                        value={index === 1 ? entry1 : index === 2 ? entry2 : entry3} 
                        onChange={(e) => {
                          if (index === 1) setEntry1(e.target.value);
                          else if (index === 2) setEntry2(e.target.value);
                          else setEntry3(e.target.value);
                        }} 
                        placeholder="Пиши первое что пришло..."
                        className={`w-full h-32 px-4 py-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all duration-200 ${
                          theme === 'dark' 
                            ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                            : 'bg-[#f7f0e6] border-[#5c4032]/40 text-amber-900 placeholder-amber-900/50'
                        }`} 
                      />
                    </div>
                  ))
                )}
              </div>
            )}
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
