import { useState, useEffect } from 'react';
import { useShadowArchetypePair } from './useShadowArchetypePair';
import { getPairByNumber } from '../utils/cardsData';

export const useArchetypeResource = () => {
  const { currentPairIndex, hasCurrentPair } = useShadowArchetypePair();
  const [archetypeResource, setArchetypeResource] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArchetypeResource = async () => {
      if (!hasCurrentPair || currentPairIndex < 0) {
        setArchetypeResource('');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Получаем номер пары (currentPairIndex 0-indexed, CSV 1-indexed)
        const pairNumber = currentPairIndex + 1;
        console.log('Загрузка ресурса архетипа для пары:', pairNumber);

        const pair = await getPairByNumber(pairNumber);
        
        if (pair && pair.archetype) {
          // Используем поле conflict_or_resource для архетипа как ресурс
          const resource = pair.archetype.conflict_or_resource || '';
          console.log('Найден ресурс архетипа:', resource);
          setArchetypeResource(resource);
        } else {
          console.log('Ресурс архетипа не найден для пары:', pairNumber);
          setArchetypeResource('');
        }
      } catch (err) {
        console.error('Ошибка загрузки ресурса архетипа:', err);
        setError('Ошибка загрузки ресурса архетипа');
        setArchetypeResource('');
      } finally {
        setLoading(false);
      }
    };

    loadArchetypeResource();
  }, [currentPairIndex, hasCurrentPair]);

  return {
    archetypeResource,
    loading,
    error,
    hasCurrentPair
  };
};
