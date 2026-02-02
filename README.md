# sachi.dev

Personal portfolio website built with Next.js 16, featuring a blog, project showcase, and AI-powered interactions.

**Live:** [https://sachi-dev-809350176771.asia-southeast1.run.app](https://sachi-dev-809350176771.asia-southeast1.run.app)

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

Deployed on **Google Cloud Run** (Asia Southeast 1 region).

### Prerequisites

1. Install [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)
2. Authenticate with your Google account:
   ```bash
   gcloud auth login
   ```
3. Set your project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

### First-Time Setup

On first deployment, GCP will prompt you to enable required APIs:
- `artifactregistry.googleapis.com`
- `cloudbuild.googleapis.com`
- `run.googleapis.com`

**Grant IAM permissions** to the default Compute Engine service account. Replace `PROJECT_NUMBER` with your project number (found in GCP Console):

```bash
# Grant Cloud Build permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.builder"

# Grant Storage permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

# Grant Cloud Run permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/run.admin"

# Grant Service Account User permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

> **Tip:** Find your project number by running `gcloud projects describe YOUR_PROJECT_ID --format="value(projectNumber)"`

### Deploy

```bash
bun run deploy
```

This command:
1. Loads environment variables from `.env.local`
2. Builds the Docker image using Cloud Build
3. Deploys to Cloud Run with the configured environment variables
4. Makes the service publicly accessible

### Manual Deployment

```bash
source .env.local && gcloud run deploy sachi-dev \
  --source . \
  --region=asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars=GEMINI_API_KEY=$GEMINI_API_KEY
```

### Troubleshooting

**Permission Denied Error:**
If you see `PERMISSION_DENIED: Build failed because the default service account is missing required IAM permissions`, follow the "First-Time Setup" section above to grant the necessary roles.

**Switch GCP Account:**
```bash
# List authenticated accounts
gcloud auth list

# Switch to a different account
gcloud config set account YOUR_EMAIL@gmail.com

# Or login with a new account
gcloud auth login
```

**Environment Variable Validation Errors (e.g., "must be a valid URL"):**
Do not use quotes around values in `.env.local`. The deploy script passes values literally to Cloud Run, so quoted values will have embedded quotes.

```bash
# Wrong - quotes become part of the value
UPSTASH_REDIS_REST_URL="https://example.upstash.io"

# Correct - no quotes
UPSTASH_REDIS_REST_URL=https://example.upstash.io
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
