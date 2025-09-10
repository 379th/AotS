// Утилиты для экспорта данных дневника в PDF

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportData } from './dataExport';
import { getExercisesByPairNumber } from './exercisesData';

// Функция для создания HTML контента с поддержкой изображений
function createContentWithImage(content: string, title: string, color: string): string {
  if (!content) return '';
  
  let html = `
    <div style="margin-bottom: 20px;">
      <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">${title}:</h3>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid ${color};">
  `;
  
  // Проверяем, является ли контент base64 изображением
  if (content.startsWith('data:image')) {
    html += `
      <img src="${content}" alt="${title}" style="max-width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
    `;
  } else {
    html += `
      <p style="white-space: pre-wrap; margin: 0;">${content}</p>
    `;
  }
  
  html += `
      </div>
    </div>
  `;
  
  return html;
}

// Функция для экспорта данных в PDF
export async function exportToPDF(data: ExportData): Promise<void> {
  try {
    // Создаем HTML элемент для PDF
    const htmlContent = await createHTMLContent(data);
    
    // Создаем временный элемент
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '800px';
    tempDiv.style.padding = '40px';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '14px';
    tempDiv.style.lineHeight = '1.6';
    tempDiv.style.color = '#333';
    tempDiv.style.backgroundColor = 'white';
    
    document.body.appendChild(tempDiv);

    // Конвертируем HTML в canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Удаляем временный элемент
    document.body.removeChild(tempDiv);

    // Создаем PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Добавляем первую страницу
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Добавляем дополнительные страницы если нужно
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Сохраняем PDF
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `aots-journal-${timestamp}.pdf`;
    pdf.save(filename);

    console.log('PDF успешно создан:', filename);
  } catch (error) {
    console.error('Ошибка создания PDF:', error);
    throw new Error('Не удалось создать PDF файл');
  }
}

// Функция для создания HTML контента
async function createHTMLContent(data: ExportData): Promise<string> {
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
      <h1 style="text-align: center; color: #2c3e50; margin-bottom: 30px; font-size: 28px;">
        📖 Дневник Shadow Quest
      </h1>
      <p style="text-align: center; color: #7f8c8d; margin-bottom: 40px; font-size: 14px;">
        Дата экспорта: ${new Date(data.timestamp).toLocaleDateString('ru-RU')}
      </p>
  `;

  // Дневник
  if (data.data.journal) {
    html += `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 10px; font-size: 20px;">
          📝 Дневник
        </h2>
    `;
    
    if (data.data.journal.notes) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Заметки:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3498db; white-space: pre-wrap;">${data.data.journal.notes}</p>
        </div>
      `;
    }
    
    if (data.data.journal.diary) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Дневник:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3498db; white-space: pre-wrap;">${data.data.journal.diary}</p>
        </div>
      `;
    }
    
    html += `</div>`;
  }

  // День 1
  if (data.data.day1) {
    html += `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #34495e; border-bottom: 2px solid #e74c3c; padding-bottom: 10px; font-size: 20px;">
          🌅 День 1 - Вопросы
        </h2>
    `;
    
    if (data.data.day1.q_where) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Где ты сейчас?</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c; white-space: pre-wrap;">${data.data.day1.q_where}</p>
        </div>
      `;
    }
    
    if (data.data.day1.q_protects) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Что тебя защищает?</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c; white-space: pre-wrap;">${data.data.day1.q_protects}</p>
        </div>
      `;
    }
    
    if (data.data.day1.q_inner_child) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Твой внутренний ребенок:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c; white-space: pre-wrap;">${data.data.day1.q_inner_child}</p>
        </div>
      `;
    }
    
    html += `</div>`;
  }

  // День 2
  if (data.data.day2) {
    html += `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #34495e; border-bottom: 2px solid #9b59b6; padding-bottom: 10px; font-size: 20px;">
          🌙 День 2 - Размышления
        </h2>
    `;
    
    if (data.data.day2.reflection) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Размышления:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #9b59b6; white-space: pre-wrap;">${data.data.day2.reflection}</p>
        </div>
      `;
    }
    
    if (data.data.day2.letter_shadow) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Письмо Тени:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #9b59b6; white-space: pre-wrap;">${data.data.day2.letter_shadow}</p>
        </div>
      `;
    }
    
    if (data.data.day2.letter_adult) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Ответ Взрослого:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #9b59b6; white-space: pre-wrap;">${data.data.day2.letter_adult}</p>
        </div>
      `;
    }
    
    html += `</div>`;
  }

  // День 3 - с названиями заданий
  if (data.data.day3) {
    html += `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #34495e; border-bottom: 2px solid #f39c12; padding-bottom: 10px; font-size: 20px;">
          🪞 День 3 - Ресурсы и Задания
        </h2>
    `;
    
    if (data.data.day3.resource) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Ресурс:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.resource}</p>
        </div>
      `;
    }
    
    if (data.data.day3.archetype_resource) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Ресурс Архетипа:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.archetype_resource}</p>
        </div>
      `;
    }
    
    // Получаем названия заданий из CSV
    try {
      const exercisesText = await getExercisesByPairNumber(42); // Используем пару 42 как пример
      if (exercisesText) {
        const exercises = exercisesText.split(/[•\-\*]/).filter(ex => ex.trim());
        
        if (data.data.day3.partner_1 && exercises[0]) {
          html += `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Задание 1: ${exercises[0].trim()}</h3>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.partner_1}</p>
            </div>
          `;
        }
        
        if (data.data.day3.partner_2 && exercises[1]) {
          html += `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Задание 2: ${exercises[1].trim()}</h3>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.partner_2}</p>
            </div>
          `;
        }
        
        if (data.data.day3.partner_3 && exercises[2]) {
          html += `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Задание 3: ${exercises[2].trim()}</h3>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.partner_3}</p>
            </div>
          `;
        }
      } else {
        // Fallback если не удалось получить названия заданий
        if (data.data.day3.partner_1) {
          html += `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Задание 1:</h3>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.partner_1}</p>
            </div>
          `;
        }
        
        if (data.data.day3.partner_2) {
          html += `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Задание 2:</h3>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.partner_2}</p>
            </div>
          `;
        }
        
        if (data.data.day3.partner_3) {
          html += `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Задание 3:</h3>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.partner_3}</p>
            </div>
          `;
        }
      }
    } catch (error) {
      console.error('Ошибка получения названий заданий:', error);
      // Fallback
      if (data.data.day3.partner_1) {
        html += `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Задание 1:</h3>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.partner_1}</p>
          </div>
        `;
      }
      
      if (data.data.day3.partner_2) {
        html += `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Задание 2:</h3>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.partner_2}</p>
          </div>
        `;
      }
      
      if (data.data.day3.partner_3) {
        html += `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Задание 3:</h3>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12; white-space: pre-wrap;">${data.data.day3.partner_3}</p>
          </div>
        `;
      }
    }
    
    html += `</div>`;
  }

  // День 4
  if (data.data.day4) {
    html += `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #34495e; border-bottom: 2px solid #27ae60; padding-bottom: 10px; font-size: 20px;">
          🏛️ День 4 - Интеграция
        </h2>
    `;
    
    if (data.data.day4.symbol) {
      html += createContentWithImage(data.data.day4.symbol, 'Символ', '#27ae60');
    }
    
    if (data.data.day4.offering) {
      html += createContentWithImage(data.data.day4.offering, 'Подношение', '#27ae60');
    }
    
    html += `</div>`;
  }

  // Общие данные
  if (data.data.general) {
    html += `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #34495e; border-bottom: 2px solid #95a5a6; padding-bottom: 10px; font-size: 20px;">
          📋 Общая информация
        </h2>
    `;
    
    if (data.data.general.intent) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Намерение:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #95a5a6; white-space: pre-wrap;">${data.data.general.intent}</p>
        </div>
      `;
    }
    
    // Прогресс
    const progress = [];
    if (data.data.general.day1_completed) progress.push('День 1');
    if (data.data.general.day2_completed) progress.push('День 2');
    if (data.data.general.day3_completed) progress.push('День 3');
    if (data.data.general.day4_completed) progress.push('День 4');
    
    if (progress.length > 0) {
      html += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; font-size: 16px; margin-bottom: 10px;">Завершенные дни:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #95a5a6;">${progress.join(', ')}</p>
        </div>
      `;
    }
    
    html += `</div>`;
  }

  html += `</div>`;
  
  return html;
}

// Функция для экспорта всех данных в PDF
export async function exportAllDataToPDF(): Promise<void> {
  try {
    // Получаем данные из localStorage
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

    await exportToPDF(data);
  } catch (error) {
    console.error('Ошибка экспорта в PDF:', error);
    throw new Error('Не удалось экспортировать данные в PDF');
  }
}
