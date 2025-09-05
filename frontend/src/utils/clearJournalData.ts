// Утилита для очистки всех данных дневника

// Список всех ключей localStorage, которые нужно очистить
const JOURNAL_DATA_KEYS = [
  // Дневник
  'sq.journal.notes',
  'sq.journal.diary',
  
  // День 1
  'day1_q_where',
  'day1_q_protects', 
  'day1_q_inner_child',
  
  // День 2
  'day2_reflection',
  'day2_letter_shadow',
  'day2_letter_adult',
  
  // День 3
  'day3_resource',
  'day3_archetype_resource',
  'day3_partner_1',
  'day3_partner_2',
  'day3_partner_3',
  
  // День 4
  'day4_symbol',
  'day4_offering',
  
  // Общие данные
  'sq.player.intent',
  'day1_completed',
  'day2_completed',
  'day3_completed',
  'day4_completed',
];

// Функция для очистки всех данных дневника
export function clearAllJournalData(): void {
  try {
    console.log('Очистка всех данных дневника...');
    
    JOURNAL_DATA_KEYS.forEach(key => {
      localStorage.removeItem(key);
      console.log(`Удален ключ: ${key}`);
    });
    
    console.log('Все данные дневника очищены');
  } catch (error) {
    console.error('Ошибка при очистке данных дневника:', error);
  }
}

// Функция для проверки, есть ли данные дневника
export function hasJournalData(): boolean {
  try {
    return JOURNAL_DATA_KEYS.some(key => {
      const value = localStorage.getItem(key);
      return value !== null && value !== '';
    });
  } catch (error) {
    console.error('Ошибка при проверке данных дневника:', error);
    return false;
  }
}

// Функция для получения статистики данных
export function getJournalDataStats(): { total: number; filled: number; empty: number } {
  try {
    let filled = 0;
    let empty = 0;
    
    JOURNAL_DATA_KEYS.forEach(key => {
      const value = localStorage.getItem(key);
      if (value !== null && value !== '') {
        filled++;
      } else {
        empty++;
      }
    });
    
    return {
      total: JOURNAL_DATA_KEYS.length,
      filled,
      empty
    };
  } catch (error) {
    console.error('Ошибка при получении статистики данных:', error);
    return { total: 0, filled: 0, empty: 0 };
  }
}
