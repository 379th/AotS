import { ShadowArchetypeCard, ShadowArchetypePair, Exercise } from '../types/cards';

// Кэш для загруженных данных
let cardsCache: ShadowArchetypeCard[] | null = null;

// Функция для очистки кэша (для отладки)
export function clearCardsCache() {
  cardsCache = null;
  console.log('Кэш карт очищен');
}

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

// Функция для загрузки данных карт
export async function loadCardsData(): Promise<ShadowArchetypeCard[]> {
  if (cardsCache) {
    return cardsCache;
  }

  try {
    const response = await fetch('/Sorce/AotS_cards_63_sorce.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log('CSV загружен, размер:', csvText.length);
    
    // Обрабатываем многострочные записи
    const processedText = csvText.replace(/\n(?![0-9]+;)/g, ' '); // Объединяем строки, которые не начинаются с номера пары
    const lines = processedText.split('\n').filter(line => line.trim());
    console.log('Количество строк после обработки:', lines.length);
    
    const headers = parseCSVLine(lines[0]);
    console.log('Заголовки:', headers);
    
    const cards: ShadowArchetypeCard[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      
      if (values.length >= 12) { // Проверяем что у нас есть все 12 колонок
        const card: ShadowArchetypeCard = {
          pair: parseInt(values[0]) || 0,
          title_en: values[1] || '',
          side: (values[2] as 'shadow' | 'archetype') || 'shadow',
          title_ru: values[3] || '',
          conflict_or_resource: values[4] || '',
          desc_full: values[5] || '',
          shloka_dev: values[6] || '',
          shloka_ref: values[7] || '',
          shloka_tr: values[8] || '',
          shloka_meaning: values[9] || '',
          number_pair: values[10] || '',
          exercises: values[11] || '',
        };
        
        cards.push(card);
      } else {
        console.warn(`Строка ${i} имеет недостаточно колонок:`, values.length, values);
      }
    }
    
    console.log('Загружено карт:', cards.length);
    console.log('Пары:', [...new Set(cards.map(c => c.pair))].sort((a, b) => a - b));
    
    // Проверим конкретно пару 42
    const pair42 = cards.filter(c => c.pair === 42);
    console.log('Пара 42:', pair42);
    
    cardsCache = cards;
    return cards;
  } catch (error) {
    console.error('Ошибка загрузки данных карт:', error);
    return [];
  }
}

// Функция для получения пары по номеру
export async function getPairByNumber(pairNumber: number): Promise<ShadowArchetypePair | null> {
  const cards = await loadCardsData();
  console.log(`Поиск пары #${pairNumber}, доступно карт:`, cards.length);
  
  const shadow = cards.find(card => card.pair === pairNumber && card.side === 'shadow');
  const archetype = cards.find(card => card.pair === pairNumber && card.side === 'archetype');
  
  console.log(`Найдена тень:`, shadow ? shadow.title_ru : 'нет');
  console.log(`Найден архетип:`, archetype ? archetype.title_ru : 'нет');
  
  if (shadow && archetype) {
    return {
      shadow,
      archetype,
      pairNumber
    };
  }
  
  console.log(`Пара #${pairNumber} не найдена`);
  return null;
}

// Функция для получения случайной пары
export async function getRandomPair(): Promise<ShadowArchetypePair | null> {
  const cards = await loadCardsData();
  const pairNumbers = [...new Set(cards.map(card => card.pair))];
  
  if (pairNumbers.length === 0) return null;
  
  const randomPairNumber = pairNumbers[Math.floor(Math.random() * pairNumbers.length)];
  return getPairByNumber(randomPairNumber);
}

// Функция для парсинга упражнений
export function parseExercises(exercisesText: string): Exercise[] {
  if (!exercisesText) return [];
  
  // Разбиваем по маркерам списка
  const exerciseLines = exercisesText
    .split(/[•\-\*]/)
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  return exerciseLines.map(text => ({
    text: text.replace(/^[•\-\*]\s*/, ''), // Убираем маркеры
    type: getExerciseType(text)
  }));
}

// Функция для определения типа упражнения
function getExerciseType(text: string): Exercise['type'] {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('медитация') || lowerText.includes('дыхание') || lowerText.includes('мантра')) {
    return 'meditation';
  } else if (lowerText.includes('напиши') || lowerText.includes('запиши') || lowerText.includes('письмо')) {
    return 'writing';
  } else if (lowerText.includes('практика') || lowerText.includes('сделай') || lowerText.includes('выполни')) {
    return 'practice';
  } else {
    return 'reflection';
  }
}
