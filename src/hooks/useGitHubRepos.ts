import { useState, useEffect } from 'react';
import type { GitHubRepo } from '../types/github';

interface UseGitHubReposReturn {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

export function useGitHubRepos(token: string | null, username: string | null): UseGitHubReposReturn {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !username) {
      setRepos([]);
      return;
    }

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=public`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('User not found');
          }
          if (response.status === 403) {
            throw new Error('Rate limit exceeded');
          }
          throw new Error(`Failed to fetch repositories: ${response.status}`);
        }

        const data: GitHubRepo[] = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load repositories');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [token, username]);

  return { repos, loading, error };
}
