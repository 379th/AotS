// Утилиты для экспорта и импорта данных дневника

export interface ExportData {
  version: string;
  timestamp: string;
  data: {
    // Дневник
    journal: {
      notes: string;
      diary: string;
    };
    // День 1
    day1: {
      q_where: string;
      q_protects: string;
      q_inner_child: string;
    };
    // День 2
    day2: {
      reflection: string;
      letter_shadow: string;
      letter_adult: string;
    };
    // День 3
    day3: {
      resource: string;
      archetype_resource: string;
      partner_1: string;
      partner_2: string;
      partner_3: string;
    };
    // День 4
    day4: {
      symbol: string;
      offering: string;
    };
    // Общие данные
    general: {
      intent: string;
      day1_completed: string;
      day2_completed: string;
      day3_completed: string;
      day4_completed: string;
    };
  };
}

// Функция для экспорта всех данных
export function exportAllData(): string {
  try {
    const data: ExportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      data: {
        journal: {
          notes: localStorage.getItem('sq.journal.notes') || '',
          diary: localStorage.getItem('sq.journal.diary') || '',
        },
        day1: {
          q_where: localStorage.getItem('day1_q_where') || '',
          q_protects: localStorage.getItem('day1_q_protects') || '',
          q_inner_child: localStorage.getItem('day1_q_inner_child') || '',
        },
        day2: {
          reflection: localStorage.getItem('day2_reflection') || '',
          letter_shadow: localStorage.getItem('day2_letter_shadow') || '',
          letter_adult: localStorage.getItem('day2_letter_adult') || '',
        },
        day3: {
          resource: localStorage.getItem('day3_resource') || '',
          archetype_resource: localStorage.getItem('day3_archetype_resource') || '',
          partner_1: localStorage.getItem('day3_partner_1') || '',
          partner_2: localStorage.getItem('day3_partner_2') || '',
          partner_3: localStorage.getItem('day3_partner_3') || '',
        },
        day4: {
          symbol: localStorage.getItem('day4_symbol') || '',
          offering: localStorage.getItem('day4_offering') || '',
        },
        general: {
          intent: localStorage.getItem('sq.player.intent') || '',
          day1_completed: localStorage.getItem('day1_completed') || '',
          day2_completed: localStorage.getItem('day2_completed') || '',
          day3_completed: localStorage.getItem('day3_completed') || '',
          day4_completed: localStorage.getItem('day4_completed') || '',
        },
      },
    };

    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Ошибка экспорта данных:', error);
    throw new Error('Не удалось экспортировать данные');
  }
}

// Функция для импорта данных
export function importData(jsonData: string): void {
  try {
    const data: ExportData = JSON.parse(jsonData);
    
    // Проверяем версию
    if (data.version !== '1.0') {
      throw new Error('Неподдерживаемая версия данных');
    }

    // Импортируем данные
    if (data.data.journal) {
      if (data.data.journal.notes) localStorage.setItem('sq.journal.notes', data.data.journal.notes);
      if (data.data.journal.diary) localStorage.setItem('sq.journal.diary', data.data.journal.diary);
    }

    if (data.data.day1) {
      if (data.data.day1.q_where) localStorage.setItem('day1_q_where', data.data.day1.q_where);
      if (data.data.day1.q_protects) localStorage.setItem('day1_q_protects', data.data.day1.q_protects);
      if (data.data.day1.q_inner_child) localStorage.setItem('day1_q_inner_child', data.data.day1.q_inner_child);
    }

    if (data.data.day2) {
      if (data.data.day2.reflection) localStorage.setItem('day2_reflection', data.data.day2.reflection);
      if (data.data.day2.letter_shadow) localStorage.setItem('day2_letter_shadow', data.data.day2.letter_shadow);
      if (data.data.day2.letter_adult) localStorage.setItem('day2_letter_adult', data.data.day2.letter_adult);
    }

    if (data.data.day3) {
      if (data.data.day3.resource) localStorage.setItem('day3_resource', data.data.day3.resource);
      if (data.data.day3.archetype_resource) localStorage.setItem('day3_archetype_resource', data.data.day3.archetype_resource);
      if (data.data.day3.partner_1) localStorage.setItem('day3_partner_1', data.data.day3.partner_1);
      if (data.data.day3.partner_2) localStorage.setItem('day3_partner_2', data.data.day3.partner_2);
      if (data.data.day3.partner_3) localStorage.setItem('day3_partner_3', data.data.day3.partner_3);
    }

    if (data.data.day4) {
      if (data.data.day4.symbol) localStorage.setItem('day4_symbol', data.data.day4.symbol);
      if (data.data.day4.offering) localStorage.setItem('day4_offering', data.data.day4.offering);
    }

    if (data.data.general) {
      if (data.data.general.intent) localStorage.setItem('sq.player.intent', data.data.general.intent);
      if (data.data.general.day1_completed) localStorage.setItem('day1_completed', data.data.general.day1_completed);
      if (data.data.general.day2_completed) localStorage.setItem('day2_completed', data.data.general.day2_completed);
      if (data.data.general.day3_completed) localStorage.setItem('day3_completed', data.data.general.day3_completed);
      if (data.data.general.day4_completed) localStorage.setItem('day4_completed', data.data.general.day4_completed);
    }

    console.log('Данные успешно импортированы');
  } catch (error) {
    console.error('Ошибка импорта данных:', error);
    throw new Error('Не удалось импортировать данные. Проверьте формат файла.');
  }
}

// Функция для скачивания файла
export function downloadFile(content: string, filename: string, mimeType: string = 'application/json'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Функция для чтения файла
export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Не удалось прочитать файл'));
      }
    };
    reader.onerror = () => reject(new Error('Ошибка чтения файла'));
    reader.readAsText(file);
  });
}
