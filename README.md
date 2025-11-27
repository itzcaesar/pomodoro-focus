# Pomodoro Focus

A production-ready, highly aesthetic Pomodoro timer built with React, TypeScript, and Tailwind CSS.

## Features
- Focus, Short Break, Long Break modes
- Customizable timer durations
- Auto-start options for flows
- Light/Dark mode
- Sound notifications
- LocalStorage persistence
- Accurate timing using timestamps
- Keyboard shortcuts (Space to toggle, R to reset)

## Deployment on Vercel

This project is optimized for Vercel deployment as a Single Page Application (SPA).

1. **Prerequisites**: Ensure you have a GitHub/GitLab/Bitbucket repository with this code.

2. **Project Structure**:
   Ensure your repository root looks like this:
   ```
   / (root)
     index.html
     index.tsx
     App.tsx
     ... (other files)
     package.json (needed for dependencies)
     vite.config.ts (or similar build tool config)
   ```

   *Note: Since this code generation provides raw files, you will need to initialize a Vite project first to get the build configuration.*

3. **Quick Start (Local)**:
   ```bash
   npm create vite@latest my-pomodoro -- --template react-ts
   cd my-pomodoro
   npm install lucide-react
   # Replace src/ files with the provided code files.
   # Move index.html to root if using Vite.
   npm run dev
   ```

4. **Vercel Steps**:
   - Log in to [Vercel](https://vercel.com).
   - Click "Add New..." -> "Project".
   - Import your git repository.
   - **Framework Preset**: Select "Vite" (recommended) or "Create React App" depending on your bundler.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist` (for Vite) or `build` (for CRA).
   - Click **Deploy**.

## Tech Stack
- React 18
- TypeScript
- Tailwind CSS (via CDN for simplicity in this snippet, but recommended via PostCSS in production)
- Lucide React (Icons)