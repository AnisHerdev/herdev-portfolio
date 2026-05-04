# S A Herdev Anish — Developer Portfolio

A modern, interactive portfolio website showcasing full-stack development expertise in AIML, Fintech, and web technologies. Built with React + Vite, featuring a unique macOS-inspired terminal interface and dynamic project showcase with GitHub integration.

**Live:** [herdev-portfolio.vercel.app](https://herdev-portfolio.vercel.app)

---

## Overview

This portfolio is designed for campus recruiters, hiring managers, and tech enthusiasts seeking a rapid yet technically impressive overview of a developer's skillset. It combines:

- **Clean, responsive design** with dark glassmorphism aesthetics
- **Interactive terminal interface** for a memorable user experience
- **Dynamic project data** fetched from GitHub and Gist
- **Optimized performance** with lazy-loaded pages and glass skeleton loaders

Intended for **AIML and Fintech-focused roles**, with emphasis on full-stack capabilities, cloud deployment, and modern frontend architecture.

---

## Key Features

- **macOS-Style Terminal Interface** — Interactive command-line experience with custom commands (`whoami`, `skills`, `projects`, `contact`, `git log`, `help`)
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile with adaptive layouts
- **GitHub Integration** — Real-time project metadata, stars, and README content via GitHub API
- **Dynamic Content** — Projects and resume pulled from GitHub Gist for easy updates without rebuilding
- **Glass Morphism UI** — High-transparency frosted-glass components with smooth animations
- **Dark Mode** — Premium dark theme with vibrant accent colors
- **Performance Optimized** — Lazy-loaded pages, skeleton loaders, and optimized asset delivery
- **Zero Layout Shift** — Skeleton loaders match content dimensions exactly

---

## Technology Stack

### Frontend
- **React** 19.2.4 — UI library
- **Vite** 8.0.1 — Build tool with Hot Module Replacement (HMR)
- **React Router DOM** 7.13.2 — Client-side routing
- **React Markdown** 10.1.0 + remark-gfm 4.0.1 — Markdown rendering with GitHub Flavored Markdown support
- **TypeScript** — Type safety for components and hooks

### Development Tools
- **ESLint** 9.39.4 — Code quality and linting
- **Vite Plugin React** 6.0.1 — Fast Refresh and JSX support

### Hosting & Deployment
- **Vercel** — Serverless deployment with zero-config setup

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **bun** (project uses Bun as package manager)
- **Git** for version control

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anisherdev/herdev-portfolio.git
cd herdev-portfolio
```

2. Install dependencies:
```bash
bun install
# or with npm
npm install
```

3. Configure environment variables:

Create a `.env.local` file in the project root:

```
VITE_GIST_ID=<your-github-gist-id>
VITE_GITHUB_PAT=<your-github-personal-access-token>
```

**Note:** 
- `VITE_GIST_ID` — GitHub Gist ID containing your projects configuration (JSON format)
- `VITE_GITHUB_PAT` — GitHub Personal Access Token for higher API rate limits (optional for development)

### Running the Project Locally

**Development mode** with hot reload:
```bash
bun run dev
# or
npm run dev
```

The site will be available at `http://localhost:5173`

**Build for production:**
```bash
bun run build
# or
npm run build
```

**Preview the production build:**
```bash
bun run preview
# or
npm run preview
```

**Lint the codebase:**
```bash
bun run lint
# or
npm run lint
```

---

## Usage

### Navigation

- **Home Page** — Summary of skills, featured projects, and quick contact
- **Projects Page** — Full catalog of projects with filtering by technology
- **Terminal** — Interactive command-line interface for deeper engagement

### Terminal Commands

Type any of these commands in the Terminal page:

- `help` — Display available commands
- `whoami` — Animated introduction
- `skills` — Display technical expertise
- `projects` — List featured projects
- `contact` — Show contact information
- `git log` — Display commit history
- `clear` — Clear terminal output

### Project Configuration

Projects are managed in two ways:

1. **Local Configuration** — `src/config/projects.config.ts` (fallback)
2. **Dynamic via GitHub Gist** — JSON data pulled from a GitHub Gist ID (recommended for live updates)

To update projects without rebuilding, edit the Gist and the changes will reflect on the next page load.

### GitHub Integration

The portfolio fetches real-time GitHub metadata (stars, forks, watchers) for projects. Ensure your GitHub Personal Access Token has `public_repo` scope.

---

## Project Structure

```
src/
├── pages/
│   ├── HomePage.tsx           — Landing page with hero, about, and featured projects
│   ├── ProjectsPage.tsx        — Full project catalog with filtering
│   └── TerminalPage.tsx        — Interactive terminal interface
├── components/
│   ├── Navbar.jsx             — Top navigation bar
│   ├── MobileNav.jsx          — Mobile drawer navigation
│   ├── BgBlobs.jsx            — Animated background blobs
│   ├── Hero.jsx               — Hero section
│   ├── About.jsx              — About section
│   ├── Skills.jsx             — Skills showcase
│   ├── Projects.jsx           — Featured projects
│   ├── Contact.jsx            — Contact section
│   ├── ProjectCard.tsx        — Individual project card
│   ├── ProjectModal.tsx       — Project detail modal
│   ├── ProjectsGrid.tsx       — Projects grid layout
│   ├── LoadingSkeletons.tsx   — Glass skeleton loaders
│   ├── Footer.jsx             — Footer
│   └── TerminalOS/            — Terminal component suite
│       ├── MacDesktop.tsx     — Terminal wrapper
│       ├── MacMenubar.tsx     — Menu bar
│       ├── MacWindow.tsx      — Window chrome
│       ├── TerminalEngine.tsx — Command processor
│       ├── TerminalInput.tsx  — Input field
│       ├── TerminalOutput.tsx — Output rendering
│       └── commands/          — Command handlers
│           ├── whoami.tsx
│           ├── skills.tsx
│           ├── projects.tsx
│           ├── contact.tsx
│           ├── help.tsx
│           ├── gitlog.tsx
│           └── welcome.tsx
├── hooks/
│   ├── useBootSequence.ts     — Terminal boot animation
│   ├── useProjectConfig.ts    — Fetch project configuration
│   ├── useGitHubRepo.ts       — GitHub API integration
│   ├── useReadme.ts           — Fetch GitHub README content
│   └── useTerminalState.ts    — Terminal state management
├── config/
│   └── projects.config.ts     — Local project configuration (fallback)
├── types/
│   └── project.types.ts       — TypeScript type definitions
├── App.jsx                    — Root component with routing
├── index.css                  — Global styles and CSS variables
└── main.jsx                   — React entry point
```

**Key Directories:**
- `src/pages/` — Page-level components corresponding to routes
- `src/components/TerminalOS/` — Modular terminal interface system
- `src/hooks/` — Custom React hooks for data fetching and state management
- `src/config/` — Static configuration (projects, constants)

---

## Design System

### Glass Morphism

The portfolio uses a consistent glass-morphism aesthetic:

```css
backdrop-filter: blur(12px-20px);
background: rgba(255, 255, 255, 0.05-0.08);
border: 1px solid rgba(255, 255, 255, 0.10-0.15);
border-radius: 24px;
```

All color and spacing values are stored in CSS variables in `index.css` for consistency and easy theming.

### Typography

- **Sans Serif:** Plus Jakarta Sans (headers, body)
- **Monospace:** Monospace stack (terminal, code blocks)
- **Accessibility:** WCAG AA standard (4.5:1 contrast minimum)

---

## Deployment

### Vercel (Recommended)

The project is pre-configured for Vercel deployment:

```bash
bun run build
bunx vercel deploy --prod
```

Environment variables should be set in the Vercel dashboard under **Settings > Environment Variables**.

### Other Platforms

This is a standard Vite + React SPA. The `dist/` folder after `npm run build` can be deployed to any static hosting:
- GitHub Pages
- Netlify
- AWS S3 + CloudFront
- Any CDN

---

## Performance Considerations

- **Lazy Loading** — Pages are code-split with `React.lazy()` and `Suspense`
- **Skeleton Loaders** — Glass skeleton placeholders prevent layout shift
- **Image Optimization** — Assets in `public/` are automatically optimized by Vite
- **Bundle Splitting** — Dependencies are separated for browser caching

---

## Development Notes

### Code Quality

- Run `bun run lint` or `npm run lint` before committing
- TypeScript is enabled for new components (`*.tsx` files)
- ESLint config extends `@eslint/js` with React hooks and refresh rules

### Important Design Constraints

Refer to [PRODUCT.md](PRODUCT.md) for detailed design specifications, brand personality, and component patterns.

**Key Rules:**
- Do not use hard-coded hex color values in components; use CSS variables
- Glass morphism components must follow the blur and background specifications
- Terminal traffic lights: Red `#FF5F57`, Yellow `#FFBD2E`, Green `#28C840`
- Avoid layout shift; use skeleton loaders instead of spinners

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5173 already in use | Change port: `vite --port 3000` |
| Environment variables not loading | Ensure `.env.local` is in the project root and restart dev server |
| GitHub API rate limiting | Add `VITE_GITHUB_PAT` environment variable |
| Projects not appearing | Verify `VITE_GIST_ID` is correct and Gist is publicly accessible |
| TypeScript errors in components | Run `npm run lint` and check `tsconfig.json` |

---

## Contributing

This is a personal portfolio. For significant changes or improvements, open an issue or discussion before submitting a pull request.

---

## License

MIT License — See LICENSE file for details.

---

## Contact

**S A Herdev Anish**  
Email: [anisherdev@gmail.com](mailto:anisherdev@gmail.com)  
Portfolio: [herdev-portfolio.vercel.app](https://herdev-portfolio.vercel.app)  
GitHub: [@herdev-anish](https://github.com/herdev-anish)
