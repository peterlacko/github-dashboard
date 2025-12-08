import { useState } from 'react';
import type { FormEvent } from 'react';
import { SearchIcon } from './icons';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading: boolean;
  error: string | null;
}

export default function SearchBar({ onSearch, loading, error }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input-wrapper">
        <SearchIcon className="search-icon" />

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search GitHub username..."
          className="search-input text-preset-4"
          disabled={loading}
        />

        {error && <span className="error-message text-preset-5">{error}</span>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="search-button text-preset-5"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
