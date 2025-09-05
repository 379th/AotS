import { useState, useEffect } from 'react';
import { Exercise } from '../types/cards';
import { parseExercises } from '../utils/cardsData';
import { getExercisesByPairNumber } from '../utils/exercisesData';
import { useShadowArchetypePair } from './useShadowArchetypePair';

export function useCurrentPair() {
  const { currentPairIndex, hasCurrentPair } = useShadowArchetypePair();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загружаем упражнения при изменении currentPairIndex
  useEffect(() => {
    console.log('useCurrentPair: currentPairIndex =', currentPairIndex, 'hasCurrentPair =', hasCurrentPair);
    if (hasCurrentPair && currentPairIndex >= 0) {
      // currentPairIndex уже соответствует номеру пары (0-62), но пары в CSV нумеруются с 1
      const pairNumber = currentPairIndex + 1;
      console.log('useCurrentPair: загружаем упражнения для пары #', pairNumber);
      loadExercisesForPair(pairNumber);
    }
  }, [currentPairIndex, hasCurrentPair]);

  const loadExercisesForPair = async (pairNumber: number) => {
    try {
      setLoading(true);
      setError(null);
      console.log('loadExercisesForPair: начинаем загрузку упражнений для пары #', pairNumber);
      
      const exercisesText = await getExercisesByPairNumber(pairNumber);
      if (exercisesText) {
        console.log('loadExercisesForPair: упражнения найдены:', exercisesText);
        // Парсим упражнения из текста
        const parsedExercises = parseExercises(exercisesText);
        console.log('loadExercisesForPair: распарсенные упражнения:', parsedExercises);
        setExercises(parsedExercises);
      } else {
        console.log('loadExercisesForPair: упражнения не найдены для пары #', pairNumber);
        setError(`Упражнения для пары ${pairNumber} не найдены`);
        setExercises([]);
      }
    } catch (err) {
      setError('Ошибка загрузки упражнений');
      console.error('Ошибка загрузки упражнений:', err);
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    exercises,
    loading,
    error,
    hasCurrentPair,
    currentPairNumber: currentPairIndex >= 0 ? currentPairIndex + 1 : null
  };
}
