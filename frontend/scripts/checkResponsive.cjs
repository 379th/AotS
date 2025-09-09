#!/usr/bin/env node

/**
 * Скрипт для автоматической проверки адаптивности всех компонентов
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Импортируем утилиты проверки (используем require для Node.js)
const { 
  checkFileResponsiveness, 
  generateResponsiveReport 
} = require('../src/utils/responsiveChecker.ts');

/**
 * Рекурсивно находит все .tsx файлы в директории
 */
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') && !file.includes('.test.') && !file.includes('.spec.')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Основная функция проверки
 */
function checkAllFiles() {
  console.log('🔍 Начинаем проверку адаптивности...\n');
  
  const srcDir = path.join(__dirname, '../src');
  const tsxFiles = findTsxFiles(srcDir);
  
  console.log(`Найдено ${tsxFiles.length} файлов для проверки:\n`);
  tsxFiles.forEach(file => {
    console.log(`  📄 ${path.relative(srcDir, file)}`);
  });
  console.log('');
  
  const allResults = [];
  
  tsxFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const fileName = path.relative(srcDir, filePath);
      const results = checkFileResponsiveness(content, fileName);
      allResults.push(...results);
    } catch (error) {
      console.error(`❌ Ошибка при чтении файла ${filePath}:`, error.message);
    }
  });
  
  // Генерируем отчет
  const report = generateResponsiveReport(allResults);
  console.log(report);
  
  // Сохраняем отчет в файл
  const reportPath = path.join(__dirname, '../responsive-report.txt');
  fs.writeFileSync(reportPath, report);
  console.log(`📄 Отчет сохранен в: ${reportPath}`);
  
  // Возвращаем код выхода
  const hasErrors = allResults.some(r => 
    r.issues.some(i => i.severity === 'error')
  );
  
  return hasErrors ? 1 : 0;
}

/**
 * Проверяет конкретный файл
 */
function checkSingleFile(filePath) {
  console.log(`🔍 Проверяем файл: ${filePath}\n`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    const results = checkFileResponsiveness(content, fileName);
    
    const report = generateResponsiveReport(results);
    console.log(report);
    
    const hasErrors = results.some(r => 
      r.issues.some(i => i.severity === 'error')
    );
    
    return hasErrors ? 1 : 0;
  } catch (error) {
    console.error(`❌ Ошибка при чтении файла:`, error.message);
    return 1;
  }
}

// Обработка аргументов командной строки
const args = process.argv.slice(2);

if (args.length === 0) {
  // Проверяем все файлы
  process.exit(checkAllFiles());
} else if (args[0] === '--file' && args[1]) {
  // Проверяем конкретный файл
  process.exit(checkSingleFile(args[1]));
} else if (args[0] === '--help') {
  console.log(`
📱 Скрипт проверки адаптивности

Использование:
  node checkResponsive.js                    # Проверить все .tsx файлы
  node checkResponsive.js --file <путь>      # Проверить конкретный файл
  node checkResponsive.js --help             # Показать эту справку

Примеры:
  node checkResponsive.js
  node checkResponsive.js --file src/screens/IntroScreen.tsx
  `);
  process.exit(0);
} else {
  console.error('❌ Неизвестные аргументы. Используйте --help для справки.');
  process.exit(1);
}
