# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun install          # Install dependencies
bun run dev          # Start dev server (runs Velite then Next.js)
bun run build        # Production build (Velite + Next.js)
bun run start        # Start production server
bun run lint         # Run ESLint
bun run docker:dev   # Development in Docker with hot reload
bun run docker:prod  # Production Docker build
bun run deploy       # Deploy to Google Cloud Run (requires gcloud CLI)
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

### API Routes
- `/api/gemini` - Streaming Gemini AI chat endpoint (uses ReadableStream)
- `/api/og` - Dynamic OG image generation with @vercel/og

### Environment Variables
- `GEMINI_API_KEY` - Required for AI chat functionality (set in `.env.local`)

## Content Categories
- **Blogs:** development, open-source, thoughts, tutorial, ui-component
- **Projects:** fullstack, frontend, backend, cli

## Deployment
- Deployed on Google Cloud Run (asia-southeast1)
- `next.config.ts` uses `output: "standalone"` for containerized deployment
- `/resume` URL rewrites to `/sachi.pdf`
