/**
 * Утилита для автоматической проверки адаптивности элементов
 */

export interface ResponsiveCheckResult {
  element: string;
  issues: ResponsiveIssue[];
  score: number; // 0-100
}

export interface ResponsiveIssue {
  type: 'missing-breakpoint' | 'fixed-size' | 'overflow-risk' | 'inconsistent-sizing';
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
  line?: number;
}

export interface ElementConfig {
  name: string;
  requiredBreakpoints: string[];
  maxWidth?: number;
  minWidth?: number;
  shouldBeResponsive: boolean;
  criticalForMobile: boolean;
}

// Конфигурация элементов для проверки
export const ELEMENT_CONFIGS: ElementConfig[] = [
  {
    name: 'main-content-block',
    requiredBreakpoints: ['sm:'],
    maxWidth: 521,
    shouldBeResponsive: true,
    criticalForMobile: true,
  },
  {
    name: 'title-bar',
    requiredBreakpoints: ['sm:'],
    maxWidth: 523,
    shouldBeResponsive: true,
    criticalForMobile: true,
  },
  {
    name: 'navigation-panel',
    requiredBreakpoints: ['sm:'],
    shouldBeResponsive: true,
    criticalForMobile: true,
  },
  {
    name: 'button',
    requiredBreakpoints: ['sm:', 'md:'],
    shouldBeResponsive: true,
    criticalForMobile: true,
  },
  {
    name: 'text',
    requiredBreakpoints: ['sm:', 'md:'],
    shouldBeResponsive: true,
    criticalForMobile: false,
  },
];

/**
 * Проверяет CSS классы на соответствие требованиям адаптивности
 */
export function checkResponsiveClasses(
  className: string,
  elementType: string,
  lineNumber?: number
): ResponsiveIssue[] {
  const issues: ResponsiveIssue[] = [];
  const config = ELEMENT_CONFIGS.find(c => c.name === elementType);
  
  if (!config) return issues;

  const classes = className.split(' ');

  // Проверка наличия базовых адаптивных классов
  if (config.shouldBeResponsive) {
    const hasWFull = classes.includes('w-full');
    const hasMaxW = classes.some(c => c.startsWith('max-w-'));
    const hasResponsiveBreakpoint = classes.some(c => 
      config.requiredBreakpoints.some(bp => c.startsWith(bp))
    );

    if (!hasWFull) {
      issues.push({
        type: 'missing-breakpoint',
        severity: 'error',
        message: `Элемент ${elementType} должен иметь w-full для базовой адаптивности`,
        suggestion: 'Добавьте класс w-full',
        line: lineNumber,
      });
    }

    if (!hasMaxW) {
      issues.push({
        type: 'missing-breakpoint',
        severity: 'warning',
        message: `Элемент ${elementType} должен иметь max-w-* для ограничения ширины`,
        suggestion: 'Добавьте класс max-w-[значение]',
        line: lineNumber,
      });
    }

    if (!hasResponsiveBreakpoint) {
      issues.push({
        type: 'missing-breakpoint',
        severity: 'error',
        message: `Элемент ${elementType} должен иметь адаптивные брейкпоинты`,
        suggestion: `Добавьте классы с префиксами: ${config.requiredBreakpoints.join(', ')}`,
        line: lineNumber,
      });
    }
  }

  // Проверка на фиксированные размеры без адаптивности
  const hasFixedWidth = classes.some(c => 
    c.match(/^w-\[?\d+/) && !c.includes('max-w-') && !c.includes('sm:') && !c.includes('md:')
  );
  
  if (hasFixedWidth && config.criticalForMobile) {
    issues.push({
      type: 'fixed-size',
      severity: 'error',
      message: `Элемент ${elementType} имеет фиксированную ширину без адаптивности`,
      suggestion: 'Замените фиксированную ширину на адаптивную (w-full max-w-[значение])',
      line: lineNumber,
    });
  }

  // Проверка на риск переполнения
  const hasOverflowRisk = classes.some(c => 
    c.includes('w-[90vw]') || c.includes('w-[95vw]') || c.includes('w-[100vw]')
  );
  
  if (hasOverflowRisk) {
    issues.push({
      type: 'overflow-risk',
      severity: 'warning',
      message: `Элемент ${elementType} может выходить за границы экрана`,
      suggestion: 'Используйте w-full max-w-[90vw] вместо w-[90vw]',
      line: lineNumber,
    });
  }

  return issues;
}

/**
 * Проверяет размеры шрифтов на адаптивность
 */
export function checkTextResponsiveness(
  className: string,
  elementType: string,
  lineNumber?: number
): ResponsiveIssue[] {
  const issues: ResponsiveIssue[] = [];
  const classes = className.split(' ');

  // Проверка на фиксированные размеры текста
  const hasFixedTextSize = classes.some(c => 
    c.match(/^text-\[?\d+/) && !c.includes('sm:') && !c.includes('md:') && !c.includes('lg:')
  );

  if (hasFixedTextSize && elementType === 'text') {
    issues.push({
      type: 'inconsistent-sizing',
      severity: 'warning',
      message: `Текст имеет фиксированный размер без адаптивности`,
      suggestion: 'Используйте адаптивные размеры: text-sm sm:text-base md:text-lg',
      line: lineNumber,
    });
  }

  return issues;
}

/**
 * Генерирует отчет о проверке адаптивности
 */
export function generateResponsiveReport(
  results: ResponsiveCheckResult[]
): string {
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  const errors = results.reduce((sum, r) => 
    sum + r.issues.filter(i => i.severity === 'error').length, 0
  );
  const warnings = results.reduce((sum, r) => 
    sum + r.issues.filter(i => i.severity === 'warning').length, 0
  );

  let report = `\n📱 ОТЧЕТ О ПРОВЕРКЕ АДАПТИВНОСТИ\n`;
  report += `=====================================\n`;
  report += `Всего элементов проверено: ${results.length}\n`;
  report += `Всего проблем: ${totalIssues} (Ошибки: ${errors}, Предупреждения: ${warnings})\n\n`;

  results.forEach(result => {
    if (result.issues.length > 0) {
      report += `🔍 ${result.element}:\n`;
      result.issues.forEach(issue => {
        const icon = issue.severity === 'error' ? '❌' : 
                    issue.severity === 'warning' ? '⚠️' : 'ℹ️';
        report += `  ${icon} ${issue.message}\n`;
        report += `     💡 ${issue.suggestion}\n`;
        if (issue.line) {
          report += `     📍 Строка: ${issue.line}\n`;
        }
        report += `\n`;
      });
    }
  });

  const avgScore = results.length > 0 ? 
    results.reduce((sum, r) => sum + r.score, 0) / results.length : 100;
  
  report += `📊 Общий балл адаптивности: ${avgScore.toFixed(1)}/100\n`;
  
  if (avgScore >= 90) {
    report += `✅ Отлично! Адаптивность на высоком уровне.\n`;
  } else if (avgScore >= 70) {
    report += `⚠️ Хорошо, но есть что улучшить.\n`;
  } else {
    report += `❌ Требуется серьезная доработка адаптивности.\n`;
  }

  return report;
}

/**
 * Проверяет файл на адаптивность
 */
export function checkFileResponsiveness(fileContent: string, fileName: string): ResponsiveCheckResult[] {
  const results: ResponsiveCheckResult[] = [];
  const lines = fileContent.split('\n');

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Поиск className атрибутов
    const classNameMatch = line.match(/className\s*=\s*["'`]([^"'`]+)["'`]/);
    if (classNameMatch) {
      const className = classNameMatch[1];
      
      // Определяем тип элемента по контексту
      let elementType = 'unknown';
      if (line.includes('TitleBar') || line.includes('title')) {
        elementType = 'title-bar';
      } else if (line.includes('Button') || line.includes('button')) {
        elementType = 'button';
      } else if (line.includes('content') || line.includes('block')) {
        elementType = 'main-content-block';
      } else if (line.includes('navigation') || line.includes('panel')) {
        elementType = 'navigation-panel';
      } else if (line.includes('text') || line.includes('p>') || line.includes('h1') || line.includes('h2')) {
        elementType = 'text';
      }

      const issues = [
        ...checkResponsiveClasses(className, elementType, lineNumber),
        ...checkTextResponsiveness(className, elementType, lineNumber),
      ];

      if (issues.length > 0) {
        results.push({
          element: `${fileName}:${lineNumber}`,
          issues,
          score: Math.max(0, 100 - (issues.length * 20)),
        });
      }
    }
  });

  return results;
}
