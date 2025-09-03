import React, { createContext, useContext, useEffect } from 'react';
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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Применяем тему к body для глобальных стилей
    document.body.className = theme;
    
    // Обновляем CSS переменные
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-primary', '#1a0b2e'); // Темно-фиолетовый
      document.documentElement.style.setProperty('--bg-secondary', '#2d1b4e'); // Светло-фиолетовый
      document.documentElement.style.setProperty('--text-primary', '#ffffff'); // Белый
      document.documentElement.style.setProperty('--text-secondary', '#e2e8f0'); // Светло-белый
      document.documentElement.style.setProperty('--border-primary', 'rgba(255, 255, 255, 0.2)'); // Белые границы
      document.documentElement.style.setProperty('--border-secondary', 'rgba(255, 255, 255, 0.1)'); // Светлые белые границы
      console.log('Установлены CSS переменные для темной темы (фиолетовый)');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#e2d0b6'); // Светло-бежевый для основных блоков
      document.documentElement.style.setProperty('--bg-secondary', '#f7f0e6'); // Светло-бежевый для внутренних блоков
      document.documentElement.style.setProperty('--text-primary', '#5c4032'); // Темно-коричневый для основного текста
      document.documentElement.style.setProperty('--text-secondary', '#5c4032'); // Темно-коричневый для дополнительного текста
      document.documentElement.style.setProperty('--border-primary', 'rgba(92, 64, 50, 0.5)'); // Темно-коричневые границы
      document.documentElement.style.setProperty('--border-secondary', 'rgba(92, 64, 50, 0.3)'); // Светлые темно-коричневые границы
      console.log('Установлены CSS переменные для светлой темы: основные блоки #e2d0b6, текст #5c4032');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
