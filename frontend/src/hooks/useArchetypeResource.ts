import { useState, useEffect } from 'react';
import { useShadowArchetypePair } from './useShadowArchetypePair';
import { getPairByNumber } from '../utils/cardsData';

export const useArchetypeResource = () => {
  const { currentPairIndex, hasCurrentPair } = useShadowArchetypePair();
  const [archetypeData, setArchetypeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArchetypeData = async () => {
      if (!hasCurrentPair || currentPairIndex < 0) {
        setArchetypeData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Получаем номер пары (currentPairIndex 0-indexed, CSV 1-indexed)
        const pairNumber = currentPairIndex + 1;
        console.log('Загрузка данных архетипа для пары:', pairNumber);

        const pair = await getPairByNumber(pairNumber);
        
        if (pair && pair.archetype) {
          console.log('Найдены данные архетипа:', pair.archetype);
          setArchetypeData(pair.archetype);
        } else {
          console.log('Данные архетипа не найдены для пары:', pairNumber);
          setArchetypeData(null);
        }
      } catch (err) {
        console.error('Ошибка загрузки данных архетипа:', err);
        setError('Ошибка загрузки данных архетипа');
        setArchetypeData(null);
      } finally {
        setLoading(false);
      }
    };

    loadArchetypeData();
  }, [currentPairIndex, hasCurrentPair]);

  return {
    archetypeData,
    loading,
    error,
    hasCurrentPair
  };
};
