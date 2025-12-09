import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSearch } from "../contexts/SearchContext";
import { useGitHubRepos } from "../hooks/useGitHubRepos";
import { useGitHubUser } from "../hooks/useGitHubUser";
import SearchBar from "../components/SearchBar";
import UserProfile from "../components/UserProfile";
import RepoCard from "../components/RepoCard";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { token } = useAuth();
  const { searchedUser } = useSearch();
  const {
    user: localSearchedUser,
    loading: searchLoading,
    error: searchError,
    searchUser,
  } = useGitHubUser();
  const {
    repos,
    loading: reposLoading,
    error: reposError,
  } = useGitHubRepos(token, searchedUser?.login || null);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <SearchBar
          onSearch={searchUser}
          loading={searchLoading}
          error={searchError}
        />
      </div>

      {searchedUser && (
        <div className="dashboard-search-result">
          <UserProfile user={searchedUser} />
        </div>
      )}

      <section className="repos-section">
        <h2 className="repos-title text-preset-2">
          Top 10 Public Repositories
        </h2>

        {reposLoading && (
          <p className="repos-message text-preset-4">Loading repositories...</p>
        )}

        {reposError && (
          <p className="repos-message error text-preset-4">{reposError}</p>
        )}

        {!reposLoading && !reposError && repos.length === 0 && (
          <p className="repos-message text-preset-4">
            No public repositories found.
          </p>
        )}

        {!reposLoading && !reposError && repos.length > 0 && (
          <div className="repos-grid">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
