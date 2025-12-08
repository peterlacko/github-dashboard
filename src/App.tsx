import { useGitHubUser } from './hooks/useGitHubUser';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import EmptyState from './components/EmptyState';
import './styles/index.css';
import './App.css';

function App() {
  const { user, loading, error, searchUser } = useGitHubUser();

  return (
    <div className="app">
      <div className="container">
        <Header />
        <main>
          <SearchBar
            onSearch={searchUser}
            loading={loading}
            error={error}
          />
          {user && <UserProfile user={user} />}
          {!user && !loading && !error && (
            <EmptyState message="Search for a GitHub user to get started" />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
