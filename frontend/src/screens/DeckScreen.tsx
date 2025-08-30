import React from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DeckScreenProps {
  onBack: () => void;
  onAboutQuest: () => void;
  onGoDay1: () => void;
  onOpenDeck: () => void;
  onOpenJournal: () => void;
}

export const DeckScreen: React.FC<DeckScreenProps> = ({ 
  onBack,
  onAboutQuest,
  onGoDay1,
  onOpenDeck,
  onOpenJournal
}) => {
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

      {/* Зафиксированный слой с кнопками и панелью навигации внизу страницы */}
      <div className="fixed bottom-0 left-0 right-0 z-10 px-4 pb-4 max-w-[520px] mx-auto">
        <div className="space-y-4">
          {/* Панель кнопок */}
          <BottomButtonPanel
            onBack={onBack}
            onContinue={onBack}
            continueText="Обновить"
          />

          {/* Панель навигации */}
          <NavigationPanel
            onAboutQuest={onAboutQuest}
            onGoDay1={onGoDay1}
            onOpenDeck={onOpenDeck}
            onOpenJournal={onOpenJournal}
          />
        </div>
      </div>
    </ScreenFrame>
  );
};

