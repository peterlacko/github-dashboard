import { Link } from 'react-router-dom';
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

      {user && (
        <>
          <UserProfile user={user} />
          {authUser && (
            <div className="dashboard-link-container">
              <Link to="/dashboard" className="dashboard-link text-preset-5">
                Go to My Dashboard →
              </Link>
            </div>
          )}
        </>
      )}

      {!user && !loading && !error && authUser && (
        <div className="dashboard-prompt">
          <Link to="/dashboard" className="dashboard-link-button text-preset-5">
            Go to My Dashboard
          </Link>
          <p className="dashboard-prompt-text text-preset-6">
            View your profile and repositories
          </p>
        </div>
      )}

      {!user && !loading && !error && !authUser && (
        <EmptyState message="Search for a GitHub user to get started" />
      )}
    </div>
  );
}
