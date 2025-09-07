import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Проверяем доступность всех изображений в папке Sorce
const sorcePath = path.join(__dirname, 'public', 'Sorce');

function checkDirectory(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath);
  const results = {
    found: [],
    missing: [],
    total: 0
  };

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relativeItemPath = path.join(relativePath, item);
    
    if (fs.statSync(fullPath).isDirectory()) {
      const subResults = checkDirectory(fullPath, relativeItemPath);
      results.found.push(...subResults.found);
      results.missing.push(...subResults.missing);
      results.total += subResults.total;
    } else if (item.endsWith('.png') || item.endsWith('.jpg') || item.endsWith('.jpeg')) {
      results.found.push(relativeItemPath);
      results.total++;
    }
  }

  return results;
}

console.log('🔍 Проверка изображений в папке Sorce...\n');

const results = checkDirectory(sorcePath);

console.log(`✅ Найдено изображений: ${results.found.length}`);
console.log(`❌ Отсутствующих: ${results.missing.length}`);
console.log(`📊 Всего файлов: ${results.total}\n`);

if (results.found.length > 0) {
  console.log('📁 Найденные изображения:');
  results.found.forEach(img => console.log(`  ✓ ${img}`));
}

if (results.missing.length > 0) {
  console.log('\n❌ Отсутствующие изображения:');
  results.missing.forEach(img => console.log(`  ✗ ${img}`));
}

// Проверяем основные категории изображений
const categories = {
  'Кнопки': 'buttons',
  'Фоны': 'background', 
  'Экраны': 'first screens',
  'Навигация': 'navigation',
  'Панель навигации': 'navigation_panel',
  'Пары Тень/Архетип': 'shadow-archetype'
};

console.log('\n📋 Проверка по категориям:');
for (const [category, folder] of Object.entries(categories)) {
  const categoryPath = path.join(sorcePath, folder);
  if (fs.existsSync(categoryPath)) {
    const categoryResults = checkDirectory(categoryPath, folder);
    console.log(`  ${category}: ${categoryResults.found.length} изображений`);
  } else {
    console.log(`  ${category}: ❌ Папка не найдена`);
  }
}

console.log('\n🎯 Проверка завершена!');
