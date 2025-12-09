# PRP: GitHub OAuth Authentication with Protected Dashboard

## Feature Summary

Implement GitHub OAuth login functionality allowing users to:
1. Sign in with their GitHub account
2. View their avatar and name in the navigation bar with logout button
3. Access protected `/dashboard` route showing:
   - All existing user profile information
   - Top 10 public repositories with: name + link, description, stars, primary language, last update date
4. Keep existing public GitHub user search on home page (no breaking changes)

**Target Environment:** Localhost development only (no production deployment required)

## Architecture Decision

**Chosen Approach:** Netlify Dev for local development
- Runs Vite dev server + serverless functions together on localhost
- Secure OAuth flow (CLIENT_SECRET stays server-side)
- Single command to start everything: `npm run dev:netlify`
- Environment variables managed through `.env.local`

**Why this approach:**
- Simplest setup for localhost OAuth (no separate backend server needed)
- CLIENT_SECRET never exposed to frontend
- If you ever want to deploy later, infrastructure is ready
- Free and no account needed for local development

## Technology Stack

**New Dependencies:**
- `react-router-dom` - Routing with protected routes
- `@netlify/functions` - TypeScript types for serverless functions
- `netlify-cli` - Run functions locally

**Core Libraries (already in project):**
- React 19.2.0 + TypeScript
- Vite 7.x
- Native fetch() for API calls

## Prerequisites & Setup

### 1. GitHub OAuth App Registration

**Manual steps (do this first):**

1. Go to: https://github.com/settings/applications/new
2. Fill in:
   - **Application name:** `GitHub Dashboard Local` (or your preference)
   - **Homepage URL:** `http://localhost:8888`
   - **Authorization callback URL:** `http://localhost:8888/callback`
   - **Description:** (optional)
3. Click "Register application"
4. Copy the **Client ID** (shows immediately)
5. Click **Generate a new client secret**
6. Copy the **Client Secret** (shown only once!)

**Important:** Port `8888` is Netlify Dev's default port. Don't use `5173` (Vite's default).

**Documentation:**
- Creating OAuth app: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
- Authorizing OAuth apps: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

### 2. Environment Variables

**Create `.env.local` in project root:**
```env
VITE_GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
```

**Key points:**
- `VITE_` prefix required for client-side variables (Vite requirement)
- `GITHUB_CLIENT_SECRET` has no prefix (server-side only, never exposed)
- This file is automatically ignored by Git (Vite's default behavior)

**Update `.gitignore` to ensure:**
```
.env.local
.env*.local
```

### 3. Install Dependencies

```bash
npm install react-router-dom
npm install --save-dev @types/react-router-dom netlify-cli @netlify/functions
```

## Implementation Plan

### STEP 1: Netlify Configuration

**Create `netlify.toml` in project root:**

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

**Purpose:**
- Tells Netlify Dev where functions are located
- Maps `/api/*` URLs to serverless functions
- Works locally with `netlify dev` command

### STEP 2: OAuth Serverless Function

**Create `netlify/functions/callback.ts`:**

```typescript
import type { Handler } from '@netlify/functions';

const GITHUB_CLIENT_ID = process.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const handler: Handler = async (event) => {
  // Get authorization code from query params
  const { code } = event.queryStringParameters || {};

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Authorization code is required' }),
    };
  }

  try {
    // Exchange code for access token with GitHub
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description || tokenData.error);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        access_token: tokenData.access_token,
        token_type: tokenData.token_type,
      }),
    };
  } catch (error) {
    console.error('OAuth error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to authenticate with GitHub',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
```

**Key Security Points:**
- CLIENT_SECRET accessed via `process.env` (server-side only)
- Never exposed to frontend JavaScript
- Token exchange happens server-side
- Frontend only receives the access_token

**Documentation:**
- GitHub OAuth token exchange: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
- Netlify Functions: https://docs.netlify.com/build/functions/environment-variables/

### STEP 3: Update TypeScript Types

**Update `src/types/github.ts` - Add repository types:**

```typescript
// Existing GitHubUser interface remains unchanged

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
```

**File location:** `C:\Users\placko\crif\aiCertifikat\dashboard\github-dashboard\src\types\github.ts`

### STEP 4: Authentication Context

**Create `src/contexts/AuthContext.tsx`:**

```typescript
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { GitHubUser } from '../types/github';

interface AuthContextType {
  user: GitHubUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('github_token');
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(!!token);

  // Fetch user data when token exists
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData: GitHubUser = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Auth error:', error);
        // Token invalid, clear it
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (newToken: string) => {
    try {
      sessionStorage.setItem('github_token', newToken);
      setToken(newToken);
    } catch (error) {
      console.error('Failed to save token:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      sessionStorage.removeItem('github_token');
    } catch {
      // Ignore errors
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**Pattern Notes:**
- **Mirrors `ThemeContext.tsx` pattern exactly** (file: `C:\Users\placko\crif\aiCertifikat\dashboard\github-dashboard\src\contexts\ThemeContext.tsx`)
- Uses sessionStorage (more secure than localStorage for auth tokens)
- Auto-fetches user on mount if token exists
- Auto-clears invalid tokens
- Provides `useAuth()` hook for components

**Security Note:**
While sessionStorage is vulnerable to XSS attacks, it's acceptable for localhost development. For production, consider httpOnly cookies (requires more backend work).

**Documentation:**
- Token storage security: https://auth0.com/docs/secure/security-guidance/data-security/token-storage
- Authenticating to GitHub REST API: https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api

### STEP 5: Routing Setup

**Update `src/main.tsx` - Add Router and AuthProvider:**

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
```

**Key changes:**
- Wrap in `<BrowserRouter>` (enables routing)
- Add `<AuthProvider>` nested inside `<ThemeProvider>`
- **Order matters:** Router → Theme → Auth → App

**File location:** `C:\Users\placko\crif\aiCertifikat\dashboard\github-dashboard\src\main.tsx`

### STEP 6: Protected Route Component

**Create `src/components/ProtectedRoute.tsx`:**

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <p className="text-preset-4">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
```

**Create `src/components/ProtectedRoute.css`:**

```css
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: var(--color-text-secondary);
}
```

**Purpose:**
- Guards protected routes (like `/dashboard`)
- Shows loading state while checking auth
- Redirects to home if not authenticated
- Renders children if authenticated

**Documentation:**
- React Router protected routes: https://ui.dev/react-router-protected-routes-authentication
- Authentication with React Router v6: https://blog.logrocket.com/authentication-react-router-v6/

### STEP 7: Login Button Component

**Create `src/components/LoginButton.tsx`:**

```typescript
import './LoginButton.css';

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/callback`;

export default function LoginButton() {
  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user,repo`;
    window.location.href = githubAuthUrl;
  };

  return (
    <button onClick={handleLogin} className="login-button text-preset-5">
      <svg className="github-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" clipRule="evenodd" />
      </svg>
      Sign in with GitHub
    </button>
  );
}
```

**Create `src/components/LoginButton.css`:**

```css
.login-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-100);
  padding: var(--spacing-150) var(--spacing-300);
  background-color: var(--color-blue-500);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-8);
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: 700;
}

.login-button:hover {
  background-color: var(--color-blue-300);
}

.login-button:active {
  transform: translateY(1px);
}

.github-icon {
  flex-shrink: 0;
}
```

**How it works:**
1. Uses CLIENT_ID from environment (via `import.meta.env`)
2. Redirects to GitHub OAuth authorization page
3. Requests `read:user` and `repo` scopes
4. GitHub redirects back to `/callback` after authorization

**Design system usage:**
- Uses `--spacing-*` variables (following existing pattern)
- Uses `--color-blue-500` and `--color-blue-300` (existing colors)
- Uses `text-preset-5` (16px bold)
- Uses `--radius-8` (existing radius)

### STEP 8: User Menu Component

**Create `src/components/UserMenu.tsx`:**

```typescript
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
```

**Create `src/components/UserMenu.css`:**

```css
.user-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-150);
}

.user-menu-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 2px solid var(--color-neutral-300);
}

[data-theme="dark"] .user-menu-avatar {
  border-color: var(--color-neutral-600);
}

.user-menu-name {
  color: var(--color-text-primary);
}

.logout-button {
  padding: var(--spacing-50) var(--spacing-150);
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-4);
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background-color: var(--color-neutral-200);
  border-color: var(--color-neutral-400);
  color: var(--color-text-primary);
}

[data-theme="dark"] .logout-button {
  border-color: var(--color-neutral-600);
}

[data-theme="dark"] .logout-button:hover {
  background-color: var(--color-neutral-700);
  border-color: var(--color-neutral-500);
}
```

**Purpose:**
- Shows user avatar (32px circular) and name
- Logout button clears token and redirects
- Only visible when user is logged in
- Integrates with existing dark mode theme

### STEP 9: Update Header Component

**Modify `src/components/Header.tsx`:**

```typescript
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
```

**Update `src/components/Header.css` - Add new styles:**

```css
/* Keep existing .header and .logo styles */

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
}
```

**Changes:**
- Import `useAuth` hook and `UserMenu` component
- Conditionally render `UserMenu` when user is logged in
- Wrap UserMenu and ThemeToggle in `.header-actions` div
- Add gap between elements using design system spacing

**File location:** `C:\Users\placko\crif\aiCertifikat\dashboard\github-dashboard\src\components\Header.tsx`

### STEP 10: OAuth Callback Page

**Create `src/pages/CallbackPage.tsx`:**

```typescript
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './CallbackPage.css';

export default function CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('Authorization failed. Please try again.');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    if (!code) {
      setError('No authorization code received.');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    const exchangeToken = async () => {
      try {
        const response = await fetch(`/api/callback?code=${code}`);

        if (!response.ok) {
          throw new Error('Failed to exchange token');
        }

        const data = await response.json();
        await login(data.access_token);
        navigate('/dashboard');
      } catch (err) {
        console.error('Token exchange error:', err);
        setError('Authentication failed. Please try again.');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    exchangeToken();
  }, [searchParams, navigate, login]);

  if (error) {
    return (
      <div className="callback-page">
        <div className="callback-message error">
          <p className="text-preset-4">{error}</p>
          <p className="text-preset-7">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="callback-page">
      <div className="callback-message">
        <p className="text-preset-4">Completing authentication...</p>
      </div>
    </div>
  );
}
```

**Create `src/pages/CallbackPage.css`:**

```css
.callback-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.callback-message {
  text-align: center;
  padding: var(--spacing-500);
  background-color: var(--color-surface);
  border-radius: var(--radius-10);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.callback-message.error {
  border: 2px solid var(--color-red-500);
}

.callback-message p:first-child {
  margin-bottom: var(--spacing-100);
  color: var(--color-text-primary);
}

.callback-message p:last-child {
  color: var(--color-text-secondary);
}
```

**How it works:**
1. GitHub redirects to `/callback?code=ABC123`
2. Component extracts `code` from URL
3. Calls serverless function: `/api/callback?code=ABC123`
4. Function exchanges code for access_token
5. Component saves token via `login()`
6. Navigates to `/dashboard`

**Error handling:**
- User denies authorization on GitHub
- Missing code parameter
- Token exchange fails
- Auto-redirects to home after 3 seconds on error

### STEP 11: Repository Fetching Hook

**Create `src/hooks/useGitHubRepos.ts`:**

```typescript
import { useState, useEffect } from 'react';
import type { GitHubRepo } from '../types/github';

interface UseGitHubReposReturn {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

export function useGitHubRepos(token: string | null, username: string | null): UseGitHubReposReturn {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !username) {
      setRepos([]);
      return;
    }

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=public`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('User not found');
          }
          if (response.status === 403) {
            throw new Error('Rate limit exceeded');
          }
          throw new Error(`Failed to fetch repositories: ${response.status}`);
        }

        const data: GitHubRepo[] = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load repositories');
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [token, username]);

  return { repos, loading, error };
}
```

**Pattern Notes:**
- **Mirrors `useGitHubUser.ts` pattern** (file: `C:\Users\placko\crif\aiCertifikat\dashboard\github-dashboard\src\hooks\useGitHubUser.ts`)
- Uses authenticated API call with Bearer token
- Fetches top 10 repos sorted by update date
- Query params: `sort=updated&per_page=10&type=public`
- Returns same shape: `{ data, loading, error }`

**API Endpoint:** `https://api.github.com/users/{username}/repos`
- Documentation: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user

### STEP 12: Repository Card Component

**Create `src/components/RepoCard.tsx`:**

```typescript
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
```

**Create `src/components/RepoCard.css`:**

```css
.repo-card {
  padding: var(--spacing-300);
  background-color: var(--color-surface);
  border-radius: var(--radius-10);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.repo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-150);
  gap: var(--spacing-150);
}

.repo-name {
  color: var(--color-blue-500);
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s ease;
  word-break: break-word;
}

.repo-name:hover {
  color: var(--color-blue-300);
  text-decoration: underline;
}

.repo-stars {
  display: flex;
  align-items: center;
  gap: var(--spacing-50);
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.repo-description {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-200);
  line-height: 1.5;
}

.repo-no-description {
  font-style: italic;
  opacity: 0.7;
}

.repo-meta {
  display: flex;
  gap: var(--spacing-200);
  flex-wrap: wrap;
  color: var(--color-text-secondary);
}

.repo-language {
  display: flex;
  align-items: center;
  gap: var(--spacing-50);
}

.language-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background-color: var(--color-blue-500);
}

.repo-updated {
  color: var(--color-text-secondary);
}
```

**Features:**
- Displays all required info: name (link), description, stars, language, last update
- Hover effect (lift + shadow)
- Relative time formatting ("2 days ago")
- Star icon with count (formatted with commas for large numbers)
- Color dot for language indicator
- Links open in new tab with security attributes

**Design system usage:**
- Uses `text-preset-3` for name, `text-preset-6` for description, `text-preset-7` for meta
- Uses design tokens throughout (spacing, colors, radius)
- Follows existing card pattern from `UserProfile.css`

### STEP 13: Home Page

**Create `src/pages/HomePage.tsx`:**

```typescript
import { useAuth } from '../contexts/AuthContext';
import { useGitHubUser } from '../hooks/useGitHubUser';
import SearchBar from '../components/SearchBar';
import UserProfile from '../components/UserProfile';
import EmptyState from '../components/EmptyState';
import LoginButton from '../components/LoginButton';
import './HomePage.css';

export default function HomePage() {
  const { user: authUser } = useAuth();
  const { user, loading, error, searchUser } = useGitHubUser();

  return (
    <div className="home-page">
      <SearchBar
        onSearch={searchUser}
        loading={loading}
        error={error}
      />

      {!authUser && (
        <div className="login-prompt">
          <LoginButton />
          <p className="login-prompt-text text-preset-6">
            Sign in to access your dashboard and view your repositories
          </p>
        </div>
      )}

      {user && <UserProfile user={user} />}

      {!user && !loading && !error && (
        <EmptyState />
      )}
    </div>
  );
}
```

**Create `src/pages/HomePage.css`:**

```css
.home-page {
  max-width: 730px;
  margin: 0 auto;
}

.login-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-150);
  padding: var(--spacing-400) 0;
  text-align: center;
}

.login-prompt-text {
  color: var(--color-text-secondary);
  max-width: 400px;
}
```

**Purpose:**
- Keeps existing search functionality (requirement: "Yes, keep it")
- Shows login button when not authenticated
- Displays search results (existing UserProfile component)
- Shows empty state when nothing searched yet

**No breaking changes:** All existing functionality preserved!

### STEP 14: Dashboard Page

**Create `src/pages/DashboardPage.tsx`:**

```typescript
import { useAuth } from '../contexts/AuthContext';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import UserProfile from '../components/UserProfile';
import RepoCard from '../components/RepoCard';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, token } = useAuth();
  const { repos, loading, error } = useGitHubRepos(token, user?.login || null);

  return (
    <div className="dashboard-page">
      {user && <UserProfile user={user} />}

      <section className="repos-section">
        <h2 className="repos-title text-preset-2">Top 10 Public Repositories</h2>

        {loading && (
          <p className="repos-message text-preset-4">Loading repositories...</p>
        )}

        {error && (
          <p className="repos-message error text-preset-4">{error}</p>
        )}

        {!loading && !error && repos.length === 0 && (
          <p className="repos-message text-preset-4">No public repositories found.</p>
        )}

        {!loading && !error && repos.length > 0 && (
          <div className="repos-grid">
            {repos.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
```

**Create `src/pages/DashboardPage.css`:**

```css
.dashboard-page {
  max-width: 1200px;
  margin: 0 auto;
}

.repos-section {
  margin-top: var(--spacing-500);
}

.repos-title {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-300);
}

.repos-message {
  text-align: center;
  padding: var(--spacing-500);
  color: var(--color-text-secondary);
}

.repos-message.error {
  color: var(--color-red-500);
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-300);
}

@media (max-width: 768px) {
  .repos-grid {
    grid-template-columns: 1fr;
  }
}
```

**Features:**
- Shows user profile (existing component reused)
- Displays top 10 repos in responsive grid
- Loading and error states
- Empty state for users with no repos
- Responsive: multi-column on desktop, single column on mobile

### STEP 15: Update App.tsx with Routes

**Replace `src/App.tsx` with:**

```typescript
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CallbackPage from './pages/CallbackPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/index.css';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
```

**Routes:**
- `/` - Home page (search + login button)
- `/callback` - OAuth callback handler (public)
- `/dashboard` - Protected dashboard (requires auth)

**File location:** `C:\Users\placko\crif\aiCertifikat\dashboard\github-dashboard\src\App.tsx`

### STEP 16: Update package.json Scripts

**Add to `package.json` scripts section:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "dev:netlify": "netlify dev"
  }
}
```

**New command:**
- `npm run dev:netlify` - Starts Netlify Dev (Vite + serverless functions)

**Important:** Use `npm run dev:netlify` instead of `npm run dev` for development!

### STEP 17: Update .gitignore

**Ensure these lines are in `.gitignore`:**

```
# Environment variables
.env
.env.local
.env*.local

# Netlify
.netlify
```

**File location:** `C:\Users\placko\crif\aiCertifikat\dashboard\github-dashboard\.gitignore`

## OAuth Flow Diagram

```
1. User clicks "Sign in with GitHub" on home page
   ↓
2. Frontend redirects to GitHub OAuth page
   URL: https://github.com/login/oauth/authorize?client_id=...
   ↓
3. User reviews permissions and clicks "Authorize"
   ↓
4. GitHub redirects to: http://localhost:8888/callback?code=ABC123
   ↓
5. CallbackPage component receives code
   ↓
6. Frontend calls: /api/callback?code=ABC123
   ↓
7. Serverless function (netlify/functions/callback.ts):
   - Receives code
   - Exchanges code for token with GitHub (CLIENT_SECRET stays server-side)
   - Returns access_token to frontend
   ↓
8. Frontend saves token to sessionStorage
   ↓
9. AuthContext automatically fetches user data from GitHub API
   URL: https://api.github.com/user (with Bearer token)
   ↓
10. Frontend redirects to /dashboard
    ↓
11. Dashboard fetches top 10 repos from GitHub API
    URL: https://api.github.com/users/{username}/repos
    ↓
12. Dashboard displays user info + repos
```

## Running the Application

### First Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with your GitHub OAuth credentials
# (see "Prerequisites & Setup" section above)

# 3. Start development server
npm run dev:netlify
```

### Daily Development

```bash
npm run dev:netlify
```

**Access at:** http://localhost:8888 (NOT 5173!)

**Important:** Netlify Dev runs on port 8888 by default. It proxies:
- Frontend: Vite dev server (with HMR)
- Functions: Serverless functions at `/api/*`

## Testing Checklist

### OAuth Flow
- [ ] Click "Sign in with GitHub" button on home page
- [ ] Redirected to GitHub authorization page
- [ ] See correct app name and permissions (read:user, repo)
- [ ] Click "Authorize" - redirected to callback page
- [ ] See "Completing authentication..." message briefly
- [ ] Redirected to /dashboard with user profile visible

### Protected Routes
- [ ] Try accessing `/dashboard` without login - redirected to home
- [ ] Login successfully - can access `/dashboard`
- [ ] Logout - redirected appropriately
- [ ] Try accessing `/dashboard` after logout - redirected to home

### Header Display
- [ ] Before login: See logo + theme toggle only
- [ ] After login: See logo + avatar + name + logout button + theme toggle
- [ ] Avatar displays correctly (32px circle)
- [ ] Name displays correctly (falls back to username if no name set)
- [ ] Logout button works

### Dashboard Display
- [ ] User profile shows (existing component)
- [ ] "Top 10 Public Repositories" heading displays
- [ ] Up to 10 repos shown in grid
- [ ] Each repo card shows:
  - [ ] Repo name as link (opens GitHub in new tab)
  - [ ] Description (or "No description provided")
  - [ ] Star count with icon
  - [ ] Language with color dot (if present)
  - [ ] Last update time (relative: "2 days ago")
- [ ] Grid responsive (multi-column → single column on mobile)
- [ ] Hover effects work on repo cards

### Home Page (Existing Functionality)
- [ ] Search bar still works for public users
- [ ] Can search any GitHub username
- [ ] User profile displays after search
- [ ] Login prompt shows when not authenticated
- [ ] Login prompt hidden when authenticated
- [ ] Empty state shows when nothing searched

### Error Handling
- [ ] Decline authorization on GitHub - error message + redirect to home
- [ ] Invalid/expired token - auto logout
- [ ] User with no public repos - "No public repositories found" message
- [ ] Network error during repo fetch - error message displayed

### Theme Compatibility
- [ ] Switch to dark mode - all components adapt correctly
- [ ] Login button readable in both themes
- [ ] Repo cards readable in both themes
- [ ] Logout button styled correctly in both themes
- [ ] Theme persists after login/logout

### Browser Compatibility
- [ ] sessionStorage works (check console for errors)
- [ ] Page refresh after login - still authenticated
- [ ] Close tab and reopen - session lost (sessionStorage cleared)

## Validation Gates (Run Before Commit)

```bash
# Type check
npx tsc -b

# Lint
npm run lint

# Build
npm run build
```

All commands must pass with no errors.

## Troubleshooting

### "Failed to exchange token" Error

**Cause:** Environment variables not loaded or incorrect values

**Fix:**
1. Check `.env.local` exists in project root
2. Verify `VITE_GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are correct
3. Restart `npm run dev:netlify` (must restart for env var changes)

### "Unauthorized" or 401 Errors

**Cause:** Token expired or invalid

**Fix:**
1. Logout and login again
2. Check if token exists: Open DevTools → Application → Session Storage → `github_token`
3. If token looks wrong, clear sessionStorage and login again

### "404 Not Found" on /api/callback

**Cause:** Netlify Dev not running or functions path incorrect

**Fix:**
1. Ensure using `npm run dev:netlify` (not `npm run dev`)
2. Check `netlify.toml` exists in project root
3. Check `netlify/functions/callback.ts` exists
4. Verify URL is `http://localhost:8888` (not 5173)

### Redirect URI Mismatch Error on GitHub

**Cause:** Callback URL doesn't match GitHub OAuth app settings

**Fix:**
1. Go to https://github.com/settings/developers
2. Click your OAuth app
3. Ensure "Authorization callback URL" is: `http://localhost:8888/callback`
4. Save changes

### Rate Limit Errors

**Cause:** Too many GitHub API requests

**Fix:**
- Authenticated requests: 5,000/hour (should be fine)
- If still hitting limits, wait an hour or use different GitHub account
- Check rate limit: https://api.github.com/rate_limit

## Security Considerations

### Token Storage
- Using sessionStorage (acceptable for localhost development)
- Token cleared when browser tab closes
- Vulnerable to XSS but React's XSS protections help
- For production: Consider httpOnly cookies (requires backend changes)

### OAuth Secrets
- CLIENT_SECRET never exposed to frontend
- Only used server-side in Netlify function
- .env.local ignored by Git
- Never log tokens to console in production

### CORS
- Serverless function allows all origins (`*`) for localhost development
- For production: Restrict to specific domain

### External Links
- All external links use `rel="noopener noreferrer"` (security best practice)
- Repo links open in new tab safely

## File Structure Summary

```
github-dashboard/
├── netlify/
│   └── functions/
│       └── callback.ts              # NEW: OAuth token exchange
├── src/
│   ├── components/
│   │   ├── Header.tsx               # MODIFIED: Add UserMenu
│   │   ├── Header.css               # MODIFIED: Add .header-actions
│   │   ├── LoginButton.tsx          # NEW: Sign in button
│   │   ├── LoginButton.css          # NEW
│   │   ├── UserMenu.tsx             # NEW: Avatar + name + logout
│   │   ├── UserMenu.css             # NEW
│   │   ├── ProtectedRoute.tsx       # NEW: Route guard
│   │   ├── ProtectedRoute.css       # NEW
│   │   ├── RepoCard.tsx             # NEW: Repository card
│   │   ├── RepoCard.css             # NEW
│   │   └── (existing components)    # UNCHANGED
│   ├── contexts/
│   │   ├── ThemeContext.tsx         # UNCHANGED
│   │   └── AuthContext.tsx          # NEW: Auth state management
│   ├── hooks/
│   │   ├── useGitHubUser.ts         # UNCHANGED
│   │   └── useGitHubRepos.ts        # NEW: Fetch user repos
│   ├── pages/
│   │   ├── HomePage.tsx             # NEW: Home with search + login
│   │   ├── HomePage.css             # NEW
│   │   ├── DashboardPage.tsx        # NEW: Protected dashboard
│   │   ├── DashboardPage.css        # NEW
│   │   ├── CallbackPage.tsx         # NEW: OAuth callback
│   │   └── CallbackPage.css         # NEW
│   ├── types/
│   │   └── github.ts                # MODIFIED: Add GitHubRepo
│   ├── utils/
│   │   └── formatDate.ts            # UNCHANGED (used in RepoCard)
│   ├── styles/                      # UNCHANGED (design system)
│   ├── App.tsx                      # MODIFIED: Add routing
│   ├── App.css                      # UNCHANGED
│   └── main.tsx                     # MODIFIED: Add Router + AuthProvider
├── .env.local                       # NEW: Local environment variables
├── .gitignore                       # MODIFIED: Add .env.local
├── netlify.toml                     # NEW: Netlify configuration
└── package.json                     # MODIFIED: Add dependencies + script
```

## Implementation Task List

Execute in this order:

1. **Environment Setup**
   - [ ] Register GitHub OAuth app
   - [ ] Create `.env.local` with credentials
   - [ ] Install npm dependencies
   - [ ] Update `.gitignore`

2. **Backend (Serverless Functions)**
   - [ ] Create `netlify.toml`
   - [ ] Create `netlify/functions/callback.ts`

3. **Type Definitions**
   - [ ] Update `src/types/github.ts` (add GitHubRepo)

4. **Authentication Infrastructure**
   - [ ] Create `src/contexts/AuthContext.tsx`
   - [ ] Update `src/main.tsx` (add Router + AuthProvider)

5. **Routing Components**
   - [ ] Create `src/components/ProtectedRoute.tsx` + CSS

6. **Authentication UI Components**
   - [ ] Create `src/components/LoginButton.tsx` + CSS
   - [ ] Create `src/components/UserMenu.tsx` + CSS
   - [ ] Update `src/components/Header.tsx` + CSS

7. **OAuth Callback**
   - [ ] Create `src/pages/CallbackPage.tsx` + CSS

8. **Dashboard Feature**
   - [ ] Create `src/hooks/useGitHubRepos.ts`
   - [ ] Create `src/components/RepoCard.tsx` + CSS
   - [ ] Create `src/pages/DashboardPage.tsx` + CSS

9. **Home Page**
   - [ ] Create `src/pages/HomePage.tsx` + CSS

10. **App Integration**
    - [ ] Update `src/App.tsx` (add routes)
    - [ ] Update `package.json` (add dev:netlify script)

11. **Testing**
    - [ ] Run validation gates (tsc, lint, build)
    - [ ] Manual testing (see Testing Checklist)

## Success Criteria

✅ User can sign in with GitHub (OAuth flow completes)
✅ User avatar and name display in header after login
✅ Logout button works and clears session
✅ `/dashboard` route is protected (requires auth)
✅ Dashboard shows user profile (existing component)
✅ Dashboard shows top 10 public repos
✅ Each repo card displays all required info (name, link, description, stars, language, last update)
✅ Home page keeps existing search functionality
✅ Login button shows on home page when not authenticated
✅ Theme toggle works with all new components
✅ All TypeScript type checks pass
✅ Lint passes with no errors
✅ Build succeeds

## Confidence Score: 9/10

**Rationale:**
- Comprehensive plan with all required features
- Well-researched OAuth flow with security considerations
- Mirrors existing patterns (ThemeContext, useGitHubUser, design system)
- Complete code examples provided
- Testing checklist included
- Clear file structure and task order

**Potential challenges (why not 10/10):**
- First-time OAuth setup can be tricky (GitHub app registration)
- Netlify Dev environment variable loading (may need restart)
- Port confusion (8888 vs 5173)

All challenges are solvable with the troubleshooting guide provided.

## External Resources

**Official Documentation:**
- GitHub OAuth Apps: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
- GitHub REST API Authentication: https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api
- React Router Protected Routes: https://ui.dev/react-router-protected-routes-authentication
- Netlify Functions Environment Variables: https://docs.netlify.com/build/environment-variables/get-started/
- Token Storage Best Practices: https://auth0.com/docs/secure/security-guidance/data-security/token-storage

**Helpful Guides:**
- Authentication with React Router v6: https://blog.logrocket.com/authentication-react-router-v6/
- sessionStorage vs localStorage Security: https://stytch.com/blog/localstorage-vs-sessionstorage-vs-cookies/

---

**END OF PRP**

This PRP provides everything needed for one-pass implementation: complete context, code examples, security considerations, testing strategy, and troubleshooting guide. The implementation follows existing codebase patterns and uses the established design system throughout.
