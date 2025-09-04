import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { getRandomShadowArchetypePair, getRelatedPair, EXTERNAL_ASSETS } from '../config/externalAssets';

export const useShadowArchetypePair = () => {
  // Сохраняем индекс текущей пары в localStorage
  const [currentPairIndex, setCurrentPairIndex] = useLocalStorage<number>('shadow_archetype_pair_index', -1);
  
  // Состояние текущей пары
  const [currentPair, setCurrentPair] = useState(() => {
    if (currentPairIndex >= 0) {
      return getRelatedPair(currentPairIndex);
    }
    return getRandomShadowArchetypePair();
  });

  // Функция для получения новой случайной пары
  const getNewRandomPair = () => {
    const newPair = getRandomShadowArchetypePair();
    const pairs = EXTERNAL_ASSETS.SHADOW_ARCHETYPE_PAIRS;
    const newIndex = pairs.findIndex(pair => 
      pair.shadow === newPair.shadow && pair.archetype === newPair.archetype
    );
    
    setCurrentPairIndex(newIndex >= 0 ? newIndex : 0);
    setCurrentPair(newPair);
    return newPair;
  };

  // Функция для установки конкретной пары по индексу
  const setPairByIndex = (index: number) => {
    const pair = getRelatedPair(index);
    setCurrentPairIndex(index);
    setCurrentPair(pair);
    return pair;
  };

  // Функция для получения изображения тени
  const getShadowImage = () => currentPair.shadow;

  // Функция для получения изображения архетипа
  const getArchetypeImage = () => currentPair.archetype;

  // Функция для получения названия пары
  const getPairName = () => currentPair.name;

  // Синхронизация при изменении индекса
  useEffect(() => {
    if (currentPairIndex >= 0) {
      setCurrentPair(getRelatedPair(currentPairIndex));
    }
  }, [currentPairIndex]);

  return {
    currentPair,
    currentPairIndex,
    getNewRandomPair,
    setPairByIndex,
    getShadowImage,
    getArchetypeImage,
    getPairName,
    // Информация о доступных парах
    totalPairs: 5,
    hasCurrentPair: currentPairIndex >= 0
  };
};
