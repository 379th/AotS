import React, { useState } from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { EXTERNAL_ASSETS } from '../config/externalAssets';

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
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [slots] = useLocalStorage<string[]>('sq.deck.slots', Array(126).fill(''));
  
  // Настройки пагинации
  const cardsPerPage = 9; // 3x3 сетка
  const totalPages = Math.ceil(126 / cardsPerPage);
  
  // Получаем карты для текущей страницы
  const startIndex = currentPage * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, 126);
  const currentPageCards = slots.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ScreenFrame>
      <TitleBar 
        text="Колода" 
        imagePath={EXTERNAL_ASSETS.NAVIGATION.DECK_TITLE}
      />
      
      <div className={`mx-auto mt-3 w-[92%] rounded-2xl border p-4 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'border-white/20 bg-[#1a0b2e] text-white' 
                                    : 'border-[#5c4032]/60 bg-[#e2d0b6] text-amber-900'
      }`}>
        {/* Информация о странице */}
        <div className="mb-3 text-center">
          <p className="text-sm font-semibold">
            Страница {currentPage + 1} из {totalPages}
          </p>
          <p className="text-xs opacity-80">
            Карты {startIndex + 1}-{endIndex} из 126
          </p>
        </div>

        {/* Сетка карт */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {currentPageCards.map((val, i) => {
            const cardNumber = startIndex + i + 1;
            return (
              <div 
                key={cardNumber} 
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center text-sm p-2 transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'border-white/20 bg-[#2d1b4e] text-white' 
                    : 'border-[#5c4032]/40 bg-[#f7f0e6]'
                }`}
              >
                <div className="text-xs font-bold mb-1">#{cardNumber}</div>
                {val ? (
                  <span className="text-center">{val}</span>
                ) : (
                  <span className="opacity-60 text-center">Пусто</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Кнопки навигации по страницам */}
        <div className="flex items-center justify-between gap-2">
          <button 
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className={`flex items-center justify-center gap-1 rounded-xl border px-3 py-2 backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-colors duration-300 ${
              theme === 'dark' 
                                ? 'border-white/20 bg-white/70 text-white'
                                                : 'border-[#5c4032]/50 bg-white/90 text-amber-900'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm font-semibold">Предыдущая</span>
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageIndex;
              if (totalPages <= 5) {
                pageIndex = i;
              } else if (currentPage < 3) {
                pageIndex = i;
              } else if (currentPage >= totalPages - 3) {
                pageIndex = totalPages - 5 + i;
              } else {
                pageIndex = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageIndex}
                  onClick={() => setCurrentPage(pageIndex)}
                  className={`w-8 h-8 rounded-lg border border-amber-900/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${
                    currentPage === pageIndex
                      ? 'bg-amber-600 text-white'
                                                      : 'bg-white/70 text-amber-900'
                  }`}
                >
                  {pageIndex + 1}
                </button>
              );
            })}
          </div>
          
          <button 
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center justify-center gap-1 rounded-xl border px-3 py-2 backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'border-white/20 bg-white/70 text-white' 
                                            : 'border-[#5c4032]/40 bg-white/70 text-amber-900'
              }`}
          >
            <span className="text-sm font-semibold">Следующая</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
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

