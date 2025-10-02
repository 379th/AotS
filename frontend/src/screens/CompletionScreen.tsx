import React from 'react';
import { ScreenFrame, TitleBar } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

interface CompletionScreenProps {
  onNext: () => void;
  onOpenProgress: () => void;
  onOpenJournal: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ 
  onNext, 
  onOpenProgress, 
  onOpenJournal 
}) => {
  const { theme } = useTheme();
  return (
    <ScreenFrame>
      <TitleBar 
        text="Завершение" 
        imagePath={EXTERNAL_ASSETS.NAVIGATION.COMPLETION_TITLE}
      />
      <div 
        className={`mx-auto mt-3 w-full max-w-[90vw] sm:max-w-[521px] rounded-2xl border p-3 transition-colors duration-300 ${
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
          className={`h-[20svh] overflow-hidden rounded-xl border p-4 text-[23px] transition-colors duration-300 ${
            theme === 'dark' 
              ? 'border-white/20 text-white' 
              : 'border-[#5c4032]/40 text-amber-900'
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
          Круг пройден. Сохрани свои ответы в дневнике. Если хочешь, вернись к любому дню и дополни.
        </div>
        <div className="mt-3 space-y-2 flex flex-col items-center">
          {/* Прогресс и Дневник на одной линии */}
          <div className="flex gap-3">
            <button 
              onClick={onOpenProgress} 
              className="transition-transform active:scale-95 hover:scale-105"
              style={{ width: '160px' }}
            >
              <img 
                src="/Sorce/buttons/Progress.png" 
                alt="Прогресс" 
                className="w-full h-auto"
              />
            </button>
            <button 
              onClick={onOpenJournal} 
              className="transition-transform active:scale-95 hover:scale-105"
              style={{ width: '160px' }}
            >
              <img 
                src="/Sorce/buttons/Daiary_01.png" 
                alt="Дневник" 
                className="w-full h-auto"
              />
            </button>
          </div>
          
          {/* Кнопка "К напутствию" отдельно */}
          <button 
            onClick={onNext} 
            className="transition-transform active:scale-95 hover:scale-105"
            style={{ width: '160px' }}
          >
            <img 
              src="/Sorce/buttons/Botton_to.png" 
              alt="К напутствию" 
              className="w-full h-auto"
            />
          </button>
        </div>
      </div>
    </ScreenFrame>
  );
};
