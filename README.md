# sachi.dev

Personal portfolio website built with Next.js 16, featuring a blog and project showcase.

**Live:** [https://sachi.dev](https://sachi.dev)

## Tech Stack

- **Framework:** Next.js 16 with React 19
- **Runtime:** Bun
- **Styling:** Tailwind CSS 4
- **Content:** Velite (MDX-based content management)
- **UI Components:** Radix UI, Framer Motion
- **Deployment:** Cloudflare Workers (via OpenNext)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A [Cloudflare](https://dash.cloudflare.com/) account (for deployment)

### Local Development

```bash
# Install dependencies
bun install

# Run development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── content/
│   ├── blogs/          # MDX blog posts
│   ├── projects/       # MDX project descriptions
│   └── assets/         # Content images
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   ├── config/         # Site configuration
│   ├── lib/            # Utility functions
│   ├── styles/         # Global styles
│   └── types/          # TypeScript types
├── resume/             # Resume LaTeX source (builds to public/sachi.pdf)
├── public/             # Static assets
└── velite.config.ts    # Velite content configuration
```

## Deployment

Deployed on **Cloudflare Workers** using [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare). Worker settings live in `wrangler.jsonc`.

### First-Time Setup

Log in to Cloudflare:

```bash
bunx wrangler login
```

### Preview Locally

Runs the production build in the Workers runtime:

```bash
bun run preview
```

### Deploy

```bash
bun run deploy
```

## Resume

The resume source lives in `resume/resume.tex`. Edit it, run `bun run resume`, and commit both the `.tex` and the generated `public/sachi.pdf`. `/resume` redirects to that PDF. Building needs a LaTeX install with `latexmk` (for example MacTeX).

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run resume` | Build `resume/resume.tex` into `public/sachi.pdf` (needs a LaTeX install) |
| `bun run preview` | Build and preview in the Workers runtime |
| `bun run deploy` | Deploy to Cloudflare Workers |
| `bun run cf-typegen` | Generate Cloudflare env types |

## License

MIT
