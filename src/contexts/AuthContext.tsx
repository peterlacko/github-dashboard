/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GitHubUser } from '../types/github';

interface AuthContextType {
  user: GitHubUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('github_token');
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(!!token);

  // Fetch user data when token exists
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData: GitHubUser = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Auth error:', error);
        // Token invalid, clear it
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (newToken: string) => {
    try {
      sessionStorage.setItem('github_token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Failed to save token:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem('github_token');
    } catch {
      // Ignore errors
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
