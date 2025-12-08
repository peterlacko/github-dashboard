import { useState } from 'react';
import type { GitHubUser } from '../types/github';

interface UseGitHubUserReturn {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
  searchUser: (username: string) => Promise<void>;
}

export function useGitHubUser(): UseGitHubUserReturn {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUser = async (username: string) => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('No results');
          setUser(null);
        } else if (response.status === 429) {
          setError('Too many requests, try again later');
          setUser(null);
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return;
      }

      const data: GitHubUser = await response.json();
      setUser(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, searchUser };
}
