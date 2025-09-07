import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      // Если value - это функция, вызываем её с текущим значением
      const newValue = typeof value === 'function' ? (value as (prev: T) => T)(storedValue) : value;
      
      // Сначала обновляем состояние
      setStoredValue(newValue);
      
      // Затем сохраняем в localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
    } catch (error) {
      // Ошибка сохранения в localStorage
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
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      // Сначала обновляем состояние
      setStoredValue(value);
      
      // Затем сохраняем в localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      // Ошибка сохранения строки в localStorage
    }
  };

  return [storedValue, setValue];
}
