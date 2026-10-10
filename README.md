# Prof. Dr. Mian Muhammad Akram

Bilingual English and Urdu website. The client updates the content in the CMS.

Live site: [drmianakram.com](https://drmianakram.com)

Editor guide: [docs/how-to-update-the-website.md](docs/how-to-update-the-website.md)

## Stack

Next.js, Sanity, next-intl with Urdu RTL, Vercel.

## Sections

About, books, lectures, honors, Afkar-e-Muallim, services, questions, and contact. English is at `/en`. Urdu is at `/ur`. The CMS is at `/studio`.

## Run locally

Node.js 18+ and pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000/en](http://localhost:3000/en). Stop `pnpm dev` before `pnpm build`.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `SANITY_API_TOKEN` | Server writes. Read, or read and write |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL. Production is `https://drmianakram.com` |
| `RESEND_API_KEY` | Contact form |
| `RESEND_FROM_EMAIL` | Verified sender |

Put values in `.env.local`. That file is gitignored.
