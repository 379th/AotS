import { useState, useEffect } from 'react';
import { apiService, UserData } from '../services/apiService';

export function useUser(userId?: string) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await apiService.getUser(userId);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const updateUser = async (updates: Partial<UserData>) => {
    if (!userId) return;

    try {
      setError(null);
      await apiService.updateUser(userId, updates);
      setUser(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    }
  };

  const updateProgress = async (day: number, completed: boolean) => {
    if (!userId) return;

    try {
      setError(null);
      await apiService.updateProgress(userId, day, completed);
      setUser(prev => prev ? {
        ...prev,
        progress: { ...prev.progress, [`day${day}`]: completed },
        currentDay: Math.max(day + 1, 1),
        updatedAt: new Date()
      } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
      throw err;
    }
  };

  const addJournalEntry = async (entry: string) => {
    if (!userId) return;

    try {
      setError(null);
      await apiService.addJournalEntry(userId, entry);
      setUser(prev => prev ? {
        ...prev,
        journal: [...prev.journal, entry],
        updatedAt: new Date()
      } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add journal entry');
      throw err;
    }
  };

  const updateDeck = async (selectedCards: string[]) => {
    if (!userId) return;

    try {
      setError(null);
      await apiService.updateDeck(userId, selectedCards);
      setUser(prev => prev ? {
        ...prev,
        deck: {
          ...prev.deck,
          selectedCards,
          completedReadings: prev.deck.completedReadings + 1
        },
        updatedAt: new Date()
      } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update deck');
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    updateUser,
    updateProgress,
    addJournalEntry,
    updateDeck
  };
}
