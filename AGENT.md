# Antigravity Agent Guide — Rubbas Yar Khan Portfolio

This guide provides everything an AI coding agent (such as Google Antigravity) needs to understand, develop, build, and maintain this portfolio on any laptop or environment.

---

## 1. Project Overview & Tech Stack

A high-performance, editorial-grade creative developer & UI/UX portfolio built with:
- **Framework**: Next.js 14 (App Router, Static Site Generation / SSG)
- **Language**: TypeScript (`strict` mode)
- **Styling**: Tailwind CSS 3.4 with custom variables and plugins
- **Animation & Motion**: GSAP 3 (ScrollTrigger) & Lenis smooth scrolling
- **Icons**: Lucide React + custom SVG icons (`SocialIcons.tsx`)
- **Hosting / Deployment**: Vercel / Netlify / Node production server

---

## 2. Quick Setup & Run Commands

Run these from the project root:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (http://localhost:3000)
npm run dev

# 3. Create an optimized production build
npm run build

# 4. Start production server locally
npm run start -- -p 3000
```

> **Windows PowerShell Note**: Avoid chaining commands with `&&` (e.g. `npm run build && npm run start`). Run them as separate commands or separate with a semicolon `;`.

---

## 3. Directory Structure

```
rykportfolio/
├── AGENT.md                       # This instructions file for AI agents
├── netlify.toml                   # Netlify build configuration & Next.js plugin
├── package.json                   # Dependencies and npm scripts
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind design tokens, typography & animations
├── next.config.mjs                # Next.js configuration
├── public/                        # Static assets (fonts, images, icons, favicons)
│   └── assets/
│       ├── fonts/                 # Neue-Machina, PPNeueMachina, Satoshi
│       └── images/                # Project hero & gallery screenshots, 3D avatar
└── src/
    ├── app/                       # Next.js App Router (Server Components with Metadata)
    │   ├── layout.tsx             # Root layout (MetadataBase, JSON-LD Schema, Googlebot Directives)
    │   ├── sitemap.ts             # Dynamic XML sitemap generator (/sitemap.xml)
    │   ├── robots.ts              # Dynamic robots.txt generator (/robots.txt)
    │   ├── globals.css            # CSS variables, typography, custom cursors & utilities
    │   ├── not-found.tsx          # Custom 404 page
    │   ├── page.tsx               # Homepage Server Component (Canonical, OG Metadata)
    │   ├── work/page.tsx          # Work page Server Component
    │   ├── about/page.tsx         # About page Server Component
    │   ├── contact/page.tsx       # Contact page Server Component
    │   └── projects/[slug]/page.tsx # Dynamic project detail page (SSG with generateStaticParams)
    ├── components/
    │   ├── views/                 # Client animation views (HomeView, WorkView, AboutView, ContactView)
    │   ├── layout/
    │   │   ├── Navbar.tsx         # See-through frosted glass navbar with real-time theme adaptation
    │   │   ├── FullMenu.tsx       # Fullscreen circular curtain menu with morphing hamburger 'X'
    │   │   ├── Footer.tsx         # Responsive footer with smart contact CTA suppression
    │   │   └── PageTransition.tsx # Reusable circular wipe page transition (<TransitionLink>)
    │   ├── interactive/
    │   │   ├── SmoothScroll.tsx   # Lenis smooth scroll provider
    │   │   ├── CustomCursor.tsx   # Inverting custom cursor with auto-hide over inputs
    │   │   ├── ChromaticCanvas.tsx# Interactive drawing canvas on light theme sections
    │   │   └── Ryk3DAvatar.tsx    # 3D interactive tilt avatar
    │   └── ui/
    │       ├── ProjectCard.tsx    # Reusable work card with category labels
    │       ├── DisciplineCard.tsx # Animated capability card
    │       └── SocialIcons.tsx    # Brand SVG icons (Instagram, LinkedIn, GitHub, Dribbble, Pinterest)
    ├── data/
    │   └── projects.ts            # Project database (7 projects, gallery images, deliverables, labels)
    └── types/
        ├── index.ts               # Core TypeScript interfaces (Project, Discipline, etc.)
        └── css.d.ts               # CSS custom properties declarations
```

---

## 4. Key Architectural Patterns & Rules

### A. Navigation & Frosted Glass Navbar (`src/components/layout/Navbar.tsx`)
- **No `mix-blend-difference` on `<nav>`**: In Chromium/WebKit, `mix-blend-difference` creates an isolated compositing stacking context, suppressing hardware-accelerated `backdrop-filter: blur()`. Keep styling directly on `<nav>`.
- **See-Through Frosted Glass**:
  - Uses `backdrop-filter: blur(12px) saturate(180%)`.
  - Light mode: `rgba(241, 239, 235, 0.58)` when scrolled, `0.35` at top.
  - Dark mode: `rgba(11, 13, 16, 0.58)` when scrolled, `0.35` at top.
- **Dynamic Section Detection**: Evaluates sections at navbar midpoint (`Y = 45px`) and reacts to `document.body.getAttribute('theme')` mutations.
- **Hamburger 'X' Morph**: Fixed pixel math transforms:
  - Line 1: `translateY(8px) rotate(45deg)`
  - Line 2: `opacity: 0, translateX(20px)`
  - Line 3: `translateY(-8px) rotate(-45deg)` with `transformOrigin: center` when open.
- **Logo & Nav Links**: Text colors dynamically switch between `#0B0D10` (light) and `#ffffff` (dark). Hover uses rolling text revealing `#F5B942` gold.

### B. Circular Page Transitions (`src/components/layout/PageTransition.tsx`)
- All internal navigation uses `<TransitionLink href="...">` instead of Next.js `<Link>`.
- Executes a cinematic circular curtain wipe (`clipPath: circle(...)`) scaling from 0% to 150% in 0.55s, navigating via `router.push`, and expanding out in 0.5s on page arrival for a fast, responsive transition.

### C. Color Palette & Dual-Theme System
- **Dark Theme (`body[theme="black"]`)**:
  - Background: `#0B0D10`
  - Surface: `#13161B`
  - Border: `#1F232B`
  - Text Primary: `#E6E6E6`
- **Light Theme (`body[theme="white"]`)**:
  - Background: `#F1EFEB`
  - Surface: `#FFFFFF`
  - Border: `#E5E2DC`
  - Text Primary: `#0B0D10`
- **Accents**:
  - Gold Primary: `#F5B942` (links, highlights, script font accents)
  - Warm Terracotta Orange: `#ef9d71` (contact form active states & accents)

### D. Custom Cursor Behavior (`src/components/interactive/CustomCursor.tsx`)
- Only active on desktop devices matching `@media (hover: hover) and (pointer: fine)`.
- When hovering interactive links/cards, cursor scales 2.5x with `mix-blend-mode: difference`.
- **Crucial Rule**: When hovering `<input>`, `<textarea>`, or `<select>`, the custom cursor fades out (`opacity: 0`) and the native OS text I-beam (`cursor: text`) appears. Never put `cursor: none !important` on form inputs.

### E. Contact Page (`src/app/contact/page.tsx`)
- Heading: **`LET'S WORK TOGETHER`** (`text-[clamp(3.5rem,8.5vw,7rem)] font-extrabold`).
- Inputs: Resting state is `border-2 border-transparent` (no visible border lines). When focused/active, it lights up with `focus:border-[#ef9d71]`.
- Submission: AJAX `POST` to `https://formsubmit.co/ajax/rubbasyarkhan007@gmail.com` with `_captcha: "false"`, `_template: "table"`.
- Footer: `<Footer />` detects `pathname === '/contact'` and hides the duplicate `"LET'S BUILD SOMETHING"` / `"START NOW"` CTA block to avoid redundant loops.

### F. Projects Database (`src/data/projects.ts`)
Contains 7 fully detailed projects:
1. `ktown-cypher`: Hip-Hop & Streetwear Platform
2. `carving-production-agency`: Creative Agency Portfolio & Production Suite
3. `coffee-shop-mobile-app`: Specialized E-Commerce & Ordering Mobile Experience
4. `the-kashmiri-aesthetic`: Cultural Preservation & High-End Textile Storefront
5. `personal-tax-assistant`: AI-Powered Financial Document & Tax Analysis Platform
6. `azizography`: Visual Arts, Architectural Photography & Creative Studio
7. `solitary-brand-identity`: Modern Minimalist Fashion Brand & Retail Web App

When editing or adding projects, ensure both `thumbnail` and `gallery` reference valid paths in `/public/assets/images/`.

---

## 5. Verification Checklist Before Committing

Always perform these checks before pushing changes:

1. **Build verification**: Run `npm run build` and confirm all 14 static routes compile cleanly (`14/14`).
2. **Interactive test**: Test with `npm run start -- -p 3000` to confirm SSR/SSG rendering.
3. **No blend mode conflicts**: Ensure `mix-blend-difference` is not added to any container carrying `backdrop-filter`.
4. **Clean Git tree**: Verify with `git status` that no temporary build files or local logs are staged.
