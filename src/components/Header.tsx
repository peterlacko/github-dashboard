import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <h1 className="logo text-preset-1">devfinder</h1>
      <div className="header-actions">
        {user && <UserMenu />}
        <ThemeToggle />
      </div>
    </header>
  );
}
