import { useAuth } from '../contexts/AuthContext';
import { useGitHubUser } from '../hooks/useGitHubUser';
import SearchBar from '../components/SearchBar';
import UserProfile from '../components/UserProfile';
import EmptyState from '../components/EmptyState';
import LoginButton from '../components/LoginButton';
import './HomePage.css';

export default function HomePage() {
  const { user: authUser } = useAuth();
  const { user, loading, error, searchUser } = useGitHubUser();

  return (
    <div className="home-page">
      <SearchBar
        onSearch={searchUser}
        loading={loading}
        error={error}
      />

      {!authUser && (
        <div className="login-prompt">
          <LoginButton />
          <p className="login-prompt-text text-preset-6">
            Sign in to access your dashboard and view your repositories
          </p>
        </div>
      )}

      {user && <UserProfile user={user} />}

      {!user && !loading && !error && (
        <EmptyState message="Search for a GitHub user to get started" />
      )}
    </div>
  );
}
