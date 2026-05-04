# .impeccable.md — Portfolio Design DNA
**Owner:** S A Herdev Anish · `anisherdev@gmail.com`  
**Last updated:** April 2026  
**Purpose:** Single source of truth for every design and implementation decision on this portfolio. Any AI assistant, new component, or future PR must read this file first.

---

## 1. Design Context

### Users & Audience Priority
1. **Primary:** Campus recruiters / internship roles — must serve info in < 60s.
2. **Secondary:** Full-time interviewers (post-grad).
3. **Tertiary:** Startup founders / hackathon judges — rewarding depth.
4. **Academic:** Professors / evaluators.

**Job to be Done:** Provide a clear, technically impressive roadmap of expertise in AIML, Fintech, and full-stack development through a modern, frictionless interface.

### Brand Personality
*Sharp, Creative, Driven.*
- **Voice:** Professional yet innovative.
- **Emotional Goal:** Evoke a sense of technical mastery (macOS Terminal aesthetic) paired with design sophistication (Glassmorphism).
- **Inspiration:** Apple's design language — restraint, material depth, and intentional whitespace.

### Aesthetic Direction
- **Theme:** Dark Mode always. High-transparency "Dark Glassmorphism".
- **Visual Tone:** Frosted material depth, thin borders, and vibrant neon/glow accents.
- **Referential Object:** macOS Terminal (three-button chrome, monospace type, clean geometry).
- **Non-negotiables:**
    - `backdrop-filter: blur(12px–20px)`
    - `background: rgba(255,255,255,0.05–0.08)`
    - `border: 1px solid rgba(255,255,255,0.10–0.15)`
    - `border-radius: 24px` (cards) / `100px` (pills/navbar).
- **Typography:** *Plus Jakarta Sans* (Sans) · *Monospace* (Terminal). Match existing font stacks exactly. WCAG AA (4.5:1) minimum for body copy.

### Design Principles
1. **Glass-First:** All containers must feel like floating frosted panels, never opaque boxes.
2. **Tactile Motion:** Hover lift (`translateY(-2px)`), staggered mount transitions (<400ms), no parallax, no bouncy physics (except specific triggers).
3. **Skeleton-Only:** Zero layout shift. Use glass-shimmer skeletons instead of spinners or blank states.
4. **Adaptive Context:** Mobile and Desktop are distinct layouts (e.g., Terminal is a bottom sheet on mobile, a floating panel on desktop).
5. **Easter Egg Philosophy:** Power-user features (Terminal) should delight without blocking basic recruiter access.

---

## 2. Technical Architecture

### Data Layer
- **Source of Truth:** GitHub Gist (VITE_GIST_ID). Allows updating resume/projects without rebuilding.
- **Local Fallback:** `src/config/projects.config.ts`.
- **Fetching:** `useProjectConfig` hook handles Gist JSON parsing. `useGitHubRepo` hook fetches real-time stars/metadata from GitHub API.
- **Security:** Use `VITE_GITHUB_PAT` for higher rate limits; sanitize inputs.

### Routing & Structure
- **Frame:** `react-router-dom` with a persistent `Navbar`, `MobileNav`, and `BgBlobs`.
- **Main Pages:** `HomePage` (High-level summary) · `ProjectsPage` (Comprehensive project catalog).
- **Persistence:** Terminal state in `sessionStorage`.

---

## 3. Component Specification: The Terminal

### Chrome & Interaction
- macOS Traffic Lights: Red `#FF5F57` (Close) · Yellow `#FFBD2E` (Minimize) · Green `#28C840` (Expand/Reset).
- Monospace output · instant rendering (except `whoami` which iterates at 300ms/char).
- Commands: `help`, `whoami`, `skills`, `projects`, `contact`, `git log`, `clear`.
- Pulse notification: Discrete pulsing dot on trigger for first-time discoverability only.

---

## 4. Maintenance & Patterns

### Loading: Glass Skeletons
- `bg: rgba(255,255,255,0.06)` with a `1.5s linear` left-to-right sweep gradient.

### Anti-Patterns (Forbidden)
- **Hard-coded hex values** in components (all colors must use CSS variables in `index.css`).
- **Layout shift**: Matches skeletons exactly to content dimensions.
- **Spinners**: Never use standard loading spinners.
- **Section removal**: Never modify the immutable About section quote or delete key info.

---

## 5. Session Constraints for AI Assistants (Stop Conditions)

Stop and ask before:
1. Modifying any file outside `src/`.
2. Touching global CSS variables in `index.css`.
3. Adding new external dependencies.
4. Modifying the locked About section quote (Section 6 in previous version, Section 1.3 here).

After every file edit, output: `✅ [filename] — [what changed in one line]`
Stop and ask if: any command needs data not yet available, or any glass class pattern is ambiguous.
```,StartLine:90,TargetContent: