const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface UserData {
  id: string;
  telegramId?: string;
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
  journal: string[];
  deck: {
    selectedCards: string[];
    completedReadings: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User management
  async createUser(userData: Partial<UserData>): Promise<UserData> {
    return this.request<UserData>('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUser(userId: string): Promise<UserData> {
    return this.request<UserData>(`/api/users/${userId}`);
  }

  async updateUser(userId: string, updates: Partial<UserData>): Promise<UserData> {
    return this.request<UserData>(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Progress management
  async updateProgress(userId: string, day: number, completed: boolean): Promise<UserData> {
    return this.request<UserData>(`/api/users/${userId}/progress`, {
      method: 'POST',
      body: JSON.stringify({ day, completed }),
    });
  }

  // Journal management
  async addJournalEntry(userId: string, entry: string): Promise<UserData> {
    return this.request<UserData>(`/api/users/${userId}/journal`, {
      method: 'POST',
      body: JSON.stringify({ entry }),
    });
  }

  // Deck management
  async updateDeck(userId: string, selectedCards: string[]): Promise<UserData> {
    return this.request<UserData>(`/api/users/${userId}/deck`, {
      method: 'POST',
      body: JSON.stringify({ selectedCards }),
    });
  }

  // Session management
  async createSession(telegramId: string): Promise<{ sessionId: string }> {
    return this.request<{ sessionId: string }>('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({ telegramId }),
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

export const apiService = new ApiService();
