import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../config/firebase';

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

export class UserService {
  private static collectionName = 'users';

  static async createUser(userData: Partial<UserData>): Promise<UserData> {
    const now = new Date();
    const user: UserData = {
      id: userData.id || '',
      telegramId: userData.telegramId,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      currentDay: userData.currentDay || 1,
      currentStep: userData.currentStep || 'intro',
      progress: {
        day1: false,
        day2: false,
        day3: false,
        day4: false,
        ...userData.progress
      },
      journal: userData.journal || [],
      deck: {
        selectedCards: [],
        completedReadings: 0,
        ...userData.deck
      },
      createdAt: now,
      updatedAt: now
    };

    await setDoc(doc(db, this.collectionName, user.id), user);
    return user;
  }

  static async getUser(userId: string): Promise<UserData | null> {
    try {
      const docRef = doc(db, this.collectionName, userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as UserData;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  static async getUserByTelegramId(telegramId: string): Promise<UserData | null> {
    try {
      const q = query(
        collection(db, this.collectionName), 
        where('telegramId', '==', telegramId)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data() as UserData;
      }
      return null;
    } catch (error) {
      console.error('Error getting user by telegram ID:', error);
      return null;
    }
  }

  static async updateUser(userId: string, updates: Partial<UserData>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, userId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async updateProgress(userId: string, day: number, completed: boolean): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, userId);
      await updateDoc(docRef, {
        [`progress.day${day}`]: completed,
        currentDay: Math.max(day + 1, 1),
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }

  static async addJournalEntry(userId: string, entry: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, userId);
      await updateDoc(docRef, {
        journal: [...(await this.getUser(userId))?.journal || [], entry],
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error adding journal entry:', error);
      throw error;
    }
  }

  static async updateDeck(userId: string, selectedCards: string[]): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, userId);
      await updateDoc(docRef, {
        'deck.selectedCards': selectedCards,
        'deck.completedReadings': (await this.getUser(userId))?.deck.completedReadings + 1 || 1,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating deck:', error);
      throw error;
    }
  }
}
