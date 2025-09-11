import React, { useState, useEffect } from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TimerApi } from '../services/timerApi';

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
  const [isTestMode] = useState(import.meta.env.DEV || window.location.hostname === 'localhost'); // Тестовый режим только в разработке или на localhost
  
  // Логируем состояние тестового режима
  console.log('TimerScreen: isTestMode =', isTestMode, 'dayNumber =', dayNumber);
  
  // Ключи для localStorage
  const timerKey = `timer_day_${dayNumber}`;
  const startTimeKey = `timer_start_day_${dayNumber}`;
  
  // Сохраняем время начала таймера и оставшееся время
  const [startTime, setStartTime] = useLocalStorage<number>(startTimeKey, 0);
  const [timeLeft, setTimeLeft] = useLocalStorage<number>(timerKey, 24 * 60 * 60);

  // Инициализируем таймер с сервера или localStorage
  useEffect(() => {
    const initializeTimer = async () => {
      try {
        // Сначала пытаемся загрузить с сервера
        const serverTimer = await TimerApi.loadTimer(dayNumber);
        
        if (serverTimer) {
          // Используем данные с сервера
          console.log(`Восстановление таймера с сервера для дня ${dayNumber}:`, new Date(serverTimer.startTime).toLocaleTimeString());
          setStartTime(serverTimer.startTime);
          
          // Пересчитываем оставшееся время
          const remaining = calculateTimeLeft(serverTimer.startTime);
          setTimeLeft(remaining);
        } else if (startTime === 0) {
          // Если на сервере нет данных и в localStorage тоже нет, создаем новый таймер
          const now = Date.now();
          console.log(`Инициализация нового таймера для дня ${dayNumber}:`, new Date(now).toLocaleTimeString());
          setStartTime(now);
          setTimeLeft(24 * 60 * 60);
          
          // Сохраняем на сервер
          await TimerApi.saveTimer(dayNumber, now);
        } else {
          // Используем данные из localStorage
          console.log(`Восстановление таймера из localStorage для дня ${dayNumber}:`, new Date(startTime).toLocaleTimeString());
          
          // Пересчитываем оставшееся время
          const remaining = calculateTimeLeft(startTime);
          setTimeLeft(remaining);
        }
      } catch (error) {
        console.error('Ошибка инициализации таймера:', error);
        // Fallback к localStorage
        if (startTime === 0) {
          const now = Date.now();
          setStartTime(now);
          setTimeLeft(24 * 60 * 60);
        } else {
          // Пересчитываем оставшееся время из localStorage
          const remaining = calculateTimeLeft(startTime);
          setTimeLeft(remaining);
        }
      }
    };

    initializeTimer();
  }, [dayNumber]); // Убираем зависимости, которые вызывают бесконечный цикл

  // Таймер НЕ сбрасывается при навигации - работает как настоящий таймер

  useEffect(() => {
    if (isTestMode || startTime === 0) return; // В тестовом режиме или до инициализации таймер не работает

    // Вычисляем оставшееся время на основе времени запуска
    const calculateRemainingTime = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, 24 * 60 * 60 - elapsed);
      return remaining;
    };

    // Устанавливаем правильное время при загрузке
    const initialTime = calculateRemainingTime();
    setTimeLeft(initialTime);

    // Если время истекло, сразу показываем 0
    if (initialTime === 0) {
      return;
    }

    const timer = setInterval(() => {
      const remaining = calculateRemainingTime();
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestMode, startTime, setTimeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((24 * 60 * 60 - timeLeft) / (24 * 60 * 60)) * 100;

  // Функция для пересчета оставшегося времени
  const calculateTimeLeft = (startTime: number): number => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = Math.max(0, 24 * 60 * 60 - elapsed);
    
    console.log(`Пересчет времени для дня ${dayNumber}:`, {
      startTime: new Date(startTime).toLocaleString(),
      elapsed: `${Math.floor(elapsed / 3600)}ч ${Math.floor((elapsed % 3600) / 60)}м ${elapsed % 60}с`,
      remaining: `${Math.floor(remaining / 3600)}ч ${Math.floor((remaining % 3600) / 60)}м ${remaining % 60}с`
    });
    
    return remaining;
  };

  // Функция для сброса таймера (вызывается при новом запросе)
  const resetTimer = async () => {
    const now = Date.now();
    setStartTime(now);
    setTimeLeft(24 * 60 * 60);
    
    // Сохраняем на сервер
    await TimerApi.saveTimer(dayNumber, now);
  };

  // Экспортируем функцию сброса для использования в других компонентах
  useEffect(() => {
    // Сохраняем функцию сброса в глобальном объекте для доступа из других компонентов
    (window as any)[`resetTimerDay${dayNumber}`] = resetTimer;
  }, [dayNumber]);

  return (
    <ScreenFrame>
      <TitleBar 
        text={`Таймер - ${dayTitle}`} 
        imagePath={EXTERNAL_ASSETS.NAVIGATION.TIMER_TITLE}
      />
      
      <div className={`mx-auto mt-3 w-full max-w-[90vw] sm:max-w-[521px] h-[70vh] sm:h-[782px] rounded-2xl border p-3 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e]' 
          : 'border-[#5c4032]/50 bg-[#e2d0b6]'
      }`}>
        <div className={`h-full overflow-y-auto rounded-xl border p-4 space-y-6 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-white/20 bg-[#2d1b4e]' 
            : 'border-[#5c4032]/40 bg-[#f7f0e6]'
        }`}>
          
          {/* Заголовок */}
          <div className="text-center">
            <div className={`text-[27px] font-bold mb-2 transition-colors duration-300 ${
                              theme === 'dark' ? 'text-white' : 'text-amber-900'
            }`}>
              {dayNumber === 1 ? 'Отдохни и подготовься' : 
               dayNumber === 2 ? 'Отдохни и дай время для интеграции опыта' :
               dayNumber === 3 ? 'Практикуй осознанность и медитацию' :
               'Время для интеграции'}
            </div>
            <div className={`text-[17px] transition-colors duration-300 ${
              theme === 'dark' ? 'text-white/80' : 'text-amber-900/70'
            }`}>
              День {dayNumber} завершен. {dayNumber === 1 ? 'Отдохните и подготовьтесь к следующему дню.' : 
                                        dayNumber === 2 ? 'Дайте время для интеграции опыта.' :
                                        dayNumber === 3 ? 'Практикуйте осознанность и медитацию.' :
                                        'Подготовьтесь к завершению квеста.'}
            </div>
            {isTestMode && (
              <div className={`text-[15px] font-semibold mt-2 px-3 py-1 rounded-full inline-block transition-colors duration-300 ${
                theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
              }`}>
                🧪 ТЕСТОВЫЙ РЕЖИМ
              </div>
            )}
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
            
            <div className={`text-[17px] transition-colors duration-300 ${
              theme === 'dark' ? 'text-white/80' : 'text-amber-900/70'
            }`}>
              {isTestMode ? 'Тестовый режим (разработка)' : `${progressPercentage.toFixed(1)}% времени прошло`}
            </div>
            
            {/* Информация о времени запуска */}
            {startTime > 0 && (
              <div className={`text-[15px] transition-colors duration-300 ${
                theme === 'dark' ? 'text-white/60' : 'text-amber-900/50'
              }`}>
                Таймер запущен: {new Date(startTime).toLocaleString()}
              </div>
            )}
          </div>

          {/* Информация */}
          <div className={`rounded-lg p-4 space-y-3 transition-colors duration-300 ${
            theme === 'dark' ? 'bg-white/5' : 'bg-[#f7f0e6]'
          }`}>
            <div className={`text-[17px] transition-colors duration-300 ${
              theme === 'dark' ? 'text-white/90' : 'text-amber-900'
            }`}>
              <strong>Рекомендации:</strong>
            </div>
            <ul className={`text-[17px] space-y-2 list-disc list-inside transition-colors duration-300 ${
              theme === 'dark' ? 'text-white/70' : 'text-amber-900/70'
            }`}>
              {dayNumber === 1 ? (
                <>
                  <li>Отдохните и подготовьтесь</li>
                  <li>Практикуйте осознанность и медитацию</li>
                  <li>Записывайте свои мысли и чувства</li>
                  <li>Поддерживайте связь с природой</li>
                </>
              ) : dayNumber === 2 ? (
                <>
                  <li>Отдохните и дай время для интеграции опыта</li>
                  <li>Практикуйте осознанность и медитацию</li>
                  <li>Записывайте свои мысли и чувства</li>
                  <li>Поддерживайте связь с природой</li>
                </>
              ) : dayNumber === 3 ? (
                <>
                  <li>Практикуй осознанность и медитацию</li>
                  <li>Записывай свои мысли и чувства</li>
                  <li>Поддерживай связь с природой</li>
                  <li>Отдохни и подготовься к завершению</li>
                </>
              ) : (
                <>
                  <li>Отдохните и дайте время для интеграции опыта</li>
                  <li>Практикуйте осознанность и медитацию</li>
                  <li>Записывайте свои мысли и чувства</li>
                  <li>Поддерживайте связь с природой</li>
                </>
              )}
            </ul>
          </div>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button 
              onClick={onBack}
              className="inline-flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
              style={{
                backgroundImage: 'url(/Sorce/buttons/Back.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: 'auto',
                height: 'auto',
                minWidth: '120px',
                minHeight: '60px'
              }}
            >
            </button>
            
            {isTestMode && (
              <button 
                onClick={onContinue}
                className="inline-flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
                style={{
                  backgroundImage: 'url(/Sorce/buttons/Continue.png)',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: 'auto',
                  height: 'auto',
                  minWidth: '120px',
                  minHeight: '60px'
                }}
              >
              </button>
            )}
            
            {!isTestMode && timeLeft === 0 && (
              <button 
                onClick={onContinue}
                className="inline-flex items-center justify-center transition-transform active:scale-95 hover:scale-105"
                style={{
                  backgroundImage: 'url(/Sorce/buttons/Continue.png)',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: 'auto',
                  height: 'auto',
                  minWidth: '120px',
                  minHeight: '60px'
                }}
              >
              </button>
            )}
            
            {/* Кнопки для тестового режима */}
            {isTestMode && (() => {
              console.log('Rendering test buttons: isTestMode =', isTestMode, 'timeLeft =', timeLeft);
              return (
                <div className="flex flex-col gap-2 w-full">
                  {timeLeft > 0 && (
                    <Pill 
                      onClick={resetTimer}
                      className="w-full bg-red-600/80 hover:bg-red-600"
                    >
                      Сбросить таймер
                    </Pill>
                  )}
                  <Pill 
                    onClick={() => {
                      setTimeLeft(0);
                      onContinue();
                    }}
                    className="w-full bg-green-600/80 hover:bg-green-600"
                  >
                    Пропустить таймер
                  </Pill>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
};

