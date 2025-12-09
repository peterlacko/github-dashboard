# GitHub OAuth Authentication Setup Guide

This guide will help you set up GitHub OAuth authentication for the dashboard application.

## Prerequisites

Before you begin, make sure you have:
- A GitHub account
- Node.js and npm installed
- All project dependencies installed (`npm install` already run)

## Step 1: Create a GitHub OAuth App

1. Go to [GitHub OAuth Apps](https://github.com/settings/applications/new)
2. Fill in the application details:
   - **Application name:** `GitHub Dashboard Local` (or your preferred name)
   - **Homepage URL:** `http://localhost:8888`
   - **Authorization callback URL:** `http://localhost:8888/callback`
   - **Description:** (optional) "Local development OAuth app for GitHub Dashboard"
3. Click "Register application"
4. You'll see your **Client ID** immediately - copy it
5. Click "Generate a new client secret"
6. Copy the **Client Secret** immediately (it will only be shown once!)

**Important:** The port must be `8888` (Netlify Dev's default port), not `5173` (Vite's default).

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values with your actual credentials:
   ```env
   VITE_GITHUB_CLIENT_ID=your_actual_client_id_here
   GITHUB_CLIENT_SECRET=your_actual_client_secret_here
   ```

**Security Notes:**
- `VITE_GITHUB_CLIENT_ID` - Has the `VITE_` prefix because it's used in the frontend
- `GITHUB_CLIENT_SECRET` - No prefix, stays server-side only (never exposed to browser)
- `.env.local` is already in `.gitignore` - never commit it!

## Step 3: Start the Development Server

Use Netlify Dev to run both the Vite dev server and serverless functions:

```bash
npm run dev:netlify
```

**Important:** Always use `npm run dev:netlify` instead of `npm run dev` for OAuth to work!

The application will be available at: **http://localhost:8888**

## Testing the OAuth Flow

1. Open http://localhost:8888 in your browser
2. Click the "Sign in with GitHub" button
3. You'll be redirected to GitHub's authorization page
4. Review the requested permissions (read:user, repo)
5. Click "Authorize"
6. You'll be redirected back to the callback page
7. After authentication completes, you'll be redirected to `/dashboard`
8. You should see:
   - Your avatar and name in the header
   - Your GitHub profile information
   - Your top 10 public repositories

## Features

### Home Page (/)
- Public GitHub user search (existing functionality preserved)
- "Sign in with GitHub" button when not authenticated
- Login prompt message

### Dashboard (/dashboard)
- Protected route (requires authentication)
- Displays your GitHub profile information
- Shows your top 10 public repositories with:
  - Repository name (clickable link to GitHub)
  - Description
  - Star count
  - Primary language
  - Last update time (relative format)

### Header
- Logo
- User menu (when authenticated):
  - Avatar (32px circular)
  - Name (or username)
  - Logout button
- Theme toggle

## Troubleshooting

### "Failed to exchange token" Error

**Cause:** Environment variables not loaded or incorrect

**Fix:**
1. Check `.env.local` exists in project root
2. Verify both `VITE_GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are correct
3. Restart `npm run dev:netlify` (environment variables only load on startup)

### "Redirect URI Mismatch" Error

**Cause:** Callback URL doesn't match GitHub OAuth app settings

**Fix:**
1. Go to https://github.com/settings/developers
2. Click your OAuth app
3. Verify "Authorization callback URL" is exactly: `http://localhost:8888/callback`
4. Save changes and try again

### "404 Not Found" on /api/callback

**Cause:** Netlify Dev not running or functions not configured correctly

**Fix:**
1. Make sure you're using `npm run dev:netlify` (not `npm run dev`)
2. Verify `netlify.toml` exists in project root
3. Verify `netlify/functions/callback.ts` exists
4. Check the URL is `http://localhost:8888` (not port 5173)

### Token Expired or Unauthorized Errors

**Cause:** Authentication token expired or invalid

**Fix:**
1. Click the logout button
2. Sign in again
3. Token is stored in sessionStorage and cleared when browser tab closes

## Security Considerations

### For Local Development (Current Setup)
- ✅ Client Secret never exposed to frontend (server-side only)
- ✅ Token exchange happens server-side in Netlify function
- ✅ .env.local automatically ignored by Git
- ✅ sessionStorage used (cleared when tab closes)
- ⚠️ sessionStorage vulnerable to XSS (acceptable for localhost)
- ⚠️ CORS set to allow all origins (fine for local dev)

### For Production Deployment (Future)
If you decide to deploy this application to production:
- Use httpOnly cookies instead of sessionStorage for token storage
- Restrict CORS to specific domain in serverless function
- Set up environment variables in your hosting platform
- Consider implementing token refresh mechanism
- Add rate limiting to prevent abuse
- Review and minimize OAuth scopes if needed

## OAuth Scopes

The application requests these GitHub permissions:
- `read:user` - Read user profile information
- `repo` - Access public repository information

## Validation

All validation gates have passed:
- ✅ TypeScript type check (`npx tsc -b`)
- ✅ ESLint (`npm run lint`)
- ✅ Production build (`npm run build`)

## File Structure

```
github-dashboard/
├── netlify/
│   └── functions/
│       └── callback.ts              # OAuth token exchange function
├── src/
│   ├── components/
│   │   ├── Header.tsx               # Updated with UserMenu
│   │   ├── LoginButton.tsx          # New: GitHub sign in button
│   │   ├── UserMenu.tsx             # New: User avatar + logout
│   │   ├── ProtectedRoute.tsx       # New: Route authentication guard
│   │   └── RepoCard.tsx             # New: Repository display card
│   ├── contexts/
│   │   └── AuthContext.tsx          # New: Authentication state
│   ├── hooks/
│   │   └── useGitHubRepos.ts        # New: Fetch user repositories
│   ├── pages/
│   │   ├── HomePage.tsx             # New: Home with search + login
│   │   ├── DashboardPage.tsx        # New: Protected dashboard
│   │   └── CallbackPage.tsx         # New: OAuth callback handler
│   ├── types/
│   │   └── github.ts                # Updated: Added GitHubRepo type
│   └── main.tsx                     # Updated: Added routing + auth
├── .env.local                       # Your OAuth credentials (not in Git)
├── .env.local.example               # Template for environment variables
├── netlify.toml                     # Netlify configuration
└── OAUTH_SETUP.md                   # This file
```

## Next Steps

1. Complete the GitHub OAuth app registration
2. Set up your `.env.local` file with credentials
3. Run `npm run dev:netlify`
4. Test the OAuth flow
5. Start using your authenticated dashboard!

## Additional Resources

- [GitHub OAuth Apps Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [GitHub REST API Authentication](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [React Router Protected Routes](https://ui.dev/react-router-protected-routes-authentication)

## Support

If you encounter any issues not covered in this guide:
1. Check the browser console for error messages
2. Check the terminal running `npm run dev:netlify` for server errors
3. Verify all steps in this guide have been completed
4. Review the PRP file for additional context: `PRPS/github-oauth-authentication.md`
