import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScreenFrame, TitleBar, Pill } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DeckScreenProps {
  onBack: () => void;
}

export const DeckScreen: React.FC<DeckScreenProps> = ({ onBack }) => {
  const [slots] = useLocalStorage<string[]>('sq.deck.slots', Array(9).fill(''));

  return (
    <ScreenFrame>
      <TitleBar text="Колода" />
      
      <div className="mx-auto mt-3 w-[92%] flex-1 rounded-2xl border border-amber-900/40 bg-input-gradient p-4 text-amber-900">
        <div className="grid grid-cols-3 gap-3">
          {slots.map((val, i) => (
            <div 
              key={i} 
              className="aspect-square rounded-xl border border-amber-900/30 bg-white/80 flex items-center justify-center text-sm p-2"
            >
              {val ? (
                <span>Карты: {val}</span>
              ) : (
                <span className="opacity-60">Пусто</span>
              )}
            </div>
          ))}
        </div>
        <p className="col-span-3 mt-3 text-xs opacity-80 text-center">
          Всего карт будет 126. Здесь будут появляться открытые карты по номерам.
        </p>
      </div>
      
      <div className="mx-auto mt-2 w-[92%] text-right">
        <Pill onClick={onBack}>
          <span className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4"/> Назад
          </span>
        </Pill>
      </div>
    </ScreenFrame>
  );
};

