# GitHub User Dashboard

A modern React application for searching GitHub users and viewing their profiles and repositories. Built with React 19, TypeScript, and Vite, featuring GitHub OAuth authentication and a custom design system.

## Features

### Core Functionality
- **User Search**: Search for any GitHub user by username and view their profile
- **GitHub OAuth Authentication**: Sign in with your GitHub account
- **Personal Dashboard**: View your own profile and top 10 public repositories (authenticated users)
- **Persistent Search**: Search results persist when navigating between pages
- **Responsive Design**: Mobile-first responsive layout

### User Interface
- **Theme Toggle**: Switch between light and dark modes
- **User Profile Display**: Avatar, bio, stats (repos, followers, following), and social links
- **Repository Cards**: Display repository name, description, language, and star count
- **Protected Routes**: Dashboard access restricted to authenticated users

## Tech Stack

### Core
- **React 19.2.0** with TypeScript
- **React Router 7.10.1** for routing
- **Vite 7.x** for build tooling and HMR

### Deployment
- **Netlify** for hosting and serverless functions
- **Netlify Functions** for OAuth callback handling

### Styling
- Custom CSS with CSS Custom Properties (no utility frameworks)
- Design system with tokens for colors, typography, spacing, and radius

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**
- **GitHub OAuth App** (for authentication features)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd github-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

To get these credentials:
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:8888/callback` (for local development)
4. Copy the Client ID and generate a Client Secret

### 4. Run the development server

```bash
npm run dev
```

For development with Netlify Functions (required for OAuth):

```bash
npm run dev:netlify
```

The app will be available at `http://localhost:8888`

## Available Scripts

- `npm run dev` - Start Vite development server with HMR
- `npm run dev:netlify` - Start development server with Netlify Functions support
- `npm run build` - Type-check with TypeScript and build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Project Structure

```
github-dashboard/
├── src/
│   ├── components/       # React components
│   │   ├── icons/        # SVG icon components
│   │   ├── Header.tsx    # App header with theme toggle and user menu
│   │   ├── SearchBar.tsx # GitHub user search input
│   │   ├── UserProfile.tsx    # User profile display
│   │   ├── UserStats.tsx      # User statistics grid
│   │   ├── UserLinks.tsx      # User social links
│   │   ├── RepoCard.tsx       # Repository card component
│   │   ├── LoginButton.tsx    # GitHub OAuth login button
│   │   ├── UserMenu.tsx       # Authenticated user menu
│   │   ├── ProtectedRoute.tsx # Route protection wrapper
│   │   ├── ThemeToggle.tsx    # Light/dark theme switcher
│   │   └── EmptyState.tsx     # Empty state message
│   ├── contexts/         # React contexts
│   │   ├── AuthContext.tsx    # Authentication state management
│   │   ├── ThemeContext.tsx   # Theme state management
│   │   └── SearchContext.tsx  # Search state management
│   ├── hooks/            # Custom React hooks
│   │   ├── useGitHubUser.ts   # Hook for fetching user data
│   │   └── useGitHubRepos.ts  # Hook for fetching repositories
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx       # Home page with search
│   │   ├── DashboardPage.tsx  # Protected dashboard page
│   │   └── CallbackPage.tsx   # OAuth callback handler
│   ├── styles/           # Design system CSS
│   │   ├── colors.css         # Color tokens
│   │   ├── typography.css     # Typography presets
│   │   ├── spacing.css        # Spacing scale
│   │   ├── radius.css         # Border radius values
│   │   └── index.css          # Main CSS entry point
│   ├── types/            # TypeScript type definitions
│   │   └── github.ts          # GitHub API types
│   ├── utils/            # Utility functions
│   │   ├── formatDate.ts      # Date formatting helper
│   │   └── formatUrl.ts       # URL formatting helper
│   ├── App.tsx           # Root component with routing
│   └── main.tsx          # Application entry point
├── netlify/
│   └── functions/        # Netlify serverless functions
│       └── callback.ts   # GitHub OAuth callback handler
├── netlify.toml          # Netlify configuration
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Design System

The project uses a comprehensive design system with CSS Custom Properties (CSS Variables).

### Colors
- **Neutral Colors**: 9-shade scale from white to dark blue-black
- **Brand Colors**: Primary blue (`--color-blue-500`), hover blue, error red
- **Semantic Tokens**: Use `--color-primary`, `--color-text-primary`, etc.

### Typography
- **Font**: Space Mono (monospace) in weights 400 and 700
- **Presets**: 8 text presets (`text-preset-1` through `text-preset-8`)
- Use via class names (`.text-preset-1`) or CSS variables

### Spacing
- 14-step scale from 0px to 80px
- Based on 8px increment
- Access via `var(--spacing-100)`, `var(--spacing-200)`, etc.

### Border Radius
- 10-step scale plus `--radius-full` for fully rounded elements
- Common values: 10px for cards, 8px for buttons

See `CLAUDE.md` for detailed design system documentation.

## Authentication Flow

1. User clicks "Login with GitHub"
2. Redirected to GitHub OAuth authorization page
3. User authorizes the application
4. GitHub redirects to `/callback` with authorization code
5. Callback page sends code to `/api/callback` (Netlify Function)
6. Function exchanges code for access token
7. Access token stored in sessionStorage
8. User authenticated and redirected to dashboard

## Deployment

This app is configured for deployment on Netlify.

### Environment Variables (Netlify)

Set these in your Netlify site settings:
- `VITE_GITHUB_CLIENT_ID` - Your GitHub OAuth App Client ID
- `GITHUB_CLIENT_SECRET` - Your GitHub OAuth App Client Secret

### Deploy to Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Set environment variables
4. Deploy

Build settings are configured in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

## TypeScript Configuration

- **Strict mode** enabled with additional type safety checks
- **Modern module resolution**: `bundler` mode with `verbatimModuleSyntax`
- **Target**: ES2022
- **JSX**: react-jsx (React 17+ automatic JSX runtime)
- **Project references**: Separate configs for app code and Node config files

## License

This project is private and not licensed for public use.
