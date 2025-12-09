import { useAuth } from '../contexts/AuthContext';
import './UserMenu.css';

export default function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="user-menu">
      <img
        src={user.avatar_url}
        alt={user.name || user.login}
        className="user-menu-avatar"
      />
      <span className="user-menu-name text-preset-6">
        {user.name || user.login}
      </span>
      <button
        onClick={logout}
        className="logout-button text-preset-7"
      >
        Logout
      </button>
    </div>
  );
}
