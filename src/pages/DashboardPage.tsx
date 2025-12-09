import { useAuth } from '../contexts/AuthContext';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import UserProfile from '../components/UserProfile';
import RepoCard from '../components/RepoCard';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const { repos, loading, error } = useGitHubRepos(token, user?.login || null);

  return (
    <div className="dashboard-page">
      {user && <UserProfile user={user} />}

      <section className="repos-section">
        <h2 className="repos-title text-preset-2">Top 10 Public Repositories</h2>

        {loading && (
          <p className="repos-message text-preset-4">Loading repositories...</p>
        )}

        {error && (
          <p className="repos-message error text-preset-4">{error}</p>
        )}

        {!loading && !error && repos.length === 0 && (
          <p className="repos-message text-preset-4">No public repositories found.</p>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="repos-grid">
            {repos.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
