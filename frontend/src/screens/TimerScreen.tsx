import React, { useState, useEffect } from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';

interface TimerScreenProps {
  onBack: () => void;
  onContinue: () => void;
  dayNumber: number;
  dayTitle: string;
}

export const TimerScreen: React.FC<TimerScreenProps> = ({ 
  onBack, 
  onContinue, 
  dayNumber, 
  dayTitle 
}) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 часа в секундах
  const [isTestMode] = useState(true); // Тестовый режим

  useEffect(() => {
    if (isTestMode) return; // В тестовом режиме таймер не работает

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestMode]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((24 * 60 * 60 - timeLeft) / (24 * 60 * 60)) * 100;

  return (
    <ScreenFrame>
      <TitleBar text={`Таймер - ${dayTitle}`} />
      
      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-3">
        <div className="h-[66svh] overflow-y-auto rounded-xl border border-amber-900/30 bg-white/5 p-4 space-y-6">
          
          {/* Заголовок */}
          <div className="text-center">
            <div className="text-lg font-bold text-amber-200 mb-2">
              Время для интеграции
            </div>
            <div className="text-sm text-amber-200/80">
              День {dayNumber} завершен. Отдохните и подготовьтесь к следующему дню.
            </div>
          </div>

          {/* Таймер */}
          <div className="text-center space-y-4">
            <div className="text-4xl font-mono font-bold text-amber-400">
              {formatTime(timeLeft)}
            </div>
            
            {/* Прогресс-бар */}
            <div className="w-full bg-amber-900/30 rounded-full h-3">
              <div 
                className="bg-amber-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="text-sm text-amber-200/80">
              {isTestMode ? 'Тестовый режим' : `${progressPercentage.toFixed(1)}% времени прошло`}
            </div>
          </div>

          {/* Информация */}
          <div className="bg-amber-900/20 rounded-lg p-4 space-y-3">
            <div className="text-sm text-amber-200/90">
              <strong>Рекомендации:</strong>
            </div>
            <ul className="text-sm text-amber-200/70 space-y-2 list-disc list-inside">
              <li>Отдохните и дайте время для интеграции опыта</li>
              <li>Практикуйте осознанность и медитацию</li>
              <li>Записывайте свои мысли и чувства</li>
              <li>Поддерживайте связь с природой</li>
            </ul>
          </div>

          {/* Кнопки */}
          <div className="space-y-3">
            {isTestMode && (
              <Pill 
                onClick={onContinue}
                className="w-full bg-amber-600/80 hover:bg-amber-600"
              >
                Пропустить таймер (тестовый режим)
              </Pill>
            )}
            
            {!isTestMode && timeLeft === 0 && (
              <Pill 
                onClick={onContinue}
                className="w-full bg-amber-600/80 hover:bg-amber-600"
              >
                Продолжить
              </Pill>
            )}
            
            <Pill 
              onClick={onBack}
              className="w-full bg-amber-900/50 hover:bg-amber-900/70"
            >
              Назад
            </Pill>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};
