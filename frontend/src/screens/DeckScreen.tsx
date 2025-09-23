import React, { useState } from 'react';
import { ScreenFrame, TitleBar, NavigationPanel, BottomButtonPanel } from '../components/ui';
import { CardModal } from '../components/ui/CardModal';
import { useDeckCards } from '../hooks/useDeckCards';
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
  const [selectedCard, setSelectedCard] = useState<{
    imageUrl: string;
    name: string;
    type: 'shadow' | 'archetype';
    pairIndex: number;
  } | null>(null);
  const { deckCards, getStats, clearAllCards } = useDeckCards();
  
  
  // Настройки пагинации
  const cardsPerPage = 9; // 3x3 сетка
  const totalPages = Math.ceil(126 / cardsPerPage);
  
  // Получаем карты для текущей страницы
  const startIndex = currentPage * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, 126);
  
  // Создаем массив слотов для отображения
  const slots = Array(126).fill(null).map((_, index) => {
    // Ищем карты для этого номера пары
    const pairIndex = Math.floor(index / 2);
    const cardType = index % 2 === 0 ? 'shadow' : 'archetype';
    return deckCards.find(card => card.pairIndex === pairIndex && card.type === cardType);
  });
  
  const currentPageCards = slots.slice(startIndex, endIndex);
  const stats = getStats();

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
      <div className="flex flex-col h-full overflow-y-auto">
        <TitleBar 
          text="Колода" 
          imagePath={EXTERNAL_ASSETS.NAVIGATION.DECK_TITLE}
        />
        
        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          <div 
            className={`mx-auto mt-3 w-full max-w-[90vw] sm:max-w-2xl rounded-2xl border p-2 sm:p-4 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'border-white/20 text-white' 
                : 'border-[#5c4032]/60 text-amber-900'
            }`}
        style={{
          backgroundImage: theme === 'dark' ? 'none' : 'url(/Sorce/windows/external_container.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
          >
            {/* Информация о странице */}
            <div className="mb-3 text-center">
              <p className="text-sm font-semibold">
                Страница {currentPage + 1} из {totalPages}
              </p>
              <p className="text-xs opacity-80">
                Карты {startIndex + 1}-{endIndex} из 126
              </p>
              <p className="text-xs opacity-60">
                Собрано: {stats.totalCards} карт ({stats.completionPercentage}%)
              </p>
              <p className="text-xs opacity-50">
                Теней: {stats.shadowCards} | Архетипов: {stats.archetypeCards}
              </p>
              
              {/* Кнопка сброса карт */}
              {stats.totalCards > 0 && (
                <div className="mt-3">
                  <button
                    onClick={() => {
                      if (window.confirm('Вы уверены, что хотите сбросить все карты? Это действие нельзя отменить.')) {
                        clearAllCards();
                        setCurrentPage(0); // Возвращаемся на первую страницу
                      }
                    }}
                    className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                      theme === 'dark' 
                        ? 'border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/70' 
                        : 'border-red-500/50 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-500/70'
                    }`}
                  >
                    🗑️ Сбросить все карты
                  </button>
                </div>
              )}
            </div>

            {/* Сетка карт */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 justify-items-center">
              {currentPageCards.map((card, i) => {
                const cardNumber = startIndex + i + 1;
                const cardType = (cardNumber - 1) % 2 === 0 ? 'shadow' : 'archetype';
                
                return (
                  <div 
                    key={cardNumber} 
                    className={`w-20 h-28 sm:w-32 sm:h-48 rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer group ${
                      theme === 'dark' 
                        ? 'border-white/20 bg-[#2d1b4e] text-white hover:border-white/40 hover:shadow-lg hover:shadow-white/10' 
                        : 'border-[#5c4032]/40 bg-[#f7f0e6] hover:border-[#5c4032]/60 hover:shadow-lg hover:shadow-[#5c4032]/20'
                    }`}
                    onClick={() => {
                      if (card) {
                        setSelectedCard({
                          imageUrl: card.imageUrl,
                          name: card.name,
                          type: card.type,
                          pairIndex: card.pairIndex
                        });
                      }
                    }}
                    onMouseMove={(e) => {
                      if (!card) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = (y - centerY) / 10;
                      const rotateY = (centerX - x) / 10;
                      
                      e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                    }}
                  >
                    {card ? (
                      <div className="relative h-full overflow-hidden">
                        <img 
                          src={card.imageUrl} 
                          alt={card.name}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        {/* Overlay при наведении */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-xs sm:text-sm p-1 sm:p-2">
                        <div className="text-[10px] sm:text-xs font-bold mb-1">#{cardNumber}</div>
                        <div className="text-[9px] sm:text-xs opacity-60 text-center">
                          {cardType === 'shadow' ? 'Тень' : 'Архетип'}
                        </div>
                        <div className="text-[8px] sm:text-xs opacity-40 text-center mt-1">
                          Пусто
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Кнопки навигации по страницам */}
            <div className="flex items-center justify-between gap-1 sm:gap-2 px-2">
              <button 
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className={`flex items-center justify-center gap-1 rounded-xl border px-2 sm:px-3 py-2 backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'border-white/20 bg-white/70 text-white'
                    : 'border-[#5c4032]/50 bg-white/90 text-amber-900'
                }`}
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-semibold">Назад</span>
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
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border border-amber-900/30 text-[10px] sm:text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${
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
                className={`flex items-center justify-center gap-1 rounded-xl border px-2 sm:px-3 py-2 backdrop-blur-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'border-white/20 bg-white/70 text-white' 
                    : 'border-[#5c4032]/40 bg-white/70 text-amber-900'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold">Вперед</span>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>

          {/* Кнопки и панель навигации */}
          <div className="mx-auto mt-0.5 w-full max-w-[90vw] sm:max-w-[92%] px-2 sm:px-0">
            {/* Панель кнопок */}
            <BottomButtonPanel
              onBack={onBack}
              onContinue={onBack}
              showContinue={false}
            />

            {/* Панель навигации */}
            <div className="mt-0.5">
              <NavigationPanel
                onAboutQuest={onAboutQuest}
                onGoDay1={onGoDay1}
                onOpenDeck={onOpenDeck}
                onOpenJournal={onOpenJournal}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно для просмотра карт */}
      {selectedCard && (
        <CardModal
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          imageUrl={selectedCard.imageUrl}
          cardName={selectedCard.name}
          cardType={selectedCard.type}
          pairIndex={selectedCard.pairIndex}
        />
      )}
    </ScreenFrame>
  );
};

