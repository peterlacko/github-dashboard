/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GitHubUser } from '../types/github';

interface SearchContextType {
  searchedUser: GitHubUser | null;
  setSearchedUser: (user: GitHubUser | null) => void;
  clearSearchedUser: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchedUser, setSearchedUserState] = useState<GitHubUser | null>(() => {
    try {
      const stored = sessionStorage.getItem('searched_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Persist to sessionStorage when searchedUser changes
  useEffect(() => {
    try {
      if (searchedUser) {
        sessionStorage.setItem('searched_user', JSON.stringify(searchedUser));
      } else {
        sessionStorage.removeItem('searched_user');
      }
    } catch {
      // Ignore errors (e.g., private browsing mode)
    }
  }, [searchedUser]);

  const setSearchedUser = (user: GitHubUser | null) => {
    setSearchedUserState(user);
  };

  const clearSearchedUser = () => {
    setSearchedUserState(null);
  };

  return (
    <SearchContext.Provider value={{ searchedUser, setSearchedUser, clearSearchedUser }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}
