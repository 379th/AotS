import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';

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
      <TitleBar text="Завершение" />
      <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-3 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))]' 
          : 'border-amber-900/50 bg-gradient-to-b from-amber-100/80 to-amber-200/80'
      }`}>
        <div className={`h-[66svh] overflow-hidden rounded-xl border p-4 text-sm transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-amber-900/30 bg-white/5 text-amber-200/80' 
            : 'border-amber-900/40 bg-white/90 text-amber-800/80'
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
