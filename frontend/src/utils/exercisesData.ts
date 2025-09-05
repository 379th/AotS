// Утилиты для загрузки упражнений из отдельного файла

// Кэш для загруженных упражнений
let exercisesCache: Map<number, string> | null = null;

// Функция для парсинга CSV строки (разделитель - точка с запятой)
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ';' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Функция для загрузки упражнений
export async function loadExercisesData(): Promise<Map<number, string>> {
  if (exercisesCache) {
    return exercisesCache;
  }

  try {
    const response = await fetch('/Sorce/AotS_pair_exercises_sorce.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log('CSV упражнений загружен, размер:', csvText.length);
    
    // Обрабатываем многострочные записи
    const processedText = csvText.replace(/\n(?![a-z0-9]+;)/g, ' '); // Объединяем строки, которые не начинаются с pair
    const lines = processedText.split('\n').filter(line => line.trim());
    console.log('Количество строк упражнений после обработки:', lines.length);
    
    const exercisesMap = new Map<number, string>();
    
    for (let i = 1; i < lines.length; i++) { // Пропускаем заголовок
      const values = parseCSVLine(lines[i]);
      
      if (values.length >= 2) {
        const pairKey = values[0]; // pair1, pair2, etc.
        const exercises = values[1] || '';
        
        // Извлекаем номер пары из ключа (pair1 -> 1, pair42 -> 42)
        const pairNumber = parseInt(pairKey.replace('pair', ''));
        
        if (pairNumber && exercises) {
          exercisesMap.set(pairNumber, exercises);
        }
      }
    }
    
    console.log('Загружено упражнений для пар:', exercisesMap.size);
    console.log('Пары с упражнениями:', Array.from(exercisesMap.keys()).sort((a, b) => a - b));
    
    // Проверим конкретно пару 42
    const pair42Exercises = exercisesMap.get(42);
    console.log('Упражнения для пары 42:', pair42Exercises);
    
    exercisesCache = exercisesMap;
    return exercisesMap;
  } catch (error) {
    console.error('Ошибка загрузки упражнений:', error);
    return new Map();
  }
}

// Функция для получения упражнений по номеру пары
export async function getExercisesByPairNumber(pairNumber: number): Promise<string> {
  const exercisesMap = await loadExercisesData();
  return exercisesMap.get(pairNumber) || '';
}

// Функция для очистки кэша (для отладки)
export function clearExercisesCache() {
  exercisesCache = null;
  console.log('Кэш упражнений очищен');
}
