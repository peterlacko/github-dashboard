# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application for a GitHub dashboard. The project uses React 19.2.0 with TypeScript in strict mode, built with Vite 7.x.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (type-checks with tsc, then builds with vite)
npm run build

# Lint the codebase
npm run lint

# Preview production build locally
npm run preview
```

## Architecture

### Build System
- **Vite 7.x** with `@vitejs/plugin-react` for Fast Refresh using Babel
- TypeScript compilation uses project references (tsconfig.app.json for app code, tsconfig.node.json for config files)
- Build command runs TypeScript type-checking (`tsc -b`) before Vite build

### TypeScript Configuration
- Strict mode enabled with additional checks: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- Uses modern module resolution: `moduleResolution: "bundler"` with `verbatimModuleSyntax`
- Target: ES2022
- JSX: react-jsx (React 17+ automatic JSX runtime)

### Code Quality
- ESLint configured with:
  - TypeScript ESLint recommended rules
  - React Hooks rules (eslint-plugin-react-hooks)
  - React Refresh rules for Vite HMR
  - Ignores `dist` directory

### Application Structure
- Entry point: `src/main.tsx` renders the root `App` component in StrictMode
- Root element: `#root` in `index.html`
- Currently minimal structure with just an App component
