import { useTheme } from '../contexts/ThemeContext';
import { MoonIcon, SunIcon } from './icons';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      type="button"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      <span className="text-preset-7" style={{ marginLeft: '16px' }}>
        {theme === 'light' ? 'DARK' : 'LIGHT'}
      </span>
    </button>
  );
}
