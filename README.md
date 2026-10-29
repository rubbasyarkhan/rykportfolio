# Rubbas Yar Khan | Creative Developer & UI/UX Designer

Personal portfolio and creative development showcase of **Rubbas Yar Khan (RUBBAS .YK)**. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and GSAP motion. Designed with a design-first mindset and developer-level execution, highlighting high-contrast editorial typography, dynamic dual-theme transitions, physics-based smooth scrolling, and an interactive digital showcase.

- **Live URL**: [https://rubbasyarkhan.netlify.app](https://rubbasyarkhan.netlify.app)
- **Sitemap**: [https://rubbasyarkhan.netlify.app/sitemap.xml](https://rubbasyarkhan.netlify.app/sitemap.xml)
- **Robots**: [https://rubbasyarkhan.netlify.app/robots.txt](https://rubbasyarkhan.netlify.app/robots.txt)

---

## 🌟 Key Highlights & Architecture

- **Next.js 14 App Router (SSG)**: Pre-rendered static pages for instant load speeds, optimal SEO, and zero client-side hydration delays.
- **Enterprise SEO & Meta Architecture**: Server-rendered canonical URLs, OpenGraph images, Twitter summary cards, dynamic `sitemap.xml`, and unblocked `robots.txt` for Googlebot.
- **Schema.org Structured Data**: Rich JSON-LD injection for `Person`, `WebSite`, and `CreativeWork` across all pages for rich search snippets and Knowledge Graph eligibility.
- **Translucent Frosted Glass Navbar**: Modern see-through blurred navbar (`backdrop-filter: blur(12px) saturate(180%)`) that dynamically adapts text contrast and borders based on the active section theme under the navbar.
- **Fast Circular Curtain Transitions**: Reusable circular clip-path page transitions (`<TransitionLink>`) with snappy, cinematic page wipe animations.
- **Dual-Theme System**: Dynamic switching between Obsidian Dark (`#0B0D10`) and Linen Light (`#F1EFEB`), powered by GSAP ScrollTrigger intersection observers.
- **Lenis Smooth Scroll & GSAP Sync**: Native physics-based smooth scrolling integrated with the GSAP ticker for stutter-free scrolling and scrubbing.
- **Interactive Chromatic Canvas & 3D Tilt Avatar**: Interactive canvas trail on light sections and mouse-reactive 3D perspective avatar on the about section.
- **Accessible Contact Experience**: Interactive form with active terracotta orange borders (`#ef9d71`), custom select dropdown arrow, FormSubmit AJAX integration, and smart footer CTA suppression.
- **Next-Gen Image Formats**: Next.js image configuration serving AVIF and WebP with priority loading on Above-The-Fold hero media.

---

## 🚀 Featured Projects

The portfolio showcases 7 curated case studies with detailed deliverable breakdowns and gallery assets:

1. **Azizography Studio** — Visual Arts, Architectural Photography & Creative Studio
2. **K-Town Cypher** — Hip-Hop & Streetwear Platform
3. **Carving Production Agency** — Creative Agency Portfolio & Production Suite
4. **Coffee Shop Mobile App** — Specialized E-Commerce & Ordering Mobile App
5. **The Kashmiri Aesthetic** — Cultural Preservation & High-End Textile Storefront
6. **Personal Tax Assistant** — AI-Powered Financial Document & Tax Analysis Platform
7. **Solitary Brand Identity** — Minimalist Modern Fashion Brand & Digital Retail App

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Generation)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animation**: [GSAP 3](https://greensock.com/) (ScrollTrigger)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Icons
- **Deployment**: [Netlify](https://www.netlify.com/) (Automated CI/CD via `netlify.toml` with `@netlify/plugin-nextjs`)

---

## 🔍 SEO & Webmaster Configuration

### 1. Dynamic Sitemap & Robots.txt
- **Sitemap Generator**: `src/app/sitemap.ts` generates dynamic entries for the home page, static routes (`/work`, `/about`, `/contact`), and all 7 case studies with timestamps, change frequencies, and priority tags.
- **Robots Directives**: `src/app/robots.ts` explicitly unblocks Googlebot and all search engine crawlers (`Allow: /`), points directly to `${siteUrl}/sitemap.xml`, and disallows private internal routes.

### 2. Google Search Console Verification
The layout automatically injects Google Site Verification via the `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` environment variable or direct HTML meta tag.

To verify your domain in Google Search Console:
1. Open [Google Search Console](https://search.google.com/search-console).
2. Choose **URL prefix**: `https://rubbasyarkhan.netlify.app`.
3. Under **HTML tag**, copy the code value and set it in Netlify environment variables as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (or use Netlify DNS verification).
4. Go to **Sitemaps** in Google Search Console and submit: `sitemap.xml`.

---

## 📁 Project Structure

```text
rykportfolio/
├── AGENT.md                       # Complete guidelines & context for AI coding agents
├── netlify.toml                   # Netlify build configuration & Next.js plugin
├── package.json                   # Dependencies and npm scripts
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind design tokens, fonts & animations
├── public/                        # Static assets
│   └── assets/
│       ├── fonts/                 # Neue-Machina, PPNeueMachina, Satoshi
│       └── images/                # High-resolution project screenshots & avatars
└── src/
    ├── app/                       # Next.js App Router (Server Components with Metadata)
    │   ├── layout.tsx             # Root layout (MetadataBase, JSON-LD Schema, Googlebot Directives)
    │   ├── sitemap.ts             # Dynamic XML sitemap generator
    │   ├── robots.ts              # Dynamic robots.txt generator
    │   ├── globals.css            # Base styles, CSS variables, custom cursors & utilities
    │   ├── not-found.tsx          # Bespoke 404 error page
    │   ├── page.tsx               # Homepage Server Component (Canonical, OG Metadata)
    │   ├── work/page.tsx          # Work page Server Component
    │   ├── about/page.tsx         # About page Server Component
    │   ├── contact/page.tsx       # Contact page Server Component
    │   └── projects/[slug]/page.tsx # Dynamic SSG project detail routes (CreativeWork JSON-LD)
    ├── components/
    │   ├── views/                 # Client animation views (HomeView, WorkView, AboutView, ContactView)
    │   ├── layout/                # Navbar, FullMenu, Footer, PageTransition
    │   ├── interactive/           # SmoothScroll, CustomCursor, ChromaticCanvas, Ryk3DAvatar
    │   └── ui/                    # ProjectCard, DisciplineCard, SocialIcons
    └── data/
        └── projects.ts            # Project database (7 projects, gallery imagery, metadata)
```

---

## 💻 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/rubbasyarkhan/rykportfolio.git
cd rykportfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start -- -p 3000
```

---

## 🌐 Deploy to Netlify

This repository is pre-configured with `netlify.toml` for seamless deployment:

1. Push your code to GitHub: `git push origin main`.
2. Log in to [Netlify](https://app.netlify.com/) and click **"Add new site" > "Import an existing project"**.
3. Select **GitHub** and choose the `rubbasyarkhan/rykportfolio` repository.
4. Netlify will auto-detect the Next.js runtime from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Click **"Deploy site"** — your portfolio will build and deploy live in under 2 minutes.

---

## 📄 License

© 2026 Rubbas Yar Khan. All rights reserved.
