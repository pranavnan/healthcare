'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get('/api/users/currentuser');
        setCurrentUser(data.currentUser);
      } catch (err) {
        console.error('Failed to fetch current user', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/users/signin', { email, password });
      setCurrentUser(response.data);
    } catch (err) {
      console.error('Signin error', err);
      throw err;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/users/signup', { email, password });
      setCurrentUser(response.data);
    } catch (err) {
      console.error('Signup error', err);
      throw err;
    }
  };

  const signout = async () => {
    try {
      await axios.post('/api/users/signout');
      setCurrentUser(null);
    } catch (err) {
      console.error('Signout error', err);
      throw err;
    }
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    signin,
    signup,
    signout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 