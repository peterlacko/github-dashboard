import type { GitHubRepo } from '../types/github';
import './RepoCard.css';

interface RepoCardProps {
  repo: GitHubRepo;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className="repo-card">
      <div className="repo-header">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-name text-preset-3"
        >
          {repo.name}
        </a>
        <div className="repo-stars">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          <span className="text-preset-7">{repo.stargazers_count.toLocaleString()}</span>
        </div>
      </div>

      {repo.description ? (
        <p className="repo-description text-preset-6">{repo.description}</p>
      ) : (
        <p className="repo-description repo-no-description text-preset-6">
          No description provided
        </p>
      )}

      <div className="repo-meta">
        {repo.language && (
          <span className="repo-language text-preset-7">
            <span className="language-dot" aria-hidden="true"></span>
            {repo.language}
          </span>
        )}
        <span className="repo-updated text-preset-7">
          Updated {formatRelativeTime(repo.updated_at)}
        </span>
      </div>
    </article>
  );
}
