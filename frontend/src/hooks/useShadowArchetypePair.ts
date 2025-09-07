import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { getRelatedPair, EXTERNAL_ASSETS, getImageUrl } from '../config/externalAssets';
import { clearAllJournalData } from '../utils/clearJournalData';
import { useDeckCards } from './useDeckCards';

export const useShadowArchetypePair = () => {
  // Сохраняем индекс текущей пары в localStorage
  const [currentPairIndex, setCurrentPairIndex] = useLocalStorage<number>('shadow_archetype_pair_index', -1);
  
  // Хук для управления картами в колоде
  const { addCardIfNotExists } = useDeckCards();
  
  // Состояние текущей пары
  const [currentPair, setCurrentPair] = useState(() => {
    if (currentPairIndex >= 0) {
      return getRelatedPair(currentPairIndex);
    }
    // Не загружаем случайную пару автоматически при инициализации
    return null;
  });

  // Функция для получения новой случайной пары
  const getNewRandomPair = () => {
    const pairs = EXTERNAL_ASSETS.SHADOW_ARCHETYPE_PAIRS;
    const totalPairs = pairs.length;
    
    // Получаем случайный индекс, отличный от текущего
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * totalPairs);
    } while (newIndex === currentPairIndex && totalPairs > 1);
    
    const newPair = pairs[newIndex];
    
    setCurrentPairIndex(newIndex);
    setCurrentPair(newPair);
    return newPair;
  };

  // Функция для получения следующей пары по порядку
  const getNextPair = () => {
    const pairs = EXTERNAL_ASSETS.SHADOW_ARCHETYPE_PAIRS;
    const totalPairs = pairs.length;
    const nextIndex = (currentPairIndex + 1) % totalPairs;
    
    const nextPair = pairs[nextIndex];
    
    setCurrentPairIndex(nextIndex);
    setCurrentPair(nextPair);
    return nextPair;
  };

  // Функция для установки конкретной пары по индексу
  const setPairByIndex = (index: number) => {
    const pair = getRelatedPair(index);
    setCurrentPairIndex(index);
    setCurrentPair(pair);
    return pair;
  };

  // Функция для сброса пары (при новом запросе)
  const resetPair = () => {
    clearAllJournalData(); // Очищаем все данные дневника
    setCurrentPairIndex(-1);
    setCurrentPair(null);
  };

  // Функция для получения изображения тени
  const getShadowImage = () => currentPair ? getImageUrl(currentPair.shadow) : '';

  // Функция для получения изображения архетипа
  const getArchetypeImage = () => currentPair ? getImageUrl(currentPair.archetype) : '';

  // Функция для получения названия пары
  const getPairName = () => currentPair ? currentPair.name : '';

  // Функция для добавления карты Тени в колоду
  const addShadowToDeck = () => {
    if (currentPairIndex >= 0 && currentPair) {
      addCardIfNotExists(currentPairIndex, 'shadow');
    }
  };

  // Функция для добавления карты Архетипа в колоду
  const addArchetypeToDeck = () => {
    if (currentPairIndex >= 0 && currentPair) {
      addCardIfNotExists(currentPairIndex, 'archetype');
    }
  };

  // Синхронизация при изменении индекса
  useEffect(() => {
    if (currentPairIndex >= 0) {
      const newPair = getRelatedPair(currentPairIndex);
      setCurrentPair(newPair);
    }
  }, [currentPairIndex]);

  return {
    currentPair,
    currentPairIndex,
    getNewRandomPair,
    getNextPair,
    setPairByIndex,
    resetPair,
    getShadowImage,
    getArchetypeImage,
    getPairName,
    addShadowToDeck,
    addArchetypeToDeck,
    // Информация о доступных парах
    totalPairs: 63,
    hasCurrentPair: currentPairIndex >= 0 && currentPair !== null
  };
};
