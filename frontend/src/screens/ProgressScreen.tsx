import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorageString } from '../hooks/useLocalStorage';

interface ProgressScreenProps {
  onBack: () => void;
  onNavigateToDay: (day: string) => void;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({ 
  onBack, 
  onNavigateToDay 
}) => {
  const [day1Completed] = useLocalStorageString('day1_completed', '');
  const [day2Completed] = useLocalStorageString('day2_completed', '');
  const [day3Completed] = useLocalStorageString('day3_completed', '');
  const [day4Completed] = useLocalStorageString('day4_completed', '');

  const days = [
    { id: 'day1', title: 'День 1 - Призыв Тени', completed: !!day1Completed },
    { id: 'day2', title: 'День 2 - Пещера Эха', completed: !!day2Completed },
    { id: 'day3', title: 'День 3 - Зеркало Перехода', completed: !!day3Completed },
    { id: 'day4', title: 'День 4 - Интеграция', completed: !!day4Completed },
  ];

  const totalCompleted = days.filter(day => day.completed).length;
  const progressPercentage = (totalCompleted / days.length) * 100;

  return (
    <ScreenFrame>
      <TitleBar text="Прогресс" />
      
      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-3">
        <div className="h-[66svh] overflow-y-auto rounded-xl border border-amber-900/30 bg-white/5 p-4 space-y-4">
          
          {/* Общий прогресс */}
          <div className="text-center">
            <div className="text-lg font-bold text-amber-200 mb-2">
              Прогресс: {totalCompleted} из {days.length} дней
            </div>
            <div className="w-full bg-amber-900/30 rounded-full h-3 mb-2">
              <div 
                className="bg-amber-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-sm text-amber-200/80">
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
                    : 'border-amber-900/30 bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      day.completed 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-amber-900/30 text-amber-200/50'
                    }`}>
                      {day.completed ? '✓' : index + 1}
                    </div>
                    <span className={`text-sm ${
                      day.completed ? 'text-amber-200' : 'text-amber-200/70'
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
