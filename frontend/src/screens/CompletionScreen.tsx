import React from 'react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';

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
  return (
    <ScreenFrame>
      <TitleBar text="Завершение" />
      <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-amber-900/30 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,.10),transparent_55%),linear-gradient(180deg,rgba(20,24,30,.75),rgba(36,48,56,.75))] p-3">
        <div className="h-[66svh] overflow-hidden rounded-xl border border-amber-900/30 bg-white/5 p-4 text-amber-200/80 text-sm">
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
