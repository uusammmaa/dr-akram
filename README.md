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
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URLs, OG, sitemap (e.g. `https://drmianakram.pk`) |
| `RESEND_API_KEY` | Contact form | Resend API key |
| `RESEND_FROM_EMAIL` | Contact form | Verified sender (e.g. `contact@drmianakram.pk`) |

## Deploy to Vercel (Phase 3.10)

1. Connect GitHub repo to Vercel.
2. Set all env vars above for **Production** and **Preview**.
3. In [Sanity manage](https://www.sanity.io/manage) → API → CORS origins, add:
   - `http://localhost:3000` (dev)
   - `https://*.vercel.app` (preview)
   - `https://drmianakram.pk` (production)
4. Deploy; verify `/en`, `/ur`, and `/studio` on preview URL.
5. Point `drmianakram.pk` DNS to Vercel after content review (Phase 3.11).

## Google Search Console (Phase 3.7f)

After production deploy with `NEXT_PUBLIC_SITE_URL` set:

1. Add property `https://drmianakram.pk` in [Google Search Console](https://search.google.com/search-console).
2. Verify via DNS TXT or HTML (Vercel supports both).
3. Submit sitemap: `https://drmianakram.pk/sitemap.xml`
4. Optionally add `drmianakram.com` as redirect property if registered.
5. Monitor Coverage and Core Web Vitals (also in Vercel Speed Insights).

## Project plan

Full build phases: [plan.md](./plan.md).

**Current status:** Phases 1, 1c, 1b, 2, and **3** complete (CMS UX, SEO, Resend contact, analytics). Next: **Phase 4** (public Q&A).
