// Определяем базовый URL API в зависимости от окружения
const getApiBaseUrl = () => {
  // Проверяем, находимся ли мы в Telegram WebApp
  const isTelegramWebApp = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  
  if (isTelegramWebApp) {
    // В Telegram WebApp используем относительный путь
    return import.meta.env.VITE_API_URL || '';
  }
  
  // Для локальной разработки
  return import.meta.env.VITE_API_URL || 'http://localhost:4000';
};

export interface TimerData {
  startTime: number;
  lastUpdated: number;
}

// Типы Telegram WebApp уже объявлены в utils/telegram.ts

export class TimerApi {
  private static getUserId(): string {
    // Получаем ID пользователя из Telegram WebApp
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      return window.Telegram.WebApp.initDataUnsafe.user.id.toString();
    }
    
    // Fallback только для локальной разработки (не в продакшене)
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    if (!isProduction) {
      let userId = localStorage.getItem('shadow_quest_user_id');
      if (!userId) {
        userId = `dev_user_${Date.now()}`;
        localStorage.setItem('shadow_quest_user_id', userId);
      }
      return userId;
    }
    
    // В продакшене без Telegram WebApp - возвращаем ошибку
    throw new Error('Telegram WebApp не инициализирован');
  }

  static async saveTimer(dayNumber: number, startTime: number): Promise<void> {
    try {
      const userId = this.getUserId();
      const response = await fetch(`${getApiBaseUrl()}/api/users/${userId}/timer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dayNumber,
          startTime
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to save timer: ${response.statusText}`);
      }

      console.log(`Timer saved for day ${dayNumber}:`, { startTime });
    } catch (error) {
      console.error('Error saving timer:', error);
      // Не выбрасываем ошибку, чтобы приложение продолжало работать
      // даже если сервер недоступен
    }
  }

  static async loadTimer(dayNumber: number): Promise<TimerData | null> {
    try {
      const userId = this.getUserId();
      const response = await fetch(`${getApiBaseUrl()}/api/users/${userId}/timer/${dayNumber}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Таймер не найден
        }
        throw new Error(`Failed to load timer: ${response.statusText}`);
      }

      const timerData = await response.json();
      console.log(`Timer loaded for day ${dayNumber}:`, timerData);
      return timerData;
    } catch (error) {
      console.error('Error loading timer:', error);
      return null; // Возвращаем null при ошибке
    }
  }

  static async createUser(): Promise<string> {
    try {
      const userId = this.getUserId();
      
      // Получаем данные пользователя из Telegram
      const userData = window.Telegram?.WebApp?.initDataUnsafe?.user;
      
      const response = await fetch(`${getApiBaseUrl()}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId: userData?.id?.toString(),
          username: userData?.username,
          firstName: userData?.first_name,
          lastName: userData?.last_name
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.statusText}`);
      }

      const user = await response.json();
      console.log('User created/updated:', user);
      return userId;
    } catch (error) {
      console.error('Error creating user:', error);
      return this.getUserId(); // Возвращаем ID даже при ошибке
    }
  }
}
