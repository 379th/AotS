// Тестовая функция для проверки загрузки данных карт
import { loadCardsData, getPairByNumber, clearCardsCache } from './cardsData';
import { loadExercisesData, getExercisesByPairNumber, clearExercisesCache } from './exercisesData';

export async function testCardsData() {
  console.log('=== ТЕСТ ЗАГРУЗКИ ДАННЫХ КАРТ ===');
  
  try {
    // Очищаем кэш для свежей загрузки
    clearCardsCache();
    
    // Тест 1: Загрузка всех данных
    console.log('1. Загрузка всех карт...');
    const cards = await loadCardsData();
    console.log(`Загружено карт: ${cards.length}`);
    
    if (cards.length > 0) {
      console.log('Первая карта:', cards[0]);
      console.log('Последняя карта:', cards[cards.length - 1]);
      
      // Тест 2: Поиск конкретной пары
      console.log('\n2. Тест поиска пары #1...');
      const pair1 = await getPairByNumber(1);
      console.log('Пара #1:', pair1);
      
      // Тест 3: Поиск пары #31 (которая вызывала ошибку)
      console.log('\n3. Тест поиска пары #31...');
      const pair31 = await getPairByNumber(31);
      console.log('Пара #31:', pair31);
      
      // Тест 4: Проверка всех доступных пар
      console.log('\n4. Все доступные пары:');
      const pairNumbers = [...new Set(cards.map(c => c.pair))].sort((a, b) => a - b);
      console.log('Номера пар:', pairNumbers);
      console.log('Количество уникальных пар:', pairNumbers.length);
    }
    
    // Тест 5: Загрузка упражнений
    console.log('\n5. Тест загрузки упражнений...');
    clearExercisesCache();
    const exercisesMap = await loadExercisesData();
    console.log('Загружено упражнений для пар:', exercisesMap.size);
    
    // Тест 6: Упражнения для пары 42
    console.log('\n6. Упражнения для пары 42:');
    const pair42Exercises = await getExercisesByPairNumber(42);
    console.log('Упражнения пары 42:', pair42Exercises);
    
    console.log('\n=== ТЕСТ ЗАВЕРШЕН ===');
  } catch (error) {
    console.error('Ошибка в тесте:', error);
  }
}

// Автоматически запускаем тест при импорте
if (typeof window !== 'undefined') {
  testCardsData();
}
