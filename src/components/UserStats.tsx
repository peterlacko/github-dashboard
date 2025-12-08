import type { GitHubUser } from '../types/github';
import './UserStats.css';

interface UserStatsProps {
  user: GitHubUser;
}

export default function UserStats({ user }: UserStatsProps) {
  return (
    <div className="user-stats">
      <div className="stat-item">
        <p className="stat-label text-preset-7">Repos</p>
        <p className="stat-value text-preset-2">{user.public_repos}</p>
      </div>
      <div className="stat-item">
        <p className="stat-label text-preset-7">Followers</p>
        <p className="stat-value text-preset-2">{user.followers}</p>
      </div>
      <div className="stat-item">
        <p className="stat-label text-preset-7">Following</p>
        <p className="stat-value text-preset-2">{user.following}</p>
      </div>
    </div>
  );
}
