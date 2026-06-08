# Prof. Dr. Mian Muhammad Akram — Website

Bilingual (Urdu + English) personal/professional website.

## Prerequisites

- Node.js 18+
- pnpm (enable via `corepack enable` if needed)

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm start
```

## Project plan

Full build phases, schemas, and scope: [plan.md](./plan.md).

**Current status:** Phase 1 complete (bilingual site shell). Visit `/en` or `/ur`. Phase 1b connects Sanity CMS.

## Environment

Copy `.env.example` to `.env.local` and fill in values when each integration is built (Sanity in Phase 1b, Resend in Phase 3).
