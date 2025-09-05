import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
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
      <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-3 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e]' 
          : 'border-[#5c4032]/50 bg-[#e2d0b6]'
      }`}>
        <div className={`h-[20svh] overflow-hidden rounded-xl border p-4 text-sm transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-white/20 bg-[#2d1b4e] text-white' 
            : 'border-[#5c4032]/40 bg-[#f7f0e6] text-amber-900'
        }`}>
          Круг пройден. Сохрани свои ответы в дневнике. Если хочешь, вернись к любому дню и дополни.
        </div>
        <div className="mt-3 space-y-2">
          <Pill onClick={onOpenProgress} className="w-full">
            Прогресс
          </Pill>
          <Pill onClick={onOpenJournal} className="w-full">
            Дневник
          </Pill>
          <Pill onClick={onNext} className="w-full">
            К напутствию
          </Pill>
        </div>
      </div>
    </ScreenFrame>
  );
};
