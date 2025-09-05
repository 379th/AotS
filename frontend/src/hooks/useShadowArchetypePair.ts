import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { getRandomShadowArchetypePair, getRelatedPair, EXTERNAL_ASSETS, getImageUrl } from '../config/externalAssets';
import { clearAllJournalData } from '../utils/clearJournalData';

export const useShadowArchetypePair = () => {
  // Сохраняем индекс текущей пары в localStorage
  const [currentPairIndex, setCurrentPairIndex] = useLocalStorage<number>('shadow_archetype_pair_index', -1);
  
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

  // Функция для сброса пары (при новом запросе)
  const resetPair = () => {
    console.log('Сброс пары - очистка всех данных дневника');
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
    resetPair,
    getShadowImage,
    getArchetypeImage,
    getPairName,
    // Информация о доступных парах
    totalPairs: 63,
    hasCurrentPair: currentPairIndex >= 0 && currentPair !== null
  };
};
