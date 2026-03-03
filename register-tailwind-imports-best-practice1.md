# Tailwind CSS Setup for Vite + React

## ✅ CORRECT: Proper Global CSS Setup (Vite)
```css
/* src/index.css - This is the CORRECT way for Vite projects */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles go after the Tailwind directives */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

/* Ensure light theme is used */
* {
  color-scheme: light;
}
```

## Tailwind Configuration
```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Critical Rules

1. **Use `@tailwind` directives** - This is the correct format for Vite projects (different from Next.js)
2. **Import index.css in main entry point** - Import in `src/main.tsx` or `src/index.tsx`
3. **Place custom CSS AFTER the Tailwind directives** - not before
4. **Configure content paths** - Make sure tailwind.config.js includes all your source files

## Main Entry Point Import
```tsx
// src/main.tsx or src/index.tsx
import './index.css' // ← Import Tailwind CSS here

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## Quick Fix Checklist
- [ ] Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Initialize Tailwind: `npx tailwindcss init -p`
- [ ] Add `@tailwind` directives to `src/index.css`
- [ ] Configure `content` paths in `tailwind.config.js`
- [ ] Import `index.css` in main entry point (`src/main.tsx`)
- [ ] Restart your dev server after changes

This setup will properly configure Tailwind CSS for your Vite + React project.

