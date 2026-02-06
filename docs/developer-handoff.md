# Shrike Publishing: Developer Handoff / Emergency Guide

If Allie is unavailable and you need to keep the site running, this document has everything you need.

---

## Quick Reference

| What | Where |
|------|-------|
| **Live site** | https://shrike-publishing.com |
| **Vercel dashboard** | https://vercel.com/alliecatowos-projects/shrike-publishing |
| **GitHub repo** | https://github.com/alliecatowo/shrike-publishing |
| **Production branch** | `main` |
| **Vercel auto-deploys** | Yes, on every push to any branch |
| **Domain registrar** | GoDaddy (domain: shrike-publishing.com) |
| **Newsletter service** | [Loops](https://loops.so/) |

---

## Architecture Overview

The site is a **Nuxt 4** application (Vue.js-based framework) deployed to **Vercel** as a server-rendered (SSR) site.

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | [Nuxt 4](https://nuxt.com/) | Full-stack Vue.js framework |
| Content | [@nuxt/content v3](https://content.nuxt.com/) | Markdown-based CMS with SQLite backend |
| Editor | [nuxt-studio](https://nuxt.studio/) | Visual content editor overlay |
| UI | [Nuxt UI 4](https://ui.nuxt.com/) | Component library (buttons, cards, etc.) |
| CSS | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| Icons | [Lucide](https://lucide.dev/) via @nuxt/icon | Icon set |
| Fonts | Google Fonts via @nuxt/fonts | Merriweather Sans |
| Newsletter | [nuxt-loops](https://github.com/loops/nuxt-loops) | Loops.so integration |
| Hosting | [Vercel](https://vercel.com/) | SSR hosting with edge network |
| Repo | [GitHub](https://github.com/alliecatowo/shrike-publishing) | Source code + content |

### How It Works

1. Content (blog posts, stories, etc.) lives as Markdown files in the `content/` directory
2. The Nuxt Content module processes these into a SQLite database at build time
3. Pages in `app/pages/` query this database to render content
4. Nuxt Studio provides a visual editor overlay for non-technical editors
5. When content is saved in Studio, it commits to GitHub
6. Vercel detects the push and automatically rebuilds + deploys

---

## Accounts and Access

### Vercel

- **Account:** alliecatowo (Allie's personal Vercel account)
- **Dashboard:** https://vercel.com/alliecatowos-projects/shrike-publishing
- **Vercel handles:** Hosting, SSL certificates, build/deploy pipeline, environment variables
- **To transfer:** The project owner would need to transfer the Vercel project or re-import the repo under a new Vercel account

### GitHub

- **Repository:** https://github.com/alliecatowo/shrike-publishing
- **Owner:** alliecatowo
- **Main branch:** `main`
- **To transfer:** Allie would need to transfer repo ownership or add new collaborators in repo Settings > Collaborators

### GitHub OAuth App (for Studio login)

- **Location:** https://github.com/settings/developers (under Allie's GitHub account)
- **App name:** Shrike Publishing Studio (or similar)
- **Client ID:** `Ov23liyIw1kAZ2HbsNZm`
- **Callback URL:** `https://shrike-publishing.com/__nuxt_studio/auth/github`
- **If switching domains:** Update the callback URL to match the new domain
- **If recreating:** Create a new OAuth App at https://github.com/settings/developers, update the env vars on Vercel

### Domain (GoDaddy)

- **Domain:** shrike-publishing.com
- **DNS must point to Vercel** for the site to work
- **If DNS breaks:** Log into GoDaddy, ensure the domain's CNAME/A records point to Vercel (check Vercel dashboard > Settings > Domains for the required records)

### Newsletter (Loops)

- **Service:** https://loops.so/
- **The API key and form ID are stored as Vercel environment variables**

---

## Environment Variables (on Vercel)

These are configured in the Vercel dashboard under Settings > Environment Variables:

| Variable | Purpose |
|----------|---------|
| `STUDIO_GITHUB_CLIENT_ID` | GitHub OAuth App client ID |
| `STUDIO_GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret |
| `STUDIO_GITHUB_MODERATORS` | Comma-separated emails authorized to edit (e.g., `Allisonemilycoleman@gmail.com,shriketabletop@gmail.com`) |
| `LOOPS_API_KEY` | Loops newsletter service API key |
| `NUXT_PUBLIC_LOOPS_FORM_ID` | Loops signup form ID |

**Important:** `STUDIO_GITHUB_MODERATORS` is case-sensitive and uses emails. To add a new editor, add their GitHub account email to this comma-separated list on Vercel.

---

## Key Files and Directories

```
shrike-publishing/
  app/
    pages/            # Page components (Vue files)
    components/       # Reusable UI components
    assets/css/       # Global styles
  content/            # ALL CONTENT LIVES HERE
    blog/             # Blog posts (Markdown)
    stories/          # Stories (Markdown)
    poetry/           # Poems (Markdown)
    announcements/    # Announcements (Markdown)
    games/            # Game listings (Markdown)
    resources/        # Downloadable resources
    artwork/          # Artwork gallery entries
    portfolio/        # Portfolio items
    downloads/        # Download listings
    navigation/       # Navigation config (YAML)
    footer/           # Footer config (YAML)
    design/           # Design tokens (YAML)
    home.md           # Homepage configuration
    about.md          # About page
    contact.md        # Contact page
    support.md        # Support page
  content.config.ts   # Content collection schemas
  nuxt.config.ts      # Main Nuxt configuration
  package.json        # Dependencies
  public/             # Static assets (images, downloads, etc.)
  server/             # Server API routes (newsletter endpoint)
  docs/               # This documentation
```

---

## Common Tasks

### Adding a New Editor

1. They need a GitHub account with a verified email
2. Go to Vercel dashboard > Settings > Environment Variables
3. Edit `STUDIO_GITHUB_MODERATORS`
4. Add their GitHub email to the comma-separated list
5. Redeploy (push a commit or click "Redeploy" in Vercel dashboard)

### Redeploying the Site

**Automatic:** Every push to GitHub triggers a new deploy.

**Manual:** Go to Vercel dashboard > Deployments > click "..." on the latest deployment > Redeploy.

### Changing the Domain

1. Add the new domain in Vercel dashboard > Settings > Domains
2. Update DNS at the domain registrar to point to Vercel
3. Update the GitHub OAuth App callback URL to `https://newdomain.com/__nuxt_studio/auth/github`
4. Wait for SSL certificate to provision (automatic)

### Updating Dependencies

```bash
pnpm install          # Install current deps
pnpm update           # Update within version ranges
pnpm build            # Test the build locally
```

**Important note:** `@nuxt/content` 3.11.2 requires these as explicit dependencies because Vercel's clean install can't resolve them transitively:
- `@nuxtjs/mdc`
- `@shikijs/engine-javascript`
- `@shikijs/engine-oniguruma`

### If the Build Breaks

1. Check Vercel dashboard > Deployments for error logs
2. The last working deployment is always live until a new one succeeds
3. Common fixes:
   - Missing dependency: `pnpm add <package-name>`
   - Content schema error: Check `content.config.ts` against the frontmatter in the offending file
   - Build OOM: Vercel free tier has 8GB RAM; the build uses `NODE_OPTIONS="--max-old-space-size=4096"`

### If the Site is Down

1. Check [Vercel Status](https://www.vercel-status.com/) for platform issues
2. Check Vercel dashboard for failed deployments
3. Check DNS is pointing to Vercel (use [dnschecker.org](https://dnschecker.org/))
4. Check the GitHub OAuth App hasn't been deleted (Studio login will break)

---

## Development Setup (For Developers)

### Prerequisites

- Node.js 22+ (required for native SQLite)
- pnpm 10+ (package manager)

### Local Development

```bash
git clone https://github.com/alliecatowo/shrike-publishing.git
cd shrike-publishing
pnpm install
pnpm dev
```

The site will be available at http://localhost:3000. Studio works in dev mode without authentication.

### Building for Production

```bash
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

### Key Configuration

- **nuxt.config.ts** -- Module list, route rules, Studio config, content settings
- **content.config.ts** -- Content collection schemas (defines what frontmatter fields each content type has)
- **app.config.ts** -- App-level config (theme, design tokens)
- **nuxt.schema.ts** -- Extended schema definitions

### Known Quirks

- `better-sqlite3` native binary fails on Vercel serverless. The config uses `content.experimental.nativeSqlite: true` to use Node.js 22's built-in SQLite instead.
- Vercel ISR route rules have a bug with index routes (the `-isr` suffix doesn't preserve the original URL). Content pages use plain SSR instead.
- Vercel env vars set via CLI with `echo` add a trailing newline. Use `printf` instead.

---

## Helpful Links

| Resource | URL |
|----------|-----|
| Nuxt documentation | https://nuxt.com/docs |
| Nuxt Content v3 docs | https://content.nuxt.com/ |
| Nuxt Studio docs | https://nuxt.studio/ |
| Nuxt UI docs | https://ui.nuxt.com/ |
| Tailwind CSS docs | https://tailwindcss.com/docs |
| Lucide icons | https://lucide.dev/icons/ |
| Vercel docs | https://vercel.com/docs |
| MDC syntax | https://content.nuxt.com/docs/files/markdown#mdc-syntax |
| GitHub repo | https://github.com/alliecatowo/shrike-publishing |
| Vercel dashboard | https://vercel.com/alliecatowos-projects/shrike-publishing |
| Markdown guide | https://www.markdownguide.org/ |
| Loops (newsletter) | https://loops.so/ |

---

## Contact

- **Allie Coleman** -- Allisonemilycoleman@gmail.com -- GitHub: [@alliecatowo](https://github.com/alliecatowo)
