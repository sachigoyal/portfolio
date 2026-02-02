# sachi.dev

Personal portfolio website built with Next.js 16, featuring a blog, project showcase, and AI-powered interactions.

**Live:** [https://sachi-dev-363173282038.asia-south1.run.app](https://sachi-dev-363173282038.asia-south1.run.app)

## Tech Stack

- **Framework:** Next.js 16 with React 19
- **Runtime:** Bun
- **Styling:** Tailwind CSS 4
- **Content:** Velite (MDX-based content management)
- **UI Components:** Radix UI, Framer Motion
- **AI:** Google Gemini API
- **Deployment:** Google Cloud Run

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- (Optional) [Docker](https://www.docker.com/) for containerized development

### Environment Variables

Create a `.env.local` file:

```bash
GEMINI_API_KEY=your_gemini_api_key
```

### Local Development

```bash
# Install dependencies
bun install

# Run development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Docker Development

```bash
# Development mode with hot reload
bun run docker:dev

# Production build
bun run docker:prod
```

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
├── public/             # Static assets
└── velite.config.ts    # Velite content configuration
```

## Deployment

Deployed on **Google Cloud Run** (Asia South 1 region).

### Deploy to GCP

```bash
bun run deploy
```

This command:
1. Builds the Docker image using Cloud Build
2. Deploys to Cloud Run with the configured environment variables
3. Makes the service publicly accessible

### Manual Deployment

```bash
gcloud run deploy sachi-dev \
  --source . \
  --region=asia-south1 \
  --allow-unauthenticated \
  --set-env-vars=GEMINI_API_KEY=$GEMINI_API_KEY
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run docker:dev` | Run dev server in Docker |
| `bun run docker:prod` | Build and run production in Docker |
| `bun run deploy` | Deploy to GCP Cloud Run |

## License

MIT
