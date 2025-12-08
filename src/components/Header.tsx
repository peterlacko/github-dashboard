import ThemeToggle from './ThemeToggle';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo text-preset-1">devfinder</h1>
      <ThemeToggle />
    </header>
  );
}
