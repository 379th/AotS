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

export interface UserData {
  id: string;
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  currentDay: number;
  currentStep: string;
  progress: {
    day1: boolean;
    day2: boolean;
    day3: boolean;
    day4: boolean;
  };
  journal: any[];
  deck: {
    selectedCards: any[];
    completedReadings: number;
  };
  timers: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export class UserApi {
  private static getUserId(): string {
    // Получаем ID пользователя из Telegram WebApp или localStorage
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      return window.Telegram.WebApp.initDataUnsafe.user.id.toString();
    }
    
    // Fallback для разработки
    let userId = localStorage.getItem('shadow_quest_user_id');
    if (!userId) {
      userId = `dev_user_${Date.now()}`;
      localStorage.setItem('shadow_quest_user_id', userId);
    }
    return userId;
  }

  /**
   * Создает или обновляет пользователя в базе данных
   */
  static async createOrUpdateUser(): Promise<UserData | null> {
    try {
      const userId = this.getUserId();
      
      // Получаем данные пользователя из Telegram
      const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
      
      const response = await fetch(`${getApiBaseUrl()}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId: telegramUser?.id?.toString() || userId,
          username: telegramUser?.username,
          firstName: telegramUser?.first_name,
          lastName: telegramUser?.last_name
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create/update user: ${response.statusText}`);
      }

      const user = await response.json();
      console.log('User created/updated successfully:', user);
      return user;
    } catch (error) {
      console.error('Error creating/updating user:', error);
      return null;
    }
  }

  /**
   * Получает данные пользователя из базы данных
   */
  static async getUser(): Promise<UserData | null> {
    try {
      const userId = this.getUserId();
      const response = await fetch(`${getApiBaseUrl()}/api/users/${userId}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Пользователь не найден
        }
        throw new Error(`Failed to get user: ${response.statusText}`);
      }

      const user = await response.json();
      console.log('User loaded:', user);
      return user;
    } catch (error) {
      console.error('Error loading user:', error);
      return null;
    }
  }

  /**
   * Обновляет прогресс пользователя
   */
  static async updateProgress(progress: Partial<UserData>): Promise<UserData | null> {
    try {
      const userId = this.getUserId();
      const response = await fetch(`${getApiBaseUrl()}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progress)
      });

      if (!response.ok) {
        throw new Error(`Failed to update progress: ${response.statusText}`);
      }

      const user = await response.json();
      console.log('Progress updated:', user);
      return user;
    } catch (error) {
      console.error('Error updating progress:', error);
      return null;
    }
  }

  /**
   * Сохраняет текущий шаг пользователя
   */
  static async saveCurrentStep(step: string): Promise<void> {
    try {
      await this.updateProgress({ currentStep: step });
    } catch (error) {
      console.error('Error saving current step:', error);
    }
  }

  /**
   * Сохраняет текущий день пользователя
   */
  static async saveCurrentDay(day: number): Promise<void> {
    try {
      await this.updateProgress({ currentDay: day });
    } catch (error) {
      console.error('Error saving current day:', error);
    }
  }

  /**
   * Отмечает день как завершенный
   */
  static async markDayCompleted(day: number): Promise<void> {
    try {
      const user = await this.getUser();
      if (!user) return;

      const progress = { ...user.progress };
      progress[`day${day}` as keyof typeof progress] = true;

      await this.updateProgress({ progress });
    } catch (error) {
      console.error('Error marking day as completed:', error);
    }
  }
}
