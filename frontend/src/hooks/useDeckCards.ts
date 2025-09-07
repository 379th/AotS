import { useLocalStorage } from './useLocalStorage';
import { getImageUrl, EXTERNAL_ASSETS } from '../config/externalAssets';

export interface DeckCard {
  id: string;
  type: 'shadow' | 'archetype';
  pairIndex: number;
  imageUrl: string;
  name: string;
  addedAt: number;
}

export const useDeckCards = () => {
  // Сохраняем карты в localStorage
  const [deckCards, setDeckCards] = useLocalStorage<DeckCard[]>('sq.deck.cards', []);
  
  // Функция для добавления карты в колоду только если её еще нет
  const addCardIfNotExists = (pairIndex: number, type: 'shadow' | 'archetype') => {
    const pair = EXTERNAL_ASSETS.SHADOW_ARCHETYPE_PAIRS[pairIndex];
    if (!pair) {
      return;
    }

    const cardId = `${type}_${pairIndex}`;
    
    // Проверяем, есть ли уже такая карта
    const existingCard = deckCards.find(card => card.id === cardId);
    if (existingCard) {
      return;
    }

    const rawImagePath = type === 'shadow' ? pair.shadow : pair.archetype;
    const imageUrl = getImageUrl(rawImagePath);
    const name = type === 'shadow' ? `Тень ${pairIndex + 1}` : `Архетип ${pairIndex + 1}`;

    const newCard: DeckCard = {
      id: cardId,
      type,
      pairIndex,
      imageUrl,
      name,
      addedAt: Date.now()
    };

    setDeckCards((prev: DeckCard[]) => {
      const newCards = [...prev, newCard];
      return newCards;
    });
  };

  // Функция для принудительного добавления карты (для тестовых кнопок)
  const addCardToDeck = (pairIndex: number, type: 'shadow' | 'archetype') => {
    const pair = EXTERNAL_ASSETS.SHADOW_ARCHETYPE_PAIRS[pairIndex];
    if (!pair) {
      return;
    }

    const cardId = `${type}_${pairIndex}`;
    const rawImagePath = type === 'shadow' ? pair.shadow : pair.archetype;
    const imageUrl = getImageUrl(rawImagePath);
    const name = type === 'shadow' ? `Тень ${pairIndex + 1}` : `Архетип ${pairIndex + 1}`;

    const newCard: DeckCard = {
      id: cardId,
      type,
      pairIndex,
      imageUrl,
      name,
      addedAt: Date.now()
    };

    setDeckCards((prev: DeckCard[]) => {
      // Удаляем существующую карту с таким же ID, если есть
      const filteredCards = prev.filter((card: DeckCard) => card.id !== cardId);
      const newCards = [...filteredCards, newCard];
      return newCards;
    });
  };

  // Функция для получения карты по номеру пары и типу
  const getCardByPairAndType = (pairIndex: number, type: 'shadow' | 'archetype') => {
    const cardId = `${type}_${pairIndex}`;
    return deckCards.find(card => card.id === cardId);
  };

  // Функция для получения всех карт для конкретной пары
  const getCardsForPair = (pairIndex: number) => {
    return deckCards.filter(card => card.pairIndex === pairIndex);
  };

  // Функция для очистки всех карт
  const clearAllCards = () => {
    setDeckCards([]);
  };

  // Функция для удаления конкретной карты
  const removeCard = (cardId: string) => {
    setDeckCards((prev: DeckCard[]) => prev.filter((card: DeckCard) => card.id !== cardId));
  };

  // Функция для принудительного обновления состояния
  const refreshDeck = () => {
    if (typeof window !== "undefined") {
      try {
        const stored = window.localStorage.getItem('sq.deck.cards');
        if (stored) {
          const parsed = JSON.parse(stored);
          setDeckCards(parsed);
        }
      } catch (error) {
        // Ошибка обновления колоды
      }
    }
  };

  // Функция для получения статистики
  const getStats = () => {
    const shadowCards = deckCards.filter(card => card.type === 'shadow').length;
    const archetypeCards = deckCards.filter(card => card.type === 'archetype').length;
    const totalPairs = Math.max(...deckCards.map(card => card.pairIndex), -1) + 1;
    
    return {
      totalCards: deckCards.length,
      shadowCards,
      archetypeCards,
      totalPairs,
      completionPercentage: Math.round((deckCards.length / 126) * 100)
    };
  };

  return {
    deckCards,
    addCardToDeck,
    addCardIfNotExists,
    getCardByPairAndType,
    getCardsForPair,
    clearAllCards,
    removeCard,
    refreshDeck,
    getStats
  };
};
