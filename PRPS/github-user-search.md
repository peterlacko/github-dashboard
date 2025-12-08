# PRP: GitHub User Search Dashboard

## Feature Overview

Implement a GitHub user search application that allows users to search for GitHub profiles by username and display comprehensive user information. The application includes:

- Logo and search interface
- User profile display with avatar, bio, stats, and metadata
- "User not found" error state
- Light/Dark mode toggle with localStorage persistence
- Responsive design (mobile and desktop)
- Integration with GitHub REST API

## Codebase Context

### Technology Stack
- **React**: 19.2.0 (using automatic JSX runtime)
- **TypeScript**: 5.9.3 (strict mode enabled)
- **Vite**: 7.2.4 (for build and dev server)
- **CSS**: Plain CSS with CSS Custom Properties (NO Tailwind, NO CSS-in-JS)

### Project Structure
```
src/
  ├── App.tsx              (Current: minimal "Hello World" component)
  ├── main.tsx             (Entry point with StrictMode)
  ├── styles/              (Existing design system)
  │   ├── index.css        (Main entry, imports all token files)
  │   ├── colors.css       (Color palette and semantic tokens)
  │   ├── typography.css   (Space Mono font, 8 text presets)
  │   ├── spacing.css      (14-step spacing scale)
  │   └── radius.css       (10-step radius scale)
  └── components/          (To be created)
```

### Existing Design System (CRITICAL - MUST USE)

#### Colors (`src/styles/colors.css`)
The project has pre-defined color tokens that MUST be extended for dark mode:

**Light Mode (Existing):**
```css
--color-neutral-0: #ffffff;
--color-neutral-100: #f6f8ff;
--color-neutral-200: #90a4d4;
--color-neutral-300: #697c9a;
--color-neutral-500: #4b6a9b;
--color-neutral-700: #2b3442;
--color-neutral-800: #1e2a47;
--color-neutral-900: #141d2f;
--color-blue-300: #60abff;
--color-blue-500: #0079ff;
--color-red-500: #f74646;

/* Semantic aliases */
--color-background: var(--color-neutral-100);
--color-surface: var(--color-neutral-0);
--color-primary: var(--color-blue-500);
--color-primary-hover: var(--color-blue-300);
--color-error: var(--color-red-500);
--color-text-primary: var(--color-neutral-900);
--color-text-secondary: var(--color-neutral-500);
--color-text-tertiary: var(--color-neutral-300);
```

**Dark Mode Colors (To be added based on Figma):**
From Figma screenshot analysis, dark mode has a dark blue background (#141d2f or similar). You'll need to add a `[data-theme="dark"]` selector with overrides for semantic tokens.

#### Typography (`src/styles/typography.css`)
**Font**: Space Mono (400, 700) - already imported from Google Fonts

**Available Text Presets** (Use these via CSS classes or CSS variables):
- `.text-preset-1`: 26px bold, 1.2 line-height (main headings)
- `.text-preset-2`: 22px bold, 1.4 line-height (subheadings)
- `.text-preset-3`: 18px regular, 1.4 line-height (13px on mobile)
- `.text-preset-4`: 16px regular, 1.5 line-height (body text)
- `.text-preset-5`: 16px bold, 1.5 line-height (emphasized body)
- `.text-preset-6`: 15px regular, 1.5 line-height
- `.text-preset-7`: 13px regular, 1.5 line-height (small text)
- `.text-preset-8`: 13px bold, 1.4 line-height, 2.5px letter-spacing (labels)

#### Spacing (`src/styles/spacing.css`)
Available spacing tokens: `--spacing-0` through `--spacing-1000`
Common values: 8px, 16px, 24px, 32px, 40px, 48px, 64px, 80px

#### Border Radius (`src/styles/radius.css`)
Available radius tokens: `--radius-0` through `--radius-24`, `--radius-full`
Suggested usage: `--radius-10` for cards, `--radius-8` for buttons, `--radius-full` for circular elements

## External API Documentation

### GitHub REST API - Get a User

**Endpoint:** `GET https://api.github.com/users/{username}`

**Official Documentation:** https://docs.github.com/en/rest/users/users

**No Authentication Required** for public user data (which is what we need).

**Example Response** (provided in INITIAL_part1.md):
```json
{
  "login": "peterlacko",
  "avatar_url": "https://avatars.githubusercontent.com/u/7295540?v=4",
  "name": "Peter Lacko",
  "bio": "React developer with interest in FE technologies and AI.",
  "location": "Slovakia",
  "blog": "https://github.com/peterlacko",
  "public_repos": 22,
  "followers": 3,
  "following": 1,
  "created_at": "2014-04-14T21:58:34Z"
}
```

**Fields to Display:**
- `avatar_url` - User's profile picture
- `name` - Full name (fallback to `login` if null)
- `login` - Username (GitHub handle)
- `bio` - User biography
- `location` - Location string
- `blog` - Personal website URL
- `public_repos` - Number of public repositories
- `followers` - Number of followers
- `following` - Number of following
- `created_at` - Account creation date (format as "Joined {Month} {Year}")

**404 Error Response:**
When a user is not found, the API returns a 404 status with a JSON body like:
```json
{
  "message": "Not Found",
  "documentation_url": "..."
}
```

**Error Handling Best Practices:**
- Check `response.ok` before parsing JSON (fetch doesn't reject on HTTP errors)
- Handle network errors (try/catch)
- Validate response structure with TypeScript types
- Display user-friendly error messages

**References:**
- https://docs.github.com/en/rest/users/users
- https://gist.github.com/odewahn/5a5eeb23279eed6a80d7798fdb47fe91 (Fetch error handling)

## Design References (Figma)

**Light Mode Search Bar:**
- URL: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-351
- Design shows: White/light blue background, blue primary button, search icon, "No results" error text in red

**Dark Mode Search Bar:**
- URL: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-587
- Design shows: Dark navy background (#141d2f or similar), same blue button, lighter text

**Icons:**
- URL: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-134
- Icons visible: moon (dark mode), sun (light mode), search, Twitter/X, location pin, link, building

**Logo:**
- URL: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=3-994
- Logo text: "devfinder"

**From Screenshots:**
- Search bar has rounded corners (use `--radius-10` or `--radius-8`)
- Blue button with white text (use `--color-primary` and `--color-primary-hover`)
- Error message "No results" displayed in red next to search button
- Input placeholder: "Search GitHub username..."
- Search icon appears on the left inside the input
- Focus state shows blue border

## Implementation Blueprint

### Component Architecture

```
App (Theme Provider)
├── Header
│   ├── Logo ("devfinder" text)
│   └── ThemeToggle (sun/moon icon button)
├── SearchBar
│   ├── SearchIcon
│   ├── Input
│   ├── ErrorMessage (conditional)
│   └── SearchButton
└── UserProfile (conditional rendering)
    ├── UserAvatar
    ├── UserInfo
    │   ├── Name & Username
    │   ├── JoinDate
    │   └── Bio
    ├── UserLinks
    │   ├── LocationLink
    │   ├── BlogLink
    │   ├── TwitterLink (if available)
    │   └── CompanyLink (if available)
    └── UserStats
        ├── ReposCount
        ├── FollowersCount
        └── FollowingCount
```

### TypeScript Interfaces

```typescript
// src/types/github.ts
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubError {
  message: string;
  documentation_url: string;
}
```

### Dark Mode Implementation Pattern

**Best Practice (2025):** Use React Context + localStorage + CSS Custom Properties

**References:**
- https://aleksandarpopovic.com/Easy-Dark-Mode-Switch-with-React-and-localStorage/
- https://dev.to/vrushikvisavadiya/building-a-dark-mode-toggle-in-react-with-context-api-5nk
- https://css-tricks.com/easy-dark-mode-and-multiple-color-themes-in-react/

**Implementation Steps:**

1. **Create Theme Context** (`src/contexts/ThemeContext.tsx`):
```typescript
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage, fallback to 'light'
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  // Update document and localStorage when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

2. **Extend colors.css** with dark mode overrides:
```css
/* Add to src/styles/colors.css */
[data-theme="dark"] {
  --color-background: var(--color-neutral-900);
  --color-surface: var(--color-neutral-800);
  --color-text-primary: var(--color-neutral-0);
  --color-text-secondary: var(--color-neutral-0);
  --color-text-tertiary: var(--color-neutral-200);
  /* Keep primary, error colors same */
}
```

3. **Wrap App in ThemeProvider** (in `src/main.tsx`):
```typescript
import { ThemeProvider } from './contexts/ThemeContext';

<StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</StrictMode>
```

### API Integration Pattern

**Custom Hook for Data Fetching** (`src/hooks/useGitHubUser.ts`):

```typescript
import { useState } from 'react';
import type { GitHubUser, GitHubError } from '../types/github';

interface UseGitHubUserReturn {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
  searchUser: (username: string) => Promise<void>;
}

export function useGitHubUser(): UseGitHubUserReturn {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUser = async (username: string) => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('No results');
          setUser(null);
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return;
      }

      const data: GitHubUser = await response.json();
      setUser(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, searchUser };
}
```

### Date Formatting Utility

```typescript
// src/utils/formatDate.ts
export function formatJoinDate(isoDate: string): string {
  const date = new Date(isoDate);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `Joined ${day} ${month} ${year}`;
}
```

### Component Pseudocode

**App Component** (`src/App.tsx`):
```typescript
function App() {
  const { user, loading, error, searchUser } = useGitHubUser();

  return (
    <div className="app">
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
  );
}
```

**SearchBar Component** (`src/components/SearchBar.tsx`):
```typescript
interface SearchBarProps {
  onSearch: (username: string) => void;
  loading: boolean;
  error: string | null;
}

function SearchBar({ onSearch, loading, error }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <SearchIcon />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search GitHub username..."
        className="search-input"
      />
      {error && <span className="error-message">{error}</span>}
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
```

**UserProfile Component** (`src/components/UserProfile.tsx`):
```typescript
function UserProfile({ user }: { user: GitHubUser }) {
  return (
    <article className="user-profile">
      <img src={user.avatar_url} alt={user.name || user.login} />
      <div className="user-info">
        <h1>{user.name || user.login}</h1>
        <p className="username">@{user.login}</p>
        <p className="join-date">{formatJoinDate(user.created_at)}</p>
        <p className="bio">{user.bio || 'This profile has no bio'}</p>
      </div>
      <div className="user-stats">
        <StatItem label="Repos" value={user.public_repos} />
        <StatItem label="Followers" value={user.followers} />
        <StatItem label="Following" value={user.following} />
      </div>
      <div className="user-links">
        <LinkItem icon={<LocationIcon />} value={user.location} />
        <LinkItem icon={<LinkIcon />} value={user.blog} href={user.blog} />
        <LinkItem icon={<TwitterIcon />} value={user.twitter_username} />
        <LinkItem icon={<CompanyIcon />} value={user.company} />
      </div>
    </article>
  );
}
```

### Icons Implementation

**Options:**
1. **SVG Components** (Recommended for small set of icons):
   - Create React components for each icon (Moon, Sun, Search, Location, Link, Twitter, Company)
   - Export from `src/components/icons/` directory
   - Inline SVGs from Figma (right-click icon → Copy as SVG)

2. **Icon Library** (NOT recommended - adds dependency):
   - react-icons or similar (avoid unless necessary)

**Implementation:**
```typescript
// src/components/icons/SearchIcon.tsx
export function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      {/* SVG path from Figma */}
    </svg>
  );
}
```

### Responsive Design Strategy

**Breakpoint:** 768px (mobile vs desktop)

**Mobile Considerations:**
- Stack layout vertically
- Adjust search bar width to 100% minus padding
- Use `text-preset-3` mobile variant (13px)
- Reduce spacing values
- Avatar size smaller
- Stats layout in column or wrap

**Desktop Considerations:**
- Horizontal layout for user info
- Larger avatar (e.g., 120px)
- Stats in a row
- More generous spacing

**CSS Pattern:**
```css
.user-profile {
  display: grid;
  gap: var(--spacing-300);
  /* mobile-first */
}

@media (min-width: 768px) {
  .user-profile {
    grid-template-columns: auto 1fr;
    gap: var(--spacing-400);
  }
}
```

## Error Handling Strategy

1. **Network Errors**: Try/catch in fetch, display generic error message
2. **404 Not Found**: Display "No results" next to search button (as shown in Figma)
3. **Rate Limiting** (429): Display "Too many requests, try again later"
4. **Validation**: Check for empty username before API call
5. **Loading State**: Disable search button, optionally show loading spinner
6. **Empty Bio/Links**: Show placeholder text like "Not Available" with reduced opacity

## Gotchas and Considerations

1. **Fetch API doesn't throw on HTTP errors** - Must check `response.ok`
2. **localStorage can throw** - Wrap in try/catch for ThemeProvider initialization
3. **Dark mode flash** - Consider adding inline script in `index.html` to set theme before React loads (optional optimization)
4. **GitHub API rate limits** - Unauthenticated: 60 requests/hour per IP (sufficient for demo)
5. **Blog URL validation** - GitHub API returns blog without `http://` sometimes, add protocol if missing
6. **Null/undefined fields** - Many GitHub user fields can be null, always provide fallbacks
7. **Image loading** - Avatar images might fail to load, consider error handling or fallback avatar
8. **TypeScript strict mode** - Null checks required for all optional fields

## Implementation Task Checklist (In Order)

1. **Setup & Types**
   - [ ] Create `src/types/github.ts` with `GitHubUser` and `GitHubError` interfaces
   - [ ] Create `src/utils/formatDate.ts` utility

2. **Dark Mode Foundation**
   - [ ] Create `src/contexts/ThemeContext.tsx` with Context, Provider, and hook
   - [ ] Update `src/main.tsx` to wrap `<App>` with `<ThemeProvider>`
   - [ ] Extend `src/styles/colors.css` with `[data-theme="dark"]` overrides

3. **Icons**
   - [ ] Create `src/components/icons/` directory
   - [ ] Export Figma icons as SVG and create React components:
     - `SearchIcon.tsx`, `MoonIcon.tsx`, `SunIcon.tsx`
     - `LocationIcon.tsx`, `LinkIcon.tsx`, `TwitterIcon.tsx`, `CompanyIcon.tsx`
   - [ ] Create `src/components/icons/index.ts` barrel export

4. **API Integration**
   - [ ] Create `src/hooks/useGitHubUser.ts` custom hook with fetch logic
   - [ ] Implement error handling (404, network errors, validation)
   - [ ] Add loading state management

5. **Core Components**
   - [ ] Create `src/components/Header.tsx` (logo + theme toggle)
   - [ ] Create `src/components/ThemeToggle.tsx` (uses `useTheme` hook)
   - [ ] Create `src/components/SearchBar.tsx` (form, input, error display, button)
   - [ ] Create `src/components/UserProfile.tsx` (main profile card)
   - [ ] Create `src/components/UserStats.tsx` (repos, followers, following)
   - [ ] Create `src/components/UserLinks.tsx` (location, blog, twitter, company)
   - [ ] Create `src/components/EmptyState.tsx` (initial prompt message)

6. **Styling**
   - [ ] Create `src/components/Header.css`
   - [ ] Create `src/components/SearchBar.css` (states: default, focus, error)
   - [ ] Create `src/components/UserProfile.css`
   - [ ] Create `src/components/UserStats.css`
   - [ ] Create `src/components/UserLinks.css`
   - [ ] Create `src/App.css` (layout, responsive breakpoints)
   - [ ] Add responsive styles with `@media (min-width: 768px)`

7. **Integration**
   - [ ] Update `src/App.tsx` to integrate all components
   - [ ] Wire up `useGitHubUser` hook
   - [ ] Implement conditional rendering (empty state, user profile, error)
   - [ ] Test search functionality

8. **Polish**
   - [ ] Add loading states (button disabled, loading text)
   - [ ] Add focus styles for accessibility
   - [ ] Add hover states for interactive elements
   - [ ] Handle null/undefined user fields gracefully
   - [ ] Format dates with `formatJoinDate` utility
   - [ ] Add URL protocol to blog links if missing

9. **Testing**
   - [ ] Test with existing user (e.g., "octocat")
   - [ ] Test with non-existent user (404 error)
   - [ ] Test empty search
   - [ ] Test theme toggle and localStorage persistence
   - [ ] Test responsive design (mobile and desktop)
   - [ ] Test with user with missing fields (no bio, no location, etc.)

## Validation Gates (Execute These)

```bash
# Type-check and lint
npm run lint

# Type-check
npx tsc --noEmit

# Build for production
npm run build

# Run dev server (manual testing)
npm run dev
```

**Manual Test Cases:**
1. Search for "octocat" - should display profile
2. Search for "this-user-definitely-does-not-exist-123456" - should show "No results"
3. Toggle dark mode - should persist after page reload
4. Resize window - responsive design should adapt
5. Search with empty input - should show validation error
6. Check avatar loads correctly
7. Check all links are clickable and formatted correctly

## Quality Checklist

- [x] All necessary context included (codebase structure, design system, API docs)
- [x] Validation gates are executable by AI
- [x] References existing patterns (existing CSS design system)
- [x] Clear implementation path (component architecture, pseudocode, task checklist)
- [x] Error handling documented (fetch errors, 404, validation, edge cases)
- [x] External references with URLs provided
- [x] TypeScript types defined
- [x] Responsive design strategy outlined
- [x] Dark mode implementation pattern documented

## PRP Confidence Score: 9/10

**Rationale:**
- Comprehensive codebase analysis with existing design system fully documented
- Clear API documentation with example response
- Proven patterns from 2025 best practices (Context API + localStorage)
- Step-by-step implementation checklist
- Complete TypeScript interfaces provided
- Responsive design strategy defined
- Error handling thoroughly covered
- Figma designs analyzed and referenced

**Minor risks:**
- Exact Figma design details (spacing, exact colors for dark mode) may need fine-tuning during implementation
- Icon SVG paths not provided (must be extracted from Figma)

**Mitigation:**
- Design system tokens provide flexibility for adjustments
- Icon extraction is straightforward from Figma
- All patterns are well-documented with references

## References

**GitHub API:**
- https://docs.github.com/en/rest/users/users

**Dark Mode Patterns:**
- https://aleksandarpopovic.com/Easy-Dark-Mode-Switch-with-React-and-localStorage/
- https://dev.to/vrushikvisavadiya/building-a-dark-mode-toggle-in-react-with-context-api-5nk
- https://css-tricks.com/easy-dark-mode-and-multiple-color-themes-in-react/

**Error Handling:**
- https://gist.github.com/odewahn/5a5eeb23279eed6a80d7798fdb47fe91
- https://notes.alexkehayias.com/gracefully-fetch-api-data-with-react-and-typescript/

**Figma Designs:**
- Light Mode: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-351
- Dark Mode: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-587
- Icons: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-134
- Logo: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=3-994
