// Простой тест для useLocalStorage хука
console.log('Тестирование useLocalStorage...');

// Имитируем localStorage
const mockLocalStorage = {
  data: {},
  getItem(key) {
    console.log('getItem:', key, '=', this.data[key]);
    return this.data[key] || null;
  },
  setItem(key, value) {
    console.log('setItem:', key, '=', value);
    this.data[key] = value;
  }
};

// Имитируем window
global.window = {
  localStorage: mockLocalStorage
};

// Простая версия useState
function useState(initialValue) {
  let state = initialValue;
  const setState = (newValue) => {
    console.log('setState вызван с:', newValue);
    state = newValue;
    console.log('Новое состояние:', state);
  };
  return [state, setState];
}

// Простая версия useCallback
function useCallback(fn, deps) {
  return fn;
}

// Тестируем useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
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

  const setValue = useCallback((value) => {
    try {
      // Сначала обновляем состояние
      setStoredValue(value);
      
      // Затем сохраняем в localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
        console.log('Сохранено в localStorage:', key, '=', value);
      }
    } catch (error) {
      console.log('Ошибка сохранения в localStorage:', error);
    }
  }, [key]);

  return [storedValue, setValue];
}

// Тест
console.log('\n=== Тест 1: Установка начального значения ===');
const [theme, setTheme] = useLocalStorage('theme', 'dark');
console.log('Начальная тема:', theme);

console.log('\n=== Тест 2: Изменение на светлую тему ===');
setTheme('light');
console.log('Тема после setTheme("light"):', theme);

console.log('\n=== Тест 3: Изменение на темную тему ===');
setTheme('dark');
console.log('Тема после setTheme("dark"):', theme);

console.log('\n=== Содержимое localStorage ===');
console.log('localStorage.data:', mockLocalStorage.data);

