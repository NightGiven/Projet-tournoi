import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User, UserRole } from '@/types';
import { Platform } from 'react-native';

// Mock user data (replace with actual API integration)
const MOCK_USERS = [
  {
    id: '1',
    username: 'player1',
    email: 'player@example.com',
    password: 'password123',
    role: 'player' as UserRole,
    avatar: 'https://i.pravatar.cc/150?img=1',
    teams: [],
    createdAt: new Date(),
  },
  {
    id: '2',
    username: 'teammanager',
    email: 'team@example.com',
    password: 'password123',
    role: 'team_manager' as UserRole,
    avatar: 'https://i.pravatar.cc/150?img=2',
    teams: ['1'],
    createdAt: new Date(),
  },
  {
    id: '3',
    username: 'organizer1',
    email: 'organizer@example.com',
    password: 'password123',
    role: 'organizer' as UserRole,
    avatar: 'https://i.pravatar.cc/150?img=3',
    teams: [],
    createdAt: new Date(),
  },
  {
    id: '4',
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin' as UserRole,
    avatar: 'https://i.pravatar.cc/150?img=4',
    teams: [],
    createdAt: new Date(),
  },
];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (username: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  getUserRole: () => UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const storeAuthData = async (user: User) => {
  // On web, use localStorage as a fallback
  if (Platform.OS === 'web') {
    localStorage.setItem('user', JSON.stringify(user));
    return;
  }
  
  try {
    await SecureStore.setItemAsync('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error storing auth data:', error);
  }
};

const getAuthData = async (): Promise<User | null> => {
  // On web, use localStorage as a fallback
  if (Platform.OS === 'web') {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  
  try {
    const userData = await SecureStore.getItemAsync('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving auth data:', error);
    return null;
  }
};

const removeAuthData = async () => {
  // On web, use localStorage as a fallback
  if (Platform.OS === 'web') {
    localStorage.removeItem('user');
    return;
  }
  
  try {
    await SecureStore.deleteItemAsync('user');
  } catch (error) {
    console.error('Error removing auth data:', error);
  }
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const loadUser = async () => {
      const userData = await getAuthData();
      setUser(userData);
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication (replace with actual API call)
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Remove password before storing
      const { password, ...userWithoutPassword } = user;
      const userData = userWithoutPassword as User;
      
      await storeAuthData(userData);
      setUser(userData);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signUp = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user (in a real app, this would be an API call)
    const newUser: User = {
      id: (MOCK_USERS.length + 1).toString(),
      username,
      email,
      role: 'player',
      teams: [],
      createdAt: new Date(),
    };
    
    // In a real app, you would save this user to your database
    MOCK_USERS.push({ ...newUser, password });
    
    await storeAuthData(newUser);
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const signOut = async () => {
    await removeAuthData();
    setUser(null);
  };

  const getUserRole = (): UserRole | null => {
    return user?.role || null;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, getUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};