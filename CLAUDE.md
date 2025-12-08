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

## Design System

This project uses a comprehensive design system imported from Figma with design tokens defined in CSS custom properties.

### Design Tokens Location
All design tokens are located in `src/styles/` directory:
- `colors.css` - Color palette and semantic color tokens
- `typography.css` - Typography presets and font configuration
- `spacing.css` - Spacing scale
- `radius.css` - Border radius values
- `index.css` - Main entry point that imports all token files

### Styling Approach
- **CSS Custom Properties (CSS Variables)** for all design tokens
- **Plain CSS** - No CSS-in-JS or utility frameworks (Tailwind not used)
- Import design system in your components: `import '../styles/index.css'`

### Color System
**Neutral Colors**: 9 shades from neutral-0 (white) to neutral-900 (dark blue-black)
- Primary text: `var(--color-neutral-900)` (#141d2f)
- Secondary text: `var(--color-neutral-500)` (#4b6a9b)
- Background: `var(--color-neutral-100)` (#f6f8ff)

**Brand Colors**:
- Primary blue: `var(--color-blue-500)` (#0079ff)
- Hover blue: `var(--color-blue-300)` (#60abff)
- Error red: `var(--color-red-500)` (#f74646)

**Semantic Aliases**: Use semantic tokens (e.g., `--color-primary`, `--color-text-primary`) instead of direct color references for better maintainability.

### Typography System
**Font Family**: Space Mono (monospace) - weights 400 (regular) and 700 (bold)

**Text Presets**: 8 predefined text styles accessible via CSS custom properties or utility classes:
- `text-preset-1`: 26px bold, 1.2 line-height (main headings)
- `text-preset-2`: 22px bold, 1.4 line-height (subheadings)
- `text-preset-3`: 18px regular, 1.4 line-height (13px on mobile)
- `text-preset-4`: 16px regular, 1.5 line-height (body text)
- `text-preset-5`: 16px bold, 1.5 line-height (emphasized body)
- `text-preset-6`: 15px regular, 1.5 line-height
- `text-preset-7`: 13px regular, 1.5 line-height (small text)
- `text-preset-8`: 13px bold, 1.4 line-height, 2.5px letter-spacing (labels/tags)

Usage: Apply via class names (`.text-preset-1`) or CSS variables (`font-size: var(--text-preset-1-size)`)

### Spacing System
14-step spacing scale using 8px base increment:
- `--spacing-0` to `--spacing-1000` (0px to 80px)
- Common values: 8px, 16px, 24px, 32px, 40px, 48px, 64px, 80px
- Use for padding, margins, gaps: `padding: var(--spacing-200)` (16px)

### Border Radius System
10-step radius scale:
- `--radius-0` to `--radius-24` (0px to 24px)
- `--radius-full` (999px) for fully rounded elements
- Common values: 10px for cards, 8px for buttons

### Component Patterns
When implementing Figma designs:
1. Use CSS custom properties from the design system
2. Do NOT use Tailwind classes (project uses plain CSS)
3. Create component-specific CSS files co-located with components
4. Follow the established naming conventions for CSS classes
