import React, { useState, useEffect } from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

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
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 часа в секундах
  const [isTestMode] = useState(import.meta.env.DEV); // Тестовый режим в разработке

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
      <TitleBar 
        text={`Таймер - ${dayTitle}`} 
        imagePath={EXTERNAL_ASSETS.NAVIGATION.TIMER_TITLE}
      />
      
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
          
          {/* Заголовок */}
          <div className="text-center">
            <div className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                              theme === 'dark' ? 'text-white' : 'text-amber-900'
            }`}>
              Время для интеграции
            </div>
            <div className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-white/80' : 'text-amber-900/70'
            }`}>
              День {dayNumber} завершен. Отдохните и подготовьтесь к следующему дню.
            </div>
          </div>

          {/* Таймер */}
          <div className="text-center space-y-4">
            <div className={`text-4xl font-mono font-bold transition-colors duration-300 ${
          theme === 'dark' 
            ? 'text-amber-400' 
            : 'text-amber-900'
        }`}>
              {formatTime(timeLeft)}
            </div>
            
            {/* Прогресс-бар */}
            <div className="w-full bg-amber-900/30 rounded-full h-3">
              <div 
                className="bg-amber-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-white/80' : 'text-amber-900/70'
            }`}>
              {isTestMode ? 'Тестовый режим (разработка)' : `${progressPercentage.toFixed(1)}% времени прошло`}
            </div>
          </div>

          {/* Информация */}
          <div className={`rounded-lg p-4 space-y-3 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-white/5' : 'bg-[#f7f0e6]'
          }`}>
            <div className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-white/90' : 'text-amber-900'
            }`}>
              <strong>Рекомендации:</strong>
            </div>
            <ul className={`text-sm space-y-2 list-disc list-inside transition-colors duration-300 ${
              theme === 'dark' ? 'text-white/70' : 'text-amber-900/70'
            }`}>
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

