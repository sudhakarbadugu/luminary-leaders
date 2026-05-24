# Luminary Leaders

Luminary Leaders is a React and TypeScript digital archive of influential people across technology, markets, sports, cricket, and science. The app presents biography pages, curated story sections, comparison tools, bookmarks, dark mode, print/share actions, and offline support through a service worker.

## Features

- Home page with animated sections for leaders, traders, athletes, cricketers, scientists, blogs, methodology, stats, and bookmarks.
- Individual profile pages for technology leaders, traders, sports people, cricketers, and scientists.
- Search, filtering, bookmarking, and profile comparison flows.
- Blog listing and article pages.
- PWA manifest and service worker for installable/offline-friendly behavior.
- Dark mode, print styles, share actions, audio narration support, and an offline banner.
- Smooth scrolling and animation using Lenis, GSAP, and a particle canvas background.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Radix UI primitives
- Lucide React icons
- GSAP and Lenis
- Three.js

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Main archive landing page |
| `/leader/:id` | Technology and business leader profile |
| `/trader/:id` | Trader and investor profile |
| `/athlete/:id` | Sports person profile |
| `/cricketer/:id` | Cricketer profile |
| `/scientist/:id` | Scientist profile |
| `/blog` | Blog index |
| `/blog/:slug` | Blog article |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Project Structure

```text
public/
  icons/             PWA icons
  images/            Profile and section imagery
  manifest.json      PWA manifest
  sw.js              Service worker
src/
  components/        Shared UI and feature components
  components/ui/     Radix-based UI primitives
  data/              Biography, profile, and blog datasets
  hooks/             Dark mode and responsive hooks
  pages/             Route-level pages
  sections/          Home page sections
  styles/            Dark mode and print CSS
  utils/             Bookmarks, comparison, PWA, and helper utilities
```

## Notes

- The app uses `BrowserRouter`, so production hosting should serve `index.html` for unknown routes.
- PWA behavior is registered from `src/main.tsx` and backed by `public/sw.js`.
- Profile content and category data are stored locally under `src/data`.
