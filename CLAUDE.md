# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun install          # Install dependencies
bun run dev          # Start dev server (runs Velite then Next.js)
bun run build        # Production build (Velite + Next.js)
bun run start        # Start production server
bun run lint         # Run ESLint
bun run resume       # Build resume/resume.tex into public/sachi.pdf (needs latexmk)
bun run preview      # Build with OpenNext and preview locally in the Workers runtime
bun run deploy       # Build with OpenNext and deploy to Cloudflare Workers
bun run cf-typegen   # Generate Cloudflare env types (cloudflare-env.d.ts)
```

## Architecture

### Content System (Velite + MDX)
- **Content source:** `content/blogs/` and `content/projects/` contain MDX files
- **Build output:** Velite processes MDX at build time, outputs to `.velite/` directory
- **Import alias:** Use `#site/content` to import generated content (e.g., `import { blogs, projects } from "#site/content"`)
- **Schema defined in:** `velite.config.ts` - defines blog/project fields, categories, and MDX processing pipeline

### Key Path Aliases
- `@/*` → `./src/*` (source code imports)
- `#site/content` → `./.velite` (Velite-generated content)

### Component Organization
- `src/components/ui/` - Reusable Radix UI-based components (button, card, dialog, etc.)
- `src/components/mdx/` - MDX rendering components (code blocks, TOC, callouts)
- `src/components/sections/` - Page sections (intro, about, projects, recent-blogs)
- `src/components/blogs/` - Blog-specific components

### SEO
- Site title, description, and socials live in `src/config/site.config.ts`
- OG images: `src/app/opengraph-image.tsx` (site) and `src/app/(main)/blogs/[slug]/opengraph-image.tsx` (posts), both rendered at build time via `src/lib/og.tsx` with Geist fonts from `src/assets/fonts/`. Keep them static: runtime image generation fails on Cloudflare Workers
- `src/app/sitemap.ts` and `src/app/robots.ts`; Person JSON-LD on the home page

## Content Categories
- **Blogs:** development, open-source, thoughts, tutorial, ui-component
- **Projects:** fullstack, frontend, backend, cli

## Deployment
- Deployed on Cloudflare Workers via `@opennextjs/cloudflare`
- Worker config lives in `wrangler.jsonc`; OpenNext config in `open-next.config.ts` (R2 incremental cache with a Durable Object revalidation queue)
- `/resume` redirects to `/sachi.pdf` (a rewrite 404s on Cloudflare, since `public/` is served by the assets layer)
