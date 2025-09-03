import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';
import { useTheme } from '../contexts/ThemeContext';

interface ProgressScreenProps {
  onBack: () => void;
  onNavigateToDay: (day: string) => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ 
  onBack, 
  onNavigateToDay 
}) => {
  const { theme } = useTheme();
  const [day1Completed] = useLocalStorageString('day1_completed', '');
  const [day2Completed] = useLocalStorageString('day2_completed', '');
  const [day3Completed] = useLocalStorageString('day3_completed', '');
  const [day4Completed] = useLocalStorageString('day4_completed', '');

  const days = [
    { id: 'day1', title: 'День 1 - Призыв Тени', completed: !!day1Completed },
    { id: 'day2', title: 'День 2 - Пещера Эха', completed: !!day2Completed },
    { id: 'day3Mirror', title: 'День 3 - Зеркало Перехода', completed: !!day3Completed },
    { id: 'day4Temple', title: 'День 4 - Храм Целостности', completed: !!day4Completed },
  ];

  const totalCompleted = days.filter(day => day.completed).length;
  const progressPercentage = (totalCompleted / days.length) * 100;

  return (
    <ScreenFrame>
      <TitleBar text="Прогресс" />
      
      <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-3 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e]' 
          : 'border-[#5c4032]/50 bg-[#e2d0b6]'
      }`}>
        <div className={`h-[66svh] overflow-y-auto rounded-xl border p-4 space-y-4 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-white/20 bg-[#2d1b4e]' 
            : 'border-[#5c4032]/40 bg-[#f7f0e6]'
        }`}>
          
          {/* Общий прогресс */}
          <div className="text-center">
            <div className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                              theme === 'dark' ? 'text-white' : 'text-amber-900'
            }`}>
              Прогресс: {totalCompleted} из {days.length} дней
            </div>
            <div className="w-full bg-amber-900/30 rounded-full h-3 mb-2">
              <div 
                className="bg-amber-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className={`text-sm transition-colors duration-300 ${
                              theme === 'dark' ? 'text-white/80' : 'text-amber-900/70'
            }`}>
              {progressPercentage.toFixed(0)}% завершено
            </div>
          </div>

          {/* Список дней */}
          <div className="space-y-3">
            {days.map((day, index) => (
              <div 
                key={day.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  day.completed 
                    ? 'border-amber-600/50 bg-amber-600/10' 
                    : theme === 'dark' 
                      ? 'border-white/20 bg-white/5' 
                      : 'border-[#5c4032]/40 bg-[#f7f0e6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                          day.completed 
                      ? 'bg-amber-600 text-white' 
                      : theme === 'dark'
                        ? 'bg-white/20 text-white/50'
                        : 'bg-[#5c4032]/40 text-amber-900/70'
                    }`}>
                      {day.completed ? '✓' : index + 1}
                    </div>
                    <span className={`text-sm transition-colors duration-300 ${
                      day.completed 
                        ? theme === 'dark' ? 'text-white' : 'text-amber-900'
                        : theme === 'dark' ? 'text-white/70' : 'text-amber-900/80'
                    }`}>
                      {day.title}
                    </span>
                  </div>
                  <Pill 
                    onClick={() => onNavigateToDay(day.id)}
                    className={`text-xs px-3 py-1 ${
                      day.completed ? 'bg-amber-600/80' : 'bg-amber-900/50'
                    }`}
                  >
                    {day.completed ? 'Повторить' : 'Начать'}
                  </Pill>
                </div>
              </div>
            ))}
          </div>

          {/* Кнопка назад */}
          <div className="mt-6">
            <Pill onClick={onBack} className="w-full">
              Назад
            </Pill>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};
