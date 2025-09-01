import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');

  console.log('ThemeProvider: текущая тема из localStorage:', theme);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('Переключение темы с', theme, 'на', newTheme);
    setTheme(newTheme);
  };

  const handleSetTheme = (newTheme: Theme) => {
    console.log('Установка темы:', newTheme, 'текущая:', theme);
    setTheme(newTheme);
  };

  useEffect(() => {
    console.log('ThemeProvider useEffect: тема изменилась на:', theme);
    
    // Применяем тему к body для глобальных стилей
    document.body.className = theme;
    
    // Обновляем CSS переменные
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-primary', '#0f0f23');
      document.documentElement.style.setProperty('--bg-secondary', '#1a1a2e');
      document.documentElement.style.setProperty('--text-primary', '#f3f4f6');
      document.documentElement.style.setProperty('--text-secondary', '#d1d5db');
      document.documentElement.style.setProperty('--border-primary', 'rgba(216, 186, 144, 0.3)');
      document.documentElement.style.setProperty('--border-secondary', 'rgba(216, 186, 144, 0.2)');
      console.log('Установлены CSS переменные для темной темы');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#f8fafc');
      document.documentElement.style.setProperty('--bg-secondary', '#f1f5f9');
      document.documentElement.style.setProperty('--text-primary', '#1e293b');
      document.documentElement.style.setProperty('--text-secondary', '#475569');
      document.documentElement.style.setProperty('--border-primary', 'rgba(216, 186, 144, 0.5)');
      document.documentElement.style.setProperty('--border-secondary', 'rgba(216, 186, 144, 0.3)');
      console.log('Установлены CSS переменные для светлой темы');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
