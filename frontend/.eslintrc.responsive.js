/**
 * ESLint конфигурация для проверки адаптивности Tailwind CSS классов
 */

module.exports = {
  plugins: ['tailwindcss'],
  extends: [
    'plugin:tailwindcss/recommended'
  ],
  rules: {
    // Проверка адаптивных классов
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/no-custom-classname': 'off',
    
    // Кастомные правила для адаптивности
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value*="w-["]',
        message: 'Используйте адаптивные классы вместо фиксированных размеров. Например: w-full max-w-[значение] sm:w-[значение]'
      },
      {
        selector: 'Literal[value*="h-["]',
        message: 'Используйте адаптивные классы для высоты. Например: h-auto sm:h-[значение]'
      },
      {
        selector: 'Literal[value*="text-["]',
        message: 'Используйте адаптивные размеры текста. Например: text-sm sm:text-base md:text-lg'
      }
    ]
  },
  
  // Настройки для Tailwind CSS
  settings: {
    tailwindcss: {
      config: './tailwind.config.js',
      callees: ['cn', 'cva', 'clsx'],
      classRegex: '^class(Name)?$'
    }
  }
};
