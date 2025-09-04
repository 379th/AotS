import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log('Ошибка чтения из localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      console.log('useLocalStorage: установка значения', key, '=', value);
      
      // Сначала обновляем состояние
      setStoredValue(value);
      
      // Затем сохраняем в localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
        console.log('useLocalStorage: сохранено в localStorage', key, '=', value);
      }
    } catch (error) {
      console.log('Ошибка сохранения в localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

export function useLocalStorageString(key: string, initialValue: string = ""): [string, (value: string) => void] {
  const [storedValue, setStoredValue] = useState<string>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.log('Ошибка чтения строки из localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      console.log('useLocalStorageString: установка значения', key, '=', value);
      
      // Сначала обновляем состояние
      setStoredValue(value);
      
      // Затем сохраняем в localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value);
        console.log('useLocalStorageString: сохранено в localStorage', key, '=', value);
      }
    } catch (error) {
      console.log('Ошибка сохранения строки в localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
