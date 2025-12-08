import type { GitHubUser } from '../types/github';
import { formatJoinDate } from '../utils/formatDate';
import UserStats from './UserStats';
import UserLinks from './UserLinks';
import './UserProfile.css';

interface UserProfileProps {
  user: GitHubUser;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <article className="user-profile">
      <img
        src={user.avatar_url}
        alt={user.name || user.login}
        className="user-avatar"
      />

      <div className="user-info">
        <div className="user-header">
          <div>
            <h1 className="user-name text-preset-2">{user.name || user.login}</h1>
            <p className="user-username text-preset-4">@{user.login}</p>
          </div>
          <p className="user-join-date text-preset-7">{formatJoinDate(user.created_at)}</p>
        </div>

        <p className="user-bio text-preset-4">
          {user.bio || <span className="user-bio-empty">This profile has no bio</span>}
        </p>

        <UserStats user={user} />
        <UserLinks user={user} />
      </div>
    </article>
  );
}
