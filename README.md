# Prof. Dr. Mian Muhammad Akram — Website

Bilingual (Urdu + English) personal/professional website with Sanity CMS.

## Prerequisites

- Node.js 18+
- pnpm (`corepack enable` if needed)

## Development

```bash
pnpm install
cp .env.example .env.local   # fill in values
pnpm dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) or `/ur`. CMS Studio: [http://localhost:3000/studio](http://localhost:3000/studio).

**Tip:** Stop `pnpm dev` before running `pnpm build`. If you see JSON parse errors on pages, run `rm -rf .next` and restart dev.

## Build

```bash
pnpm build
pnpm start
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Usually `production` |
| `SANITY_API_TOKEN` | Studio write / server | API token with read (or read+write) |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URLs, OG, sitemap. Production is `https://drmianakram.com` |
| `RESEND_API_KEY` | Contact form | Resend API key |
| `RESEND_FROM_EMAIL` | Contact form | Verified sender. `onboarding@resend.dev` only delivers to the Resend account owner |

Copy `.env.example` to `.env.local` for local secrets. `.env.local` is gitignored. Do not commit API tokens, the WordPress password, or the Hostinger login.

## Live site

| | |
|---|---|
| Public site | https://drmianakram.com (`/en` and `/ur`) |
| Studio | https://drmianakram.com/studio |
| Hosting | Vercel project `dr-akram`, production branch `main` |
| DNS | Hostinger. `A` records for `@` and `www` point to `76.76.21.21` |
| Sanity project | `5ce34emc`, dataset `production` |
| Editor invite | `akram151060@gmail.com` (Google sign-in). Guide: [docs/how-to-update-the-website.md](docs/how-to-update-the-website.md) |

`drmianakram.pk` is not registered. Namecheap hosting is not used for this site.

Sanity CORS origins, with credentials allowed: `http://localhost:3000`, `http://localhost:3333`, `https://drmianakram.com`, `https://www.drmianakram.com`.

## Google Search Console

After the production domain is verified:

1. Add property `https://drmianakram.com` in [Google Search Console](https://search.google.com/search-console).
2. Verify via DNS TXT or HTML.
3. Submit sitemap: `https://drmianakram.com/sitemap.xml`.

## Project plan

Full build phases: [plan.md](./plan.md).

**Current status:** The site is live on `drmianakram.com`. Public pages still show test content until it is replaced in Studio.
