# Website Plan — Prof. Dr. Mian Muhammad Akram

> **Status:** **Phases 1, 1c, 1b complete** — premium animated home live; Sanity Studio at `/studio` (`siteSettings` → hero tagline/portrait, contact page, mobile bar). **Next:** **§9 Phase 2.0** (`aboutPage` schema + About CMS wiring), then Phase 2 content schemas. Books/honors/lectures/Q&A still placeholders until Phase 2.  
> **Last updated:** 8 June 2026 — **pnpm** (`pnpm-lock.yaml`, `packageManager: pnpm@10.15.0`); Phase 1c home (8 sections, Framer/Lenis/parallax); Phase 1b Sanity (`5ce34emc`, `next-sanity@9`); root layout `<html>`/`<body>` fix for `/studio`; `pnpm build` uses webpack (Turbopack incompatible with embedded Studio). **Manual:** add `http://localhost:3000` CORS origin in Sanity API settings; publish `siteSettings` in Studio.

---

## 1. Confirmed Identity

| Field | Value |
|---|---|
| **Full name (English)** | Prof. Dr. Mian Muhammad Akram |
| **Full name (Urdu)** | پروفیسر ڈاکٹر میاں محمد اکرم *(confirm spelling)* |
| **Professional photo** | Yes — to be provided |
| **PhD** | Ph.D. in Economics, specialization in **Islamic Economics** |
| **Other degrees** | M.Sc. Economics, M.A. Islamic Studies |

---

## 2. Confirmed Roles & Career

### Academic
- **Retired** Professor of Economics & former **Principal**, Government College of Science, Wahdat Road, Lahore (retired 14 Oct 2020)
- **Former** Head of Economics Department, Govt. College of Science
- **Current (part-time):** Lecturer at **University of the Punjab** — **Islamic Economics** (some semesters)
- Co-author: **"Islamic Economics"** textbook (with Prof. Abdul Hameed Dar)
- Writer of books for M.A./M.Sc., M.Com., B.Com Hons., B.A./B.Sc., I.Com., F.A.

### Leadership & organizations
| Role | Organization | Status |
|---|---|---|
| **Chairman / Director** | AFAQ (Association for Academic Quality) | Current |
| **Mudir-e-Ala** (Chief Editor) | **Afkar-e-Muallim** (افکار معلم) — monthly Urdu magazine | Current |
| **Deputy Speaker** | Shoora Hamdard (Hakim Muhammad Said) | Current |
| **Former President** | Tanzeem-e-Asatiza Pakistan (تنظیم اساتذہ پاکستان) | Former |
| **Former Chairman** | Hira National Education Foundation | Former |
| **Board Member** | Ghazali Education Trust | Current |
| **Board Member** | Al-Balagh Trust | Current |

### Services he offers (all equally important on site)
1. **Dars-e-Quran** — available to whoever contacts him
2. **Islamic finance / economics advice**
3. **Lectures & speaking engagements** — physical and online, by invitation

### Reference links
- AFAQ Board: https://afaq.edu.pk/board-of-directors/
- Tanzeem-e-Asatiza: https://www.tapak.pk/
- AFAQ: https://afaq.edu.pk/

---

## 3. Website Goals (confirmed)

**Purpose:** A modern, bilingual personal/professional website where visitors can:
- Learn who he is and trust his credentials
- Browse his books and writings
- See **reading recommendations** — books he suggests students and visitors should read
- See honors — shields, trophies, certificates from functions & organizations
- Watch/listen to lectures
- Browse **questions & answers** — common questions with Dr. Akram’s approved replies; ask new questions
- Contact him for Dars-e-Quran, Islamic economics guidance, or lecture invitations

**Audience:** General public, students, teachers, Islamic organizations, event organizers.

**Languages:** **Urdu + English** with language toggle and full RTL support for Urdu.

**Contact:** **Public** phone & WhatsApp + **contact form** for invitations/inquiries.

**Design:** Very modern, clean, dignified, scholarly — no reference site, but premium contemporary feel.

**Mobile:** **Responsive & touch-friendly** — must look and feel premium on phones and desktop (see §5.1). Animations, parallax, smooth scroll, and rich hero effects are **encouraged on all viewports** — no stripping motion for low-end devices.

**Maintenance:** **Prof. Dr. Akram should be able to update content himself** (books, lectures, honors, Q&A, etc.) via an admin panel — not developer-dependent. **Guided tour on first login + permanent Help desk** so he always knows what to do where (§5.3).

**SEO & discoverability:** Site must rank and preview well for searches like *Islamic economics Lahore*, *Prof. Dr. Mian Muhammad Akram*, and individual Q&A topics — in **both Urdu and English**. Google, Bing, and WhatsApp link previews must show correct title, description, image, and locale. Full technical spec: **§5.6**; build tasks: **§9 Phase 3.7**.

---

## 4. Final Site Structure

```
Home
│   Hero: photo, name, tagline, quick CTAs (Contact · Books · Lectures)
│   Highlights: roles, latest book, featured lecture
│
├── About (میرے بارے میں)
│   Biography (EN + UR)
│   Academic career timeline
│   Leadership & affiliations
│   Education & qualifications
│
├── Books (کتابیں)
│   Two tabs — same page, no extra nav item:
│   ├── **My Books** (میری کتابیں) — textbooks & works he authored/wrote
│   │   Grid: cover, title, description, buy/link
│   │   Filter by level (M.A., B.Com., etc.) — optional
│   └── **Recommended Reading** (مطالعہ کی تجویز) — books he suggests others read
│       Grid: cover, title, author, his note on why to read it, topic, buy/link
│       Filter by topic: Islamic Economics · Quran & Tafsir · Islamic Studies · History · General
│   Homepage: featured row from My Books + optional "Dr. Akram recommends" teaser (2–3 picks)
│
├── Afkar-e-Muallim (افکار معلم)
│   About the magazine
│   Latest issues / PDF or external links
│
├── Lectures & Media (لیکچرز)
│   Video embeds (YouTube) — *published* videos only
│   Categories: Islamic Economics, Dars, General, Current Affairs *(optional)*
│   **Upstream (private):** Weekly Content Studio briefs → record → paste URL here (§5.5)
│
├── Honors & Awards (اعزازات و ایوارڈز)  ← NEW
│   Shields, trophies, certificates from functions & events
│   Photo gallery with event name, organization, year
│   Filter by type (Shield · Trophy · Certificate · Memento)
│   Tap photo → full-screen lightbox with details
│   Homepage teaser: embla carousel of featured honors
│
├── Services (خدمات)
│   Dars-e-Quran
│   Islamic Economics Consultation *(includes book guidance — links to Recommended Reading tab)*
│   Speaking Engagements (invite for lectures)
│
├── Questions & Answers (سوالات و جوابات)  ← NEW
│   Public FAQ — published Q&A from Dr. Akram (searchable, filter by topic)
│   **Ask a question** form → saved in CMS → email notification → he writes answer → publish
│   Before submit (Phase 5b): “Similar questions already answered” search
│   Future (Phase 5c–d): AI draft + RAG assistant grounded in approved Q&A only (§5.4)
│   Homepage teaser: 2–3 featured FAQ items
│
└── Contact (رابطہ)
    Phone (click-to-call)
    WhatsApp (click-to-chat)
    Email
    Invitation / inquiry form
        → Name, phone, city, type (Dars / Lecture / Finance advice / Other)
        → Message, preferred date (optional)
        → Sends email notification
```

---

## 5. Technical Stack (final)

### Core platform

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Modern, fast, SEO-friendly, bilingual. **Note:** Next.js 15 LTS EOL **Oct 2026** — plan upgrade to **Next.js 16** in a maintenance pass before then *(no blocker to start on 15)* |
| **i18n** | next-intl | Urdu RTL + English toggle |
| **CMS** | Sanity | Simple admin UI — father adds books, lectures, Q&A, honors. **Guided tour + Help desk** (§5.3). *Articles/blog: post-launch only — out of v1 scope* |
| **Contact form** | Resend + API route | Email notifications for invitations **and new questions** (§5.4) |
| **Hosting** | Vercel | Fast CDN, pairs with Next.js |
| **Analytics** | `@vercel/analytics` + `@vercel/speed-insights` | Real-user performance monitoring |

### 5.0 UI & polish library stack (use wherever needed)

> **Rule:** Use the **full polish stack everywhere** — Framer Motion, GSAP, Lenis, parallax, carousels, optional 3D hero, Magic UI effects. Lazy-load heavy chunks (R3F, AI chat) for bundle hygiene, not to disable motion on mobile. Only **`prefers-reduced-motion`** may reduce animation (accessibility). See §5.1.

#### Practical install list (minimal `package.json`)

```bash
# Core styling & components
pnpm add tailwindcss @tailwindcss/typography tailwind-merge clsx class-variance-authority
pnpm add lucide-react sonner vaul embla-carousel-react
pnpm add framer-motion lenis @formkit/auto-animate
pnpm add plaiceholder sharp
pnpm add @imgly/background-removal-node   # Shared Media Enhancer — server-side only (§5.2)
pnpm add driver.js                          # CMS first-login tour for father (§5.3)
pnpm add next-themes
pnpm add @vercel/analytics @vercel/speed-insights

# shadcn/ui — init via CLI, pulls in @radix-ui/* per component
pnpm dlx shadcn@latest init

# Optional “wow” (3D hero, extra parallax — lazy-loaded, all viewports)
pnpm add @react-three/fiber @react-three/drei gsap @gsap/react react-scroll-parallax
```

#### Library → project mapping

| # | Library | Use on this site |
|---|---|---|
| 1 | **`next/font`** | **Inter** (English UI), **Noto Nastaliq Urdu** (Urdu — single weight subset). Self-hosted, zero layout shift, no extra requests |
| 2 | **`@tailwindcss/typography`** | About bio, long articles, Afkar-e-Muallim descriptions — `prose prose-lg` with RTL variant |
| 3 | **`geist` / `@fontsource/*`** | Fallback only if `next/font` lacks a needed weight; prefer built-in first |
| 4 | **`next/image`** | Hero portrait, book covers, org logos — responsive sizes, WebP/AVIF, lazy below fold |
| 5 | **`sharp`** | Production image pipeline (required for `next/image` optimization on Vercel) |
| 6 | **`plaiceholder`** | Blur/dominant-color placeholders on hero photo & book covers — smooth reveal without layout jump |
| 7 | **`embla-carousel-react`** | Featured books row, lecture highlights, magazine issues — touch-friendly swipe on mobile |
| 8 | **`framer-motion`** | Page section reveals, staggered cards, hero text fade-in — **all viewports** |
| 9 | **`gsap` + `@gsap/react`** | About page career timeline scroll animation — **all viewports**; ScrollTrigger on mobile too |
| 10 | **`lenis`** | Smooth scroll site-wide — disable only when `prefers-reduced-motion` |
| 11 | **`@formkit/auto-animate`** | Book grid & lecture list re-order when filtering — lightweight, no config |
| 12 | **`tailwindcss`** | Entire design system — spacing, colors, responsive breakpoints, RTL utilities |
| 13 | **`tailwind-merge` + `clsx` + `cva`** | All components — conditional classes, button/card variants |
| 14 | **`shadcn/ui`** | Buttons, cards, sheet, dialog, tabs, form inputs, select — premium accessible base |
| 15 | **`@radix-ui/react-*`** | Via shadcn — contact form dialog, mobile nav sheet, services tabs, book filters |
| 16 | **`lucide-react`** | Icons site-wide — Phone, MessageCircle (WhatsApp), BookOpen, GraduationCap, Mosque, etc. |
| 17 | **`vaul`** | Mobile contact form & navigation drawer — native bottom-sheet feel |
| 18 | **`@react-three/fiber` + `@react-three/drei`** | Optional homepage hero — subtle 3D Islamic geometric pattern background — **lazy-loaded**, all viewports |
| 19 | **`react-scroll-parallax`** | Hero parallax on Dr. Akram portrait — **all viewports** (Techwind-style jarallax hero) |
| 20 | **`sonner`** | Toast feedback — “Message sent”, “Copied number”, form errors |
| 21 | **`@imgly/background-removal-node`** | **Shared Media Enhancer** — AI background removal + compositing on CMS upload (§5.2): honors, portrait, book/magazine covers, logos. Server-side only |
| 22 | **`driver.js`** | **CMS guided tour** — first-login walkthrough in Sanity Studio for father (§5.3). Lightweight, works on mobile |

#### Honorable mentions — where they fit

| Library | Use on this site |
|---|---|
| **Magic UI / Aceternity UI** | Hero text effects, bento grid for services/roles section, animated borders on featured book card |
| **react-spring** | Skip — Framer Motion + auto-animate cover our needs with less bundle overlap |
| **keen-slider** | Skip — Embla chosen for API + touch UX |
| **next-themes** | Dark mode toggle (optional) — scholarly dark theme with gold accents; respects system preference |
| **@vercel/analytics + speed-insights** | Always on — monitor real-user vitals after launch |

#### Per-page library usage

| Page | Libraries in play |
|---|---|
| **Home** | Techwind `index-personal.html` patterns (§6): floating hero card, wave divider, services grid, experience timeline, CTA band; `next/image`, `plaiceholder`, portrait from §5.2, `framer-motion`, `react-scroll-parallax`, optional R3F hero, `embla-carousel` (books + honors), `shadcn` cards, `lucide-react`, Magic UI bento for roles |
| **About** | `@tailwindcss/typography`, §5.2 portrait + org logos, `gsap` ScrollTrigger timeline, `auto-animate` |
| **Books** | `next/image`, `plaiceholder`, §5.2 cover presets, `shadcn` tabs (My Books · Recommended Reading), `auto-animate` (filter), `embla-carousel` (featured), `shadcn` cards |
| **Lectures** | `next/image` (thumbnails), tap-to-load YouTube facade, `embla-carousel`, `framer-motion` |
| **Honors & Awards** | `next/image`, `plaiceholder`, `embla-carousel` (homepage teaser), masonry/grid gallery, Radix dialog lightbox (tap-to-zoom), `auto-animate` (filter), `Award`/`Trophy` lucide icons. Display images pre-processed via §5.2 enhancer — uniform trophy-case look |
| **Afkar-e-Muallim** | `prose` typography, `embla-carousel` (issues), §5.2 cover presets, PDF download links |
| **Services** | `shadcn` tabs, `framer-motion` stagger, `lucide-react` icons |
| **Q&A / FAQ** | `@tailwindcss/typography`, `shadcn` accordion, `auto-animate` (topic filter), server search; AI chat lazy-loaded Phase 5 only (§5.4) |
| **Contact** | `vaul` drawer (mobile form), `shadcn` form + Radix, `sonner` toasts, sticky Call/WhatsApp bar |

#### Next.js patterns (mandatory)

- **`"use client"`** only on: motion wrappers, carousel, lenis, contact drawer, theme toggle, 3D hero
- **Server Components** for: all page shells, bio text, book/lecture data from Sanity, SEO metadata (§5.6)
- **`next/font` + `next/image`** over third-party equivalents — always
- **Dynamic import** heavy libs: `const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false })`
- **Progressive enhancement:** core content readable without JS; **motion is a first-class feature**, not desktop-only

### 5.1 Mobile & Responsive UX

> **Policy (8 Jun 2026):** **No old-phone / low-end performance gating.** Prioritize a **premium, animated, modern feel** on phones and desktop alike. Use Framer Motion, GSAP, Lenis, parallax, carousels, and optional 3D freely. Do **not** strip animations or downgrade layouts for budget devices.

The site must remain **fully usable and beautiful** on phones — responsive layout, touch-friendly controls, flawless Urdu RTL — while embracing rich motion and visual polish.

#### Responsive targets
- Works on screens as small as **320px** wide
- No layout breaks in Urdu RTL on small screens
- Hero, sections, and carousels animate smoothly on **mobile and desktop**

#### What we will do
| Area | Approach |
|---|---|
| **Layout** | Mobile-first CSS — design for phone first, scale up for desktop |
| **Motion** | **Framer / GSAP / Lenis / parallax / R3F enabled on all viewports** — Techwind-style hero (floating card, wave, scroll reveals). Respect **`prefers-reduced-motion`** only |
| **Touch** | Large tap targets (min **48×48px**) — easy for older users |
| **Navigation** | Simple bottom bar or clear hamburger menu; no tiny links |
| **Images** | `next/image` WebP/AVIF; `plaiceholder` blur; lazy-load below fold |
| **Awards gallery** | Thumbnails in grid; full-size on tap (lightbox); pagination/load more for large sets |
| **Urdu font** | Subset font or single weight via `next/font` |
| **Videos** | Thumbnail + tap to play — avoid auto-loading YouTube iframes |
| **JavaScript** | Server-render pages; dynamic-import heaviest libs (R3F, AI chat) — not motion |
| **Forms** | Large inputs, clear labels in Urdu + English, native phone keyboard for number fields |
| **Contact** | **Sticky WhatsApp + Call buttons** always visible on mobile |

#### Priority mobile flows (must be one-tap easy)
1. **Call** → `tel:` link
2. **WhatsApp** → `wa.me` link with pre-filled greeting
3. **Send invitation** → short contact form (few fields only)
4. **Watch lecture** → tap thumbnail, then loads video

#### Testing plan before launch
- Test on **320px** and **375px** screen widths
- Test Urdu RTL layout on small screen
- Test hero parallax + section animations on a real phone (smooth, no broken layout)
- Verify `prefers-reduced-motion` disables Lenis/heavy motion

### 5.2 Shared Media Enhancer (CMS upload pipeline)

> **Use case:** Father uploads phone photos with messy backgrounds — shields, his portrait, book covers, magazine issues, org logos. One tool in Sanity turns them into uniform, professional images before they appear on the site.

**Approach:** Free, local AI cutout + custom compositing — no paid API, no per-image cost. **One API route, one Studio button, many preset packs.**

| Step | Tool | What it does |
|---|---|---|
| 1. Upload | Sanity Studio | Father picks a phone photo (`rawImage`) |
| 2. Enhance | `@imgly/background-removal-node` | AI removes messy background (runs on our server, images stay private) |
| 3. Composite | `sharp` | Places cutout on preset backdrop + shadow/border *(or transparent PNG for logos)* |
| 4. Preview | Custom Sanity input | Side-by-side before/after — father approves before save |
| 5. Publish | Sanity | Processed WebP/PNG saved as display field; original kept as `rawImage` backup |

**Father’s workflow in Sanity (same everywhere):**

```
Upload photo → pick content type / background style → tap "Make professional" → preview → Save
```

Large Urdu/English button label: **"تصویر بہتر بنائیں / Enhance photo"**

Studio type picker (Urdu + English):

| Picker label | Preset pack |
|---|---|
| اعزاز / Award | Honor presets |
| تصویر / Portrait | Portrait presets |
| کتاب / Book cover | Cover presets |
| مجلہ / Magazine issue | Cover presets *(same engine as books)* |
| لوگو / Logo | Logo preset *(transparent output)* |

**API route:** `POST /api/media/enhance`

- Input: Sanity asset URL or upload buffer + `preset` ID + optional `contentType`
- Output: processed buffer → uploaded back to Sanity
- Auth: Sanity session token or internal secret — not public
- Limits: max **1600px** upload → downscale to **1024px** before AI; **`small` model only** on Vercel Hobby (see Performance & hosting notes below)

**Custom Sanity Studio components:**
- `PhotoEnhancerInput` — enhance step (honors, portrait enhanced path, logo enhanced path). Props: `presetPack`, `rawField`, `displayField`.
- `CoverUploadInput` — dual-path UI for books & Afkar: **Publisher cover** (direct) vs **Photo of book** (enhanced). Wraps `PhotoEnhancerInput` on path B only.
- `PortraitUploadInput` / `LogoUploadInput` — same direct-vs-enhance pattern for `siteSettings` and `organization`.

#### Use cases & preset packs

| # | Use case | Priority | Where it shows | Processing |
|---|---|---|---|---|
| 1 | **Honors** (shields, trophies, certificates) | Already planned | Honors gallery, homepage carousel | AI cutout + backdrop composite |
| 2 | **Homepage / About portrait** | **High** | Hero, About page, WhatsApp OG preview | AI cutout + portrait framing (head/shoulders) |
| 3 | **Book covers** | **Medium** | Books grid, homepage featured row | Straighten + crop + “book card” template; optional light bg cleanup |
| 4 | **Afkar-e-Muallim issue covers** | **Medium** | Afkar page carousel | Same as book covers — uniform issue cards |
| 5 | **Organization logos** | **High** *(if uploaded)* | About, homepage “Organizations & roles” | AI cutout → **transparent PNG** (no backdrop) |

**Honor presets** *(اعزاز)*:

| Preset ID | Look | Best for |
|---|---|---|
| `honor-velvet-green` | Deep green gradient + soft vignette | Shields, wooden plaques *(default)* |
| `honor-gold-gradient` | Warm cream-to-gold studio backdrop | Trophies, gold mementos |
| `honor-cream-neutral` | Off-white with subtle geometric texture | Certificates, paper awards |

**Portrait presets** *(تصویر — high value)*:

| Preset ID | Look | Best for |
|---|---|---|
| `portrait-green` | Soft scholarly green backdrop | Homepage hero *(default)* |
| `portrait-neutral` | Warm gray/cream studio look | About page |
| `portrait-gradient` | Subtle green-to-gold gradient | Alternate / formal use |

Framing: head-and-shoulders crop, softer shadow than honors, no gold border.

**Cover presets** *(کتاب / مجلہ — medium value)*:

| Preset ID | Look | Best for |
|---|---|---|
| `cover-flat-cream` | Off-white card + soft drop shadow, fixed aspect ratio | Book grid *(default)* |
| `cover-flat-green` | Deep green accent border + cream fill | Featured book |
| `cover-flat-gold` | Gold accent border + cream fill | Afkar-e-Muallim issues |

Processing *(enhanced path only)*: auto-straighten perspective, crop to uniform ratio — AI bg removal only if table/desk is messy.

#### Dual upload paths (covers, portrait, logos)

Enhancement is **optional** — not every upload needs AI. Studio shows **two clear choices** (Urdu + English). Site always reads the single display field (`cover`, `portrait`, `logo`).

**Books & Afkar issue covers** — **`CoverUploadInput`** component:

| Path | Studio label | When to use | What happens |
|---|---|---|---|
| **A — Default** | **پبلشر کی تصویر / Publisher cover** | JPEG/PNG from publisher, Daraz, or clean scan | Upload → save to `cover`. Sanity + Sharp auto-compress only. **No Enhance button.** `coverSource: direct` |
| **B — Optional** | **کتاب کی تصویر / Photo of book** | He photographed the physical book or magazine | Upload → `rawCover` → **Enhance cover** → preview → `cover`. `coverSource: enhanced` |

```
Publisher file:  [ Upload cover ]  →  Done

Phone photo:     [ Upload photo ]  →  [ Enhance cover ]  →  Preview  →  Save
```

**Never run publisher artwork through the enhancer** — it would add an extra frame and can degrade the real cover.

**Portrait** — same pattern on `siteSettings`:

| Path | Label | When |
|---|---|---|
| **Direct** | **پروفیشنل تصویر / Professional photo** | Studio or clean file already good | → `portrait` · `portraitSource: direct` |
| **Enhanced** | **تصویر بہتر بنائیں / Photo needs cleanup** | Event/office photo, messy background | → `rawPortrait` → Enhance → `portrait` · `portraitSource: enhanced` |

**Logos** — same pattern on `organization`:

| Path | Label | When |
|---|---|---|
| **Direct** | **لوگو فائل / Logo file** | PNG/SVG with transparency already | → `logo` · `logoSource: direct` |
| **Enhanced** | **تصویر سے لوگو / Logo from photo** | Screenshot or photo of letterhead | → `rawLogo` → Enhance → `logo` · `logoSource: enhanced` |

**Honors** — enhance-first (phone photos are the norm); no direct path needed unless he skips enhancement and uses fallback `rawImage`.

**Frontend rule:** Always display `cover` / `portrait` / `logo` — one field, regardless of source.

**CMS guide for father (books):**
1. Cover file from publisher? → **Publisher cover** → upload → save.
2. Only have the book in hand? → **Photo of book** → upload → **Enhance cover** → save.

**Logo preset** *(لوگو — high value if uploaded)*:

| Preset ID | Look | Best for |
|---|---|---|
| `logo-transparent` | Clean cutout, transparent PNG | AFAQ, Tanzeem, Hamdard, Punjab University, etc. |

No compositing backdrop — output used on light and dark sections.

**Build order:** Honor → portrait → covers → logos. Step-by-step tasks with verify checks: **§9 Phase 2a–2d**.

**Performance & hosting notes (Vercel Hobby — $0):**

> **Cost rule:** Enhancement stays **100% free** — `@imgly/background-removal-node` (AGPL) + `sharp` + Vercel Hobby. **No** Remove.bg, **no** paid GPU, **no** Vercel Pro required if configured below.

| Concern | Mitigation on Vercel Hobby |
|---|---|
| **Hobby 10s function limit** | Use **`model: 'small'`** only (not `medium`); resize input to **max 1024px** before cutout; target **&lt;8s** after warm-up |
| **Cold start / model load** | Self-host ONNX + WASM in **`public/enhance-models/`** (`publicPath` config) — no runtime CDN fetch inside the function |
| **First click may timeout** | Studio: spinner + *“Pehli dafa thora waqt lag sakta hai — dubara Enhance try karein”*; **second click** usually succeeds on warm function |
| **CPU-heavy AI** | Run **on demand** when he clicks Enhance — never on page views; **one image at a time** |
| **Old phone in Studio** | Upload on phone; **processing on server** — phone only waits for result |
| **Bad cutout (glare, hair, book spine)** | Always show preview; re-upload or skip enhancement |
| **Re-processing loop** | `autoEnhanced` flag per document — skip unless he clicks “Re-enhance” |
| **Optional warm-up** | Daily Hobby cron `GET /api/media/warm` loads models off-peak *(uses 1 of 2 free cron slots)* |

**API route config (`POST /api/media/enhance`):**

```ts
export const runtime = 'nodejs';
export const maxDuration = 10; // Hobby hard cap — do not raise without Pro
```

- Auth: `MEDIA_ENHANCE_SECRET` or Sanity session — not public  
- Input cap: max **1600px** wide upload → downscale to **1024px** before AI  
- Output: WebP via `sharp` presets  
- **If 504/timeout:** return clear error; Studio keeps `rawImage`; site fallback unchanged  

**License:** `@imgly/background-removal-node` is free under AGPL — fine for this personal portfolio site.

**Fallback:** If enhancement fails or times out, site falls back to `rawImage` / `rawCover` / `rawPortrait` with standard Sanity compression.

**Not used:** Remove.bg API (paid/limited), auto-webhook without preview (risk of bad crops), `medium`/`large` models on Hobby (too slow).

**Not enhanced:** Lecture thumbnails (YouTube default preferred), PDFs, contact text fields.

### What he can update himself (via CMS admin)
- **Site profile** — **direct professional portrait OR optional enhance** (§5.2)
- **About page** — biography (Urdu + English) and career timeline milestones (`aboutPage` singleton)
- Books (title, cover, description, buy link) — **direct publisher cover OR optional enhance** (§5.2)
- **Reading recommendations** — books he suggests others read; author, topic, why he recommends (§4)
- Lectures / videos (YouTube URL, title, description)
- **Honors & awards** (photo, title, event/organization, year, type) — **one-click enhancement** (§5.2)
- **Afkar-e-Muallim issues** — **direct cover OR optional enhance** + PDF/link (§5.2)
- **Organizations** — name, role, **direct logo file OR optional enhance** (§5.2)
- **Questions & answers** — review incoming questions, write answers, publish to FAQ (§5.4)
- Contact info (phone, WhatsApp, email) — if changed

> **Out of v1 scope (post-launch optional):** Articles / announcements blog — no schema or phase in §9; add only if father requests after launch.

#### Bilingual CMS fields — convention *(all schemas)*

**Pattern:** separate fields **`fieldEn`** + **`fieldUr`** — not a plugin, not inline “EN + UR” in one string.

| In Sanity | On site (`next-intl`) |
|---|---|
| `titleEn` / `titleUr` | Show `titleEn` when `locale === 'en'`, else `titleUr` |
| Long text: `bioEn`, `descriptionUr`, etc. | Same rule; Urdu fields render RTL in `prose` |

**Helper:** `src/lib/i18n/cms.ts` → `localized(doc, 'title', locale)` reads `titleEn` or `titleUr`. **Do not** use `@sanity/document-internationalization` for v1 *(optional later for Content Studio briefs only)*.

**Schema tables below** use shorthand `titleEn` / `titleUr` — implement as two Sanity string/text fields.

#### CMS schema: `siteSettings` singleton

| Field | Type | Example |
|---|---|---|
| `portraitSource` | enum | `direct` · `enhanced` |
| `rawPortrait` | image | Original upload *(backup — enhanced path only)* |
| `portrait` | image | Display photo for hero/about/OG *(both paths write here)* |
| `portraitStyle` | enum | `portrait-green` · `portrait-neutral` · `portrait-gradient` *(enhanced path only)* |
| `autoEnhancedPortrait` | boolean | Prevents accidental re-processing |
| `taglineEn` / `taglineUr` | string | Site taglines |
| `phone` / `whatsapp` / `email` | string | Contact details |
| `metaDescriptionEn` / `metaDescriptionUr` | text | Default meta description for home + fallback *(§5.6)* |
| `ogImage` | image | Optional dedicated social preview image; falls back to `portrait` |

**Studio hint on SEO fields:** *"یہ متن گوگل اور WhatsApp لنک پیش نظارہ میں دکھتا ہے — مختصر اور واضح رکھیں"*

#### CMS schema: `aboutPage` singleton *(About — biography & career timeline)*

| Field | Type | Example |
|---|---|---|
| `bioEn` | text | English biography (`prose` on site) |
| `bioUr` | text | Urdu biography (`prose`, RTL on site) |
| `careerMilestones` | array | Ordered career timeline — see object below |

**`careerMilestones[]` object:**

| Field | Type | Example |
|---|---|---|
| `year` | string | `"2020"` or `"2015–2020"` |
| `titleEn` / `titleUr` | string | `"Retired — Govt. College of Science, Lahore"` |
| `descriptionEn` / `descriptionUr` | text | Optional detail |
| `order` | number | Sort order (oldest first on timeline) |

**Studio:** single **About Page (میرے بارے میں)** entry under Site Settings group. Phase 1 uses placeholder copy; Phase **2.0** wires live CMS data.

#### CMS schema: `lecture` document *(Lectures & Media)*

| Field | Type | Example |
|---|---|---|
| `titleEn` / `titleUr` | string | "Introduction to Islamic Economics" |
| `descriptionEn` / `descriptionUr` | text | Optional short blurb |
| `youtubeUrl` | url | `https://www.youtube.com/watch?v=…` *(required)* |
| `category` | enum | Islamic Economics · Dars · General · Current Affairs |
| `featured` | boolean | Homepage “latest lecture” slot |
| `order` | number | Sort within category / listing |
| `publishedAt` | date | Optional — display date |

**Frontend:** YouTube thumbnail from URL (oEmbed or `img.youtube.com`); **tap-to-load** iframe — no upload. **Studio hint:** *"صرف YouTube link چپکائیں — thumbnail خود آ جائے گی"*.

#### CMS schema: `book` document *(My Books — authored works)*
| Field | Type | Example |
|---|---|---|
| `titleEn` / `titleUr` | string | "Islamic Economics" |
| `level` | enum | M.A. · B.Com. · I.Com. · etc. |
| `descriptionEn` / `descriptionUr` | text | Short blurb |
| `buyLink` | url | Daraz / publisher link |
| `coverSource` | enum | `direct` · `enhanced` |
| `rawCover` | image | Original phone photo *(backup — enhanced path only)* |
| `cover` | image | Display cover *(both paths write here)* |
| `coverStyle` | enum | `cover-flat-cream` · `cover-flat-green` · `cover-flat-gold` *(enhanced path only)* |
| `autoEnhanced` | boolean | |
| `featured` | boolean | Homepage carousel |
| `order` | number | Sort order |

**Studio component:** `CoverUploadInput` — dual path UI (§5.2); default tab = **Publisher cover**.

#### CMS schema: `readingRecommendation` document *(Recommended Reading — books he suggests)*
| Field | Type | Example |
|---|---|---|
| `titleEn` / `titleUr` | string | "The Ethics of Islamic Economics" |
| `authorEn` / `authorUr` | string | Dr. Muhammad Nejatullah Siddiqi |
| `topic` | enum | Islamic Economics · Quran & Tafsir · Islamic Studies · History · General |
| `recommendationNoteEn` / `recommendationNoteUr` | text | *"Essential for understanding riba-free finance…"* |
| `audienceEn` / `audienceUr` | string | Optional — e.g. "Students", "General public" |
| `buyLink` | url | Optional — Daraz, publisher, or library link |
| `coverSource` | enum | `direct` · `enhanced` |
| `rawCover` | image | Original *(backup — enhanced path only)* |
| `cover` | image | Display cover |
| `coverStyle` | enum | Same cover presets as `book` |
| `autoEnhanced` | boolean | |
| `featured` | boolean | Homepage "Dr. Akram recommends" teaser |
| `order` | number | Sort within topic |

**Studio component:** `CoverUploadInput` *(same as books)*. Sanity list preview shows `authorEn` + topic.

**Why a separate document type (not one `book` with a flag):** Clearer for father in CMS — **My Books** vs **Recommendations** are different tasks; avoids mixing his authored textbooks with others' works. Same card UI on the frontend.

#### CMS schema: `faqEntry` document *(Questions & Answers — §5.4)*

See full field list in **§5.4**. Father’s main job: **Inbox → write answer → Publish** (or mark Private).

#### CMS schema: `afkarIssue` document
| Field | Type | Example |
|---|---|---|
| `title` | string | "March 2024 Issue" |
| `month` / `year` | number | 3 / 2024 |
| `coverSource` | enum | `direct` · `enhanced` |
| `rawCover` | image | Original phone photo *(backup — enhanced path only)* |
| `cover` | image | Display cover *(both paths write here)* |
| `coverStyle` | enum | Same as `book` cover presets *(enhanced path only)* |
| `autoEnhanced` | boolean | |
| `pdf` | file | Optional PDF upload |
| `externalLink` | url | Link to Tanzeem site if PDF hosted elsewhere |
| `order` | number | Carousel sort |

**Studio component:** `CoverUploadInput` *(same as books)*.

#### CMS schema: `organization` document
| Field | Type | Example |
|---|---|---|
| `nameEn` / `nameUr` | string | AFAQ |
| `roleEn` / `roleUr` | string | Chairman / Board Member |
| `status` | enum | Current · Former |
| `logoSource` | enum | `direct` · `enhanced` |
| `rawLogo` | image | Original file or photo *(backup — enhanced path only)* |
| `logo` | image | Display logo *(both paths write here)* |
| `autoEnhanced` | boolean | |
| `url` | url | https://afaq.edu.pk |
| `order` | number | Display order on About / homepage |

#### CMS schema: `honor` document
| Field | Type | Example |
|---|---|---|
| `titleEn` / `titleUr` | string | "Recognition for services to Islamic education" |
| `type` | enum | Shield · Trophy · Certificate · Memento · Other |
| `organization` | string | AFAQ, Tanzeem-e-Asatiza, Punjab University |
| `event` | string | National Education Conference 2024 |
| `year` | number | 2024 |
| `rawImage` | image upload | Original phone photo *(backup — not shown on site)* |
| `image` | image | Processed display photo *(§5.2 honor presets)* |
| `backgroundStyle` | enum | `honor-velvet-green` · `honor-gold-gradient` · `honor-cream-neutral` |
| `autoEnhanced` | boolean | `true` after enhancement — prevents accidental re-processing |
| `featured` | boolean | Show on homepage carousel |
| `order` | number | Manual sort within gallery |

### 5.3 CMS Help & Guided Tour (for father)

> **Goal:** Father opens Sanity on his phone and **never feels lost**. Two layers: (1) a **one-time interactive tour** on first login, and (2) a permanent **Help section** he can open anytime — both bilingual Urdu + English.

**Design principles:**
- Large text (min 18px in Studio help UI), simple steps, no jargon
- **Urdu + English** on every screen — Urdu RTL layout in help panel
- Mobile-first — he will admin from WhatsApp-era Android phones
- “What do I want to do?” task menu, not technical CMS terms
- **Skip tour** anytime; **Restart tour** always available from Help

#### A. First-login guided tour

**Library:** `driver.js` — lightweight step overlay, touch-friendly, no heavy bundle.

**When it runs:**
- Automatically on **first login** to Sanity Studio
- Again if he taps **"دوبارہ тур / Restart tour"** in Help
- Stored flag: `tourCompleted` in browser localStorage + optional Sanity user preference

**Tour steps (~10):**

| Step | Highlights | Urdu hint |
|---|---|---|
| 1 | Welcome — “This is where you update your website” | خوش آمدید — یہاں آپ اپنی ویب سائٹ اپ ڈیٹ کرتے ہیں |
| 2 | Left sidebar — list of sections | بائیں طرف تمام حصے |
| 3 | **Site Settings** — photo, phone, WhatsApp, email | اپنی تصویر اور رابطہ نمبر |
| 3b | **About Page** — biography + career timeline | میرے بارے میں — تعارف اور پیشہ |
| 4 | **Books** — My Books + Recommended Reading | کتابیں — اپنی اور تجویز کردہ |
| 5 | **Q&A** — answer visitor questions | سوالات — آنے والے سوالات |
| 6 | **Honors** — shields & awards photos | اعزازات کی تصاویر |
| 7 | **Lectures** — paste YouTube link only | یوٹیوب لنک پیسٹ کریں |
| 8 | **Help button** — come here when stuck | مدد — جب بھی الجھن ہو |
| 9 | Done — changes go live in ~1 minute | محفوظ کریں — چند لمحوں میں سائٹ پر |

Each step spotlights the real UI element (`data-tour="..."` attributes on desk structure).

#### B. Permanent Help desk (always available)

**Access:** Fixed **? مدد / Help** button in Sanity Studio top bar — visible on every screen.

**Opens:** Full-screen help panel (sheet on mobile) with two tabs:

| Tab | Content |
|---|---|
| **میں کیا کرنا چاہتا ہوں / What do I want to do?** | Task cards — tap a task → step-by-step instructions |
| **تمام حصے / All sections** | Reference list of every CMS area and what it controls on the live site |

**Task cards** *(tap to expand steps + optional screenshot)*:

| Task | Where in CMS | Quick steps |
|---|---|---|
| **Update my homepage photo** | Site Settings → Portrait | Professional photo? Direct upload. Messy background? Enhance path (§5.2) |
| **Update my biography or career** | About Page (میرے بارے میں) | Edit bio Urdu + English → add/reorder timeline milestones → Save |
| **Change phone or WhatsApp** | Site Settings → Contact | Edit number → Save. Appears on Contact page + mobile bar |
| **Add a new book** | Books → My Books → Create | Title → Cover → Description → Level → Save |
| **Suggest a book to read** | Books → Recommended Reading → Create | Title → Author → Topic → **Why I recommend this** (Urdu + English) → Cover → Save |
| **Add a shield or award photo** | Honors → Create | Upload photo → pick type → **Enhance photo** → preview → fill event/year → Save |
| **Add a lecture video** | Lectures → Create | Paste YouTube URL → title → Save. Thumbnail auto-fetches |
| **Answer a visitor’s question** | Q&A → Inbox → open pending | Read question → write answer (Urdu + English) → **Publish** or **Private** |
| **Add a published FAQ manually** | Q&A → Create | Question + answer + topic → Publish *(no inbound form needed)* |
| **Add Afkar-e-Muallim issue** | Afkar Issues → Create | Cover (direct or enhance) → PDF or link → month/year → Save |
| **Add organization logo** | Organizations → Create | Logo file **or** photo + Enhance → name & role → Save |
| **Feature item on homepage** | Any content → `featured` toggle | Turn on Featured → appears in homepage carousel |
| **Something went wrong** | Help → Contact support | WhatsApp link to son *(pre-filled message)* |

**Help content source:**
- **Launch:** Static bilingual copy in code (`/sanity/help/` JSON or TS) — version-controlled, fast
- **Post-launch (optional):** `helpArticle` documents in Sanity — son can edit tips without redeploying

#### C. Inline hints (always on, zero extra clicks)

Built into schemas and custom inputs — father sees hints **on the form itself**:

| Location | Hint example |
|---|---|
| Book cover — direct tab | *"پبلشر کی تیار شدہ تصویر؟ یہاں اپ لوڈ کریں — کسی editing کی ضرورت نہیں"* |
| Book cover — enhance tab | *"کتاب کی تصویر لی ہے؟ Enhance دبائیں"* |
| Honor upload | *"Function ki photo — Enhance se professional ban jati hai / تقریب کی تصویر — Enhance سے بہتر بنائیں"* |
| Lecture YouTube field | *"صرف YouTube link چپکائیں — thumbnail خود آ جائے گا"* |
| `featured` toggle | *"Homepage par dikhane ke liye ON karein"* |

Sanity schema `description` fields on every document type — shown as gray helper text under field labels.

#### D. Studio structure (clear labels for father)

Sidebar grouped and labeled in **Urdu + English** — matches live site sections:

```
🏠 Site Settings (ترتیبات)
   └── About Page (میرے بارے میں)   ← bio + career timeline
📚 Books
   ├── My Books (میری کتابیں)
   └── Recommended Reading (مطالعہ کی تجویز)
❓ Q&A (سوالات و جوابات)
   ├── Inbox (pending questions)
   └── Published FAQ
🏆 Honors & Awards (اعزازات)
🎬 Lectures (لیکچرز)
📰 Afkar-e-Muallim (افکار معلم)
🏛️ Organizations (ادارے)
❓ Help (مدد)          ← pinned, always last
```

No duplicate or developer-only document types visible to father’s role.

#### E. Optional extras (post-launch)

- [ ] **One-page PDF cheat sheet** — Urdu, printable, WhatsApp-sendable *(content from §12)*
- [ ] **2-minute screen recording** per task (hosted on YouTube unlisted, linked from Help)
- [ ] **`helpArticle` CMS type** — son edits help text without code deploy

**Custom Studio pieces to build:**

| Component | Purpose |
|---|---|
| `HelpDeskTool` | Navbar Help button + task cards panel |
| `GuidedTour` | `driver.js` wrapper, first-login + restart |
| `TourProvider` | Context for tour state, Urdu/EN toggle in help UI |

### 5.4 Q&A Knowledge Base & AI Roadmap

> **Use case:** Visitors ask Islamic economics, Dars, or general questions. Dr. Akram (or son) saves **question + answer** pairs. Over time this becomes a **trusted FAQ library**. Later: **AI auto-answers** only from that approved library — not the open internet.

**Verdict:** Fully **doable** — standard FAQ + **RAG** (retrieval-augmented generation). No custom model training required.

#### Workflow (human-first)

```
Visitor submits question (Ask form)
    → Saved in Sanity (status: pending)
    → Email notification to Dr. Akram
    → He writes answerEn + answerUr in CMS
    → Clicks Publish → status: published, answeredAt set → appears on Q&A page
    OR clicks Private → status: private → reply by phone/WhatsApp only (never on site)
```

**Status workflow** *(three values only — no `answered`)*:

| Status | Meaning | Visible on site? |
|---|---|---|
| `pending` | Inbox — question received, answer not published yet | No |
| `published` | Father approved — live FAQ | Yes |
| `private` | Too personal or answered off-site | No |

Father may save a draft answer while still `pending`; only **Publish** moves to `published`.

#### CMS schema: `faqEntry` document

| Field | Type | Example |
|---|---|---|
| `questionEn` / `questionUr` | string | "What is the difference between riba and profit?" |
| `answerEn` / `answerUr` | text | His approved reply *(empty while pending)* |
| `topic` | enum | Islamic Economics · Dars / Quran · Lectures · Books · General |
| `status` | enum | `pending` · `published` · `private` |
| `submitterName` | string | Optional — from ask form |
| `submitterPhone` | string | Optional |
| `submitterEmail` | string | Optional |
| `language` | enum | `ur` · `en` · `both` — language question was asked in |
| `answeredAt` | datetime | Set when status → `published` |
| `featured` | boolean | Homepage FAQ teaser |
| `order` | number | Sort within topic |
| `slug` | slug | SEO URL for individual Q&A page |
| `aiReady` | boolean | `true` when approved for AI corpus *(Phase 5)* |

**Public site shows only** `status: published`. **`private`** = personal question, not listed. **`pending`** = inbox for father in Sanity.

**Studio views:**
- **Inbox** — `pending` questions (answer queue)
- **Published FAQ** — live on site
- **AI corpus** — `published` + `aiReady: true` *(Phase 5)*

**Ask form fields (public):** Name (optional), phone (optional), topic, question text, language. API route → create `faqEntry` with `status: pending` → Resend email to father.

#### Q&A page design (§6)

- Accordion or card list — question → expand answer
- Filter chips by topic (same as CMS enum)
- Search box — keyword search at launch; semantic search Phase 5b
- **Ask a question** CTA — form or drawer (mobile: `vaul`)
- Disclaimer: *Personal/fatwa-level matters — contact directly via WhatsApp*
- Individual Q&A pages for SEO (`/questions/what-is-riba`)

#### AI roadmap — phased (post-launch)

> Verifiable build tasks: **§9 Phase 5**.

| Phase | Feature | Trigger | What it does |
|---|---|---|---|
| **Phase 4** *(launch — §9 Phase 4)* | Ask form + FAQ page + CMS inbox | Launch | Build the **dataset** — no AI yet |
| **5a** | FAQ keyword search | ~20+ published Q&A | Search existing answers on Q&A page |
| **5b** | **Similar questions** before submit | ~30+ Q&A | “Your question may already be answered” — semantic match |
| **5c** | **AI draft answer** in CMS | ~50+ Q&A | New pending question → AI drafts from similar past Q&A → **father approves/edits** before publish |
| **5d** | **Public RAG assistant** | ~50+ Q&A, father opts in | Visitor asks → retrieve top 3 similar Q&A → LLM answers **only from those sources** + disclaimer + WhatsApp fallback |

> **Naming:** Homepage section **4b** = “Dr. Akram recommends” teaser — not a build phase. Q&A at launch = **§9 Phase 4** only.

**Phase 5 tech (when ready):**

| Layer | Choice | Notes |
|---|---|---|
| Embeddings | OpenAI / Voyage / multilingual-e5 | Urdu + English support required |
| Vector store | Pinecone · Supabase pgvector · Upstash Vector | Sync on `faqEntry` publish |
| LLM | OpenAI · Anthropic · Gemini via API route | Grounded prompts only — no freestyle fatwa |
| Hosting | Vercel serverless API routes | AI routes **never** on critical mobile path |

**Optional install (Phase 5 only — not Phase 1):**

```bash
# Phase 5 — add when corpus is ready
pnpm add ai @ai-sdk/openai          # Vercel AI SDK
# + vector DB client (Pinecone etc.) — TBD at Phase 5
```

#### Rules (non-negotiable)

| Rule | Why |
|---|---|
| AI answers **only** from `published` + `aiReady` corpus | His voice, his views — not random web content |
| **Father approves** all AI drafts before publish (Phase 5c) | Trust + accuracy for Islamic/economic topics |
| **Private** questions never enter AI corpus | Personal matters stay off-site |
| Public AI shows **sources** (“Based on Dr. Akram’s answer from…”) | Transparency |
| Always offer **WhatsApp / Contact** when AI unsure | Human fallback |
| AI chat widget **lazy-loaded** — optional add-on | Keeps initial bundle lean; not a mobile motion restriction |

**Minimum corpus before Phase 5d:** ~**50 approved Q&A pairs** across topics — otherwise little to retrieve.

### 5.5 Content Studio — Weekly Video Brief Agent (private, for father)

> **Use case:** Every week, father receives **2 suggested YouTube topics** + **research + a complete draft script** in his voice (Islamic economics / Dars + current affairs through Quranic lens). He reads, adjusts, records, publishes to YouTube, then adds the link in **Lectures** (§4).

**Verdict:** **Strong idea and doable** — same RAG stack as §5.4, different output (long-form script vs short FAQ). **Not public-facing** — private admin tool + **direct delivery to father only**. **No son in the loop** — briefs go straight to his email + WhatsApp; **he verifies everything himself** before recording.

#### Two weekly topics (fixed format)

| # | Type | Urdu label | Example |
|---|---|---|---|
| **1** | **Expertise** | **اختصاص** — اسلامی معاشیات / درس قرآن | "Riba in digital banking — what students should know" |
| **2** | **Current affairs + Quran** | **حالاتِ حاضرہ — قرآن کی روشنی میں** | "Inflation and cost of living — guidance from Surah and sunnah principles" |

Agent picks timely topic #2 from news *(balanced tone — avoid sensationalism)*. **No human approval step** — goes direct to father; he decides what to use.

#### What father receives each week

| Deliverable | Content |
|---|---|
| **Topic card** | Title (UR + EN), why this week, suggested length (8–12 min) |
| **Research brief** | Bullet summary, key ayat/hadith references *(to verify)*, points from **his books**, optional external context |
| **Full script** | Word-for-word teleprompter-style draft — Urdu primary, English optional; marked sections: intro · main points · conclusion · CTA |
| **Note to father** | *"This is a draft — verify all ayat, hadith, and facts yourself before recording. Say it in your own words. You may paste this script into ChatGPT, Claude, or any AI and add your thoughts to refine it. You are the authority — no one else checks this before you."* |

**He owns the final word** — script is a starting point; **he verifies and approves on his own** before camera. Nothing is reviewed by son or developer first.

#### Where it lives (architecture)

```
┌─────────────────────────────────────────────────────────────┐
│  NOT on public website — private Content Studio             │
├─────────────────────────────────────────────────────────────┤
│  Sanity Studio → Content Studio (مواد سازی)                   │
│    · Weekly briefs (contentBrief)                           │
│    · Knowledge library (knowledgeDocument) — his PDFs/notes │
│  Cron (Vercel Hobby) → daily 6am PKT, Monday-only in handler → email   │
│  Shared RAG corpus with §5.4:                               │
│    · book + readingRecommendation text                      │
│    · faqEntry (published)                                   │
│    · knowledgeDocument uploads                              │
└─────────────────────────────────────────────────────────────┘
         ↓ after recording
  Lectures CMS → paste YouTube URL (existing flow)
```

**Sits beside:** §5.4 Q&A (same knowledge, different output) · **Lectures** (post-publish only) · **Books** (corpus source).

**Does not sit on:** Homepage, public nav, or visitor-facing pages until he publishes the video.

#### Delivery channel — direct to father only

| Channel | Best for | Notes |
|---|---|---|
| **Email (Resend)** | Full script + research — primary delivery | Sent to `siteSettings.email` — no CC to son |
| **WhatsApp** | Short ping + link to full brief | Sent to `siteSettings.whatsapp` — automated when API ready |
| **Sanity Studio link** | Full brief in browser | Same login he already uses; optional backup |

**Recommendation:** **Email with full script** every Monday + **WhatsApp notification** to his number. **Son is not in the delivery chain.**

Delivery targets from **`siteSettings`**: `email`, `whatsapp` *(his personal/public numbers)*.

| Phase | WhatsApp delivery |
|---|---|
| **6a–6b** | Email only *(full script)* — zero setup |
| **6c+** | Email + automated WhatsApp template to his number *(WhatsApp Business Cloud API or similar)* |

#### Knowledge base — his books & uploads

**Not “training a model”** — **RAG** (same as §5.4): embed documents, retrieve relevant chunks when writing scripts.

| Source | How it enters corpus |
|---|---|
| **His books** | Sanity `book` descriptions + optional full-text PDF upload per book |
| **Published FAQ** | `faqEntry` where `aiReady: true` |
| **Reading recommendations** | Titles + his recommendation notes |
| **New uploads** | `knowledgeDocument` — PDF, DOCX, pasted notes, lecture transcripts |

**CMS schema: `knowledgeDocument`**

| Field | Type | Example |
|---|---|---|
| `title` | string | "Islamic Economics ch. 3 — Riba" |
| `type` | enum | Book chapter · Lecture notes · Article · Other |
| `file` | file | PDF upload |
| `extractedText` | text | Auto-extracted for search *(server-side)* |
| `language` | enum | `ur` · `en` · `both` |
| `includeInContentStudio` | boolean | Feed weekly brief agent |
| `uploadedAt` | datetime | |

Father uploads via Sanity *(or bulk import once)* — **Include in Content Studio** toggle. Son not required for weekly flow.

**CMS schema: `contentBrief`**

| Field | Type | Example |
|---|---|---|
| `weekOf` | date | 2026-06-09 |
| `topicType` | enum | `expertise` · `currentAffairs` |
| `titleEn` / `titleUr` | string | |
| `researchBriefEn` / `researchBriefUr` | text | Bullet research pack |
| `scriptEn` / `scriptUr` | text | Full teleprompter script |
| `status` | enum | `draft` · `sent` · `recorded` · `published` |
| `youtubeUrl` | url | Filled after he publishes → link to `lecture` doc |
| `sourcesUsed` | array | RAG source refs *(audit trail)* |
| `sentAt` | datetime | |

#### Multi-phase rollout

> **Principle:** Every phase sends **directly to father**. He verifies ayat, facts, and opinions **himself**. No son approval, no developer review.  
> Verifiable build tasks: **§9 Phase 6**.

| Phase | What | Delivery |
|---|---|---|
| **6a — Email start** *(start here)* | System generates 2 briefs (template or simple AI) → auto-send | **Email to father only** — Monday cron |
| **6b — AI topics + script** | Agent picks topic #2 + writes research + full script from corpus | Email direct; brief note: *verify yourself* |
| **6c — Full automation** | Daily cron 6am PKT + Monday guard → both briefs → email + WhatsApp to his number | Fully automated, no human in middle |
| **6d — Full RAG** | Books + `knowledgeDocument` + FAQ in vector index; scripts cite his published views | Same direct delivery |
| **6e — Feedback loop** | Optional: he pastes final script back in Studio → improves future briefs | Self-service in CMS |

**Start 6a** as soon as `siteSettings` has his email — can run before public site launch.

#### Rules & cautions

| Rule | Why |
|---|---|
| **Father verifies everything himself** | Ayat, hadith, news facts, opinions — script says so on every brief; he is the scholar |
| **No son/developer in the loop** | Briefs sent direct to his email/WhatsApp — he decides what to record or skip |
| **Current-affairs scripts — his judgment** | Agent avoids sensational topics; father filters what he will say on camera |
| **Quranic references — “please verify”** | AI can misquote — flagged in every script |
| **Disclaimer on every brief** | *Draft for your preparation only — your recorded word is authoritative* |
| **External AI editing encouraged** | Paste into ChatGPT/Claude, add his thoughts — no lock-in |
| **Private until YouTube publish** | Briefs not indexed on public site |
| **Urdu-first scripts** | Match his audience |

#### Tech (Phase 6a+ — shares §5.4 stack)

- **Vercel Cron (Hobby — UTC only):** schedule `0 1 * * *` *(01:00 UTC = 06:00 PKT)*; handler checks `Intl` / `Asia/Karachi` — **run brief generation only on Monday** *(Hobby allows daily cron, not arbitrary weekly — Monday guard avoids missing weeks)*  
- `/api/content-studio/generate` — RAG + LLM long-form  
- Resend → **father’s email only** (`siteSettings.email`)  
- Phase 6c+: WhatsApp Business Cloud API → **father’s WhatsApp only** (`siteSettings.whatsapp`) — template: *"اس ہفتے کے 2 موضوعات ای میل پر بھیج دیے گئے — براہ کرم خود تصدیق کریں"*  
- Optional: `@sanity/document-internationalization` if briefs bilingual  

#### Father’s weekly workflow (handover summary)

```
Monday → Email to YOU: full research + script (2 topics)
       → WhatsApp to YOU (Phase 6c+): short reminder + link
       → YOU verify ayat, facts, opinions yourself
       → Edit in your head OR paste into any AI + add your thoughts
       → Record video → YouTube
       → Lectures CMS → paste link
```

**No one else reads or approves the brief before you.**

### 5.6 SEO & Discoverability

> **Goal:** Every public page is indexable, locale-aware, and shareable — correct title/description in Google **and** WhatsApp. Bilingual hreflang so EN and UR rank independently without duplicate-content penalties. Build tasks: **§9 Phase 3.7** (foundation) + **§9 Phase 4.3** (Q&A detail pages).

#### Principles

| Rule | Why |
|---|---|
| **Server-rendered metadata** | `generateMetadata` in App Router — no client-side `<head>` hacks |
| **Locale in every URL** | `/en/...` and `/ur/...` — matches `next-intl` routing; never mix locales on one URL |
| **Canonical per locale** | Each page canonical points to itself in that locale; cross-locale via `alternates.languages` |
| **CMS-driven defaults** | `siteSettings` supplies fallback description + OG image; page-level overrides in code/i18n |
| **Structured data** | JSON-LD for `Person`, `WebSite`, `FAQPage` (Q&A), `BreadcrumbList` — validate in Rich Results Test |
| **No index for private routes** | `/studio`, `/api/*` — `robots.txt` + `noindex` on Studio layout |

#### Environment

| Variable | Example | Use |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://drmianakram.pk` | Canonical URLs, OG `url`, sitemap `loc`, JSON-LD `@id` |

Set in Vercel for preview + production. **Never** hardcode `localhost` or `*.vercel.app` in metadata once domain is live.

#### File structure (Phase 3.7)

```
src/lib/seo/
  metadata.ts      # buildPageMetadata(), locale alternates, OG/Twitter helpers
  json-ld.ts       # Person, WebSite, FAQPage, BreadcrumbList builders
  routes.ts        # PUBLIC_ROUTES list for sitemap (static pages)
src/app/
  sitemap.ts       # Dynamic sitemap — all locales + published faqEntry slugs (Phase 4)
  robots.ts        # Allow /en, /ur; disallow /studio, /api
```

#### Per-page metadata map

| Route | `title` source | `description` source | OG image |
|---|---|---|---|
| `/[locale]` (home) | i18n `metadata.home.title` | `siteSettings.metaDescription*` or i18n fallback | `siteSettings.ogImage` → `portrait` |
| `/[locale]/about` | i18n | `aboutPage.bio*` excerpt (first ~155 chars) or i18n | `portrait` |
| `/[locale]/books` | i18n | i18n | `portrait` or featured book `cover` |
| `/[locale]/lectures` | i18n | i18n | `portrait` or featured lecture thumbnail |
| `/[locale]/honors` | i18n | i18n | `portrait` or featured honor `image` |
| `/[locale]/services` | i18n | i18n | `portrait` |
| `/[locale]/afkar` | i18n | i18n | latest issue `cover` or `portrait` |
| `/[locale]/contact` | i18n | i18n | `portrait` |
| `/[locale]/questions` | i18n | i18n | `portrait` |
| `/[locale]/questions/[slug]` | `faqEntry.question*` | `faqEntry.answer*` excerpt | `portrait` *(Phase 4.3)* |

**Title template:** `{pageTitle} | Prof. Dr. Mian Muhammad Akram` — Urdu pages use Urdu page title + Urdu name from i18n.

#### hreflang & alternates (mandatory)

Every `generateMetadata` return must include:

```ts
alternates: {
  canonical: `${siteUrl}/${locale}${path}`,
  languages: {
    en: `${siteUrl}/en${path}`,
    ur: `${siteUrl}/ur${path}`,
    'x-default': `${siteUrl}/en${path}`,
  },
},
```

`path` is locale-neutral (e.g. `/about`, `/questions/what-is-riba`). Middleware already redirects `/` → `/en`.

#### Open Graph & Twitter

| Tag | Value |
|---|---|
| `og:type` | `website` (pages) · `article` (Q&A detail) |
| `og:locale` | `en_PK` · `ur_PK` |
| `og:locale:alternate` | other locale |
| `og:image` | Absolute URL via `urlForImage()` — **1200×630** crop recommended |
| `twitter:card` | `summary_large_image` |
| `twitter:title` / `twitter:description` | Same as OG |

Use Next.js `metadata.openGraph` + `metadata.twitter` — not manual `<meta>` tags.

#### JSON-LD structured data

| Page | Schema | Key fields |
|---|---|---|
| **All pages** (layout or page) | `WebSite` | `name`, `url`, `inLanguage` [`en`,`ur`] |
| **Home + About** | `Person` | `name` (EN+UR), `jobTitle`, `alumniOf`, `knowsAbout`: Islamic Economics, `image`, `sameAs` (AFAQ, TAPAK links) |
| **`/questions`** | `FAQPage` | `mainEntity[]` — each published `faqEntry` as `Question` + `acceptedAnswer` |
| **`/questions/[slug]`** | `QAPage` | Single question + answer |
| **Inner pages** | `BreadcrumbList` | Home → section *(optional v1 — add if time in 3.7e)* |

Inject via `<script type="application/ld+json">` in Server Component — `src/components/seo/JsonLd.tsx`.

#### Sitemap & robots

**`sitemap.ts`:**
- Static routes × 2 locales (`en`, `ur`)
- After Phase 4: dynamic `faqEntry` slugs where `status == "published"` × 2 locales
- `lastModified` from Sanity `_updatedAt` where available
- `priority`: home `1.0`, main nav `0.8`, Q&A detail `0.6`

**`robots.ts`:**
```
User-agent: *
Allow: /
Disallow: /studio
Disallow: /api
Sitemap: https://drmianakram.pk/sitemap.xml
```

#### i18n metadata keys

Add to `messages/en.json` + `messages/ur.json`:

```json
"metadata": {
  "home": { "title": "...", "description": "..." },
  "about": { "title": "...", "description": "..." },
  "books": { ... },
  ...
}
```

CMS `metaDescription*` overrides home description when set. Other pages: i18n defaults until father requests CMS overrides post-launch.

#### Search Console & analytics (post-deploy)

| Step | Who | When |
|---|---|---|
| Add `drmianakram.pk` property | Son | Phase 3.10 deploy |
| Submit `sitemap.xml` | Son | After 3.7d |
| Add `.com` redirect property if registered | Son | §7 |
| Monitor Coverage + Core Web Vitals | Son | Ongoing via Search Console + Vercel Speed Insights |

Father does **not** need Search Console access for v1.

#### SEO verification checklist (before public launch)

- [ ] View source on `/en` and `/ur` — unique `<title>`, `<meta name="description">`, `link rel="canonical"`, `hreflang` links
- [ ] [opengraph.xyz](https://www.opengraph.xyz) or Meta Sharing Debugger — title + image on home and one Q&A URL
- [ ] WhatsApp share preview — correct Urdu title on `/ur/questions/...`
- [ ] `https://drmianakram.pk/sitemap.xml` lists all nav pages in both locales
- [ ] `https://drmianakram.pk/robots.txt` blocks `/studio`
- [ ] Google Rich Results Test — `Person` + `FAQPage` valid
- [ ] Lighthouse SEO score ≥ 90 on home (mobile)

#### What stays out of v1

- Blog/article SEO *(deferred — §10)*
- Per-book detail URLs *(list page only unless added later)*
- Google Analytics *(unless requested — §3.8)*
- Paid SEO tools / rank tracking

### What stays in code (rarely changes)
- Site layout, design, navigation
- About page **layout** (timeline UI, sections) — **copy lives in CMS** (`aboutPage` singleton)
- Language system

---

## 6. Design Direction

**Feel:** Premium academic — think modern university professor portfolio, not outdated Islamic site clichés. **Rich motion welcome** — parallax hero, scroll-triggered reveals, smooth scroll, animated cards.

**Layout reference:** Techwind **`index-personal.html`** (`techwind-330/.../HTML/Landing/src/index-personal.html`) — port patterns into Next.js with **green/gold palette** (not Techwind purple). Reuse: floating hero intro card, wave section divider, services card grid, experience timeline, full-width CTA band, image grids (→ books/honors). Skip: client logo strip, developer skill bars, freelancer copy.

**Visual elements:**
- Large professional portrait on homepage — processed via §5.2 portrait presets if original has messy background
- Warm, trustworthy palette (deep green / gold accents / off-white — Islamic scholarly without being dated)
- Urdu: **Noto Nastaliq Urdu** via `next/font` (single subset weight)
- English: **Inter** via `next/font`; optional **Geist** for UI chrome
- Subtle geometric Islamic patterns as background texture (not overpowering)
- **Animations on all devices** — Framer Motion section reveals, GSAP timeline, Lenis smooth scroll, hero parallax, optional 3D geometric background; static fallback only for `prefers-reduced-motion`
- **Mobile-first layout** — phone layout is the primary design, not an afterthought

**Mobile UI specifics:**
- Fixed **bottom action bar** on phone: Call · WhatsApp · Contact
- Single-column layout; no horizontal scrolling ever
- Big readable text (min 16px body, larger headings)
- Cards stack vertically; book covers in 2-column grid max on phone
- Language toggle as a simple, large button (اردو / EN)
- No pop-ups, no cookie banners blocking the screen

**Homepage sections** *(Techwind `index-personal.html` → **§9 Phase 1c** for static shell; CMS data in Phase 2)*:

| # | Section | Phase 1c component | CMS / later |
|---|---|---|---|
| 1 | Hero — floating card, portrait, name, tagline | `HomeHero` | `siteSettings` tagline + portrait (1b / 2b) |
| 2 | Credentials — round photo, degrees (not skill bars) | `HomeCredentials` | `aboutPage` bio excerpt |
| 3 | Services — Dars · Islamic Economics · Speaking | `HomeServices` | static |
| 4 | Career timeline | `HomeTimeline` | `aboutPage.careerMilestones[]` (2.0) |
| 5 | CTA band — Dars & lectures | `HomeCtaBand` | static |
| 6 | Featured grid — books & honors placeholders | `HomeFeaturedGrid` | `book` + `honor` `featured` (Phase 2) |
| 6b | “Dr. Akram recommends” teaser | part of featured grid or `HomeLatestSection` | `recommendedBook` (Phase 2) |
| 7 | Latest lectures / Q&A teasers | `HomeLatestSection` | `lecture` + `faqEntry` (Phase 2 / 4) |
| 8 | Contact CTA strip | `HomeContactCta` | `siteSettings` phone/WhatsApp (1b) |

*Phase 1c ships rows 1–5 + 8 with placeholders for 6–7. Phase 2 replaces placeholders with real CMS carousels/grids.*

**Books page design:**
- **Two tabs** at top — large, thumb-friendly: **میری کتابیں / My Books** · **مطالعہ کی تجویز / Recommended Reading**
- Same card grid for both tabs; recommendation cards show **author** + short **"Why Dr. Akram recommends this"** quote *(truncated on card, full on tap)*
- **My Books tab:** filter chips by level (M.A., B.Com., etc.)
- **Recommended Reading tab:** filter chips by topic (Islamic Economics · Quran & Tafsir · Islamic Studies · History · General)
- Recommendation cards: subtle gold **"Recommended"** badge — distinct from his authored works
- Tap card → detail: full recommendation note, buy link, cover
- **Services → Islamic Economics Consultation** links here: *"See books Dr. Akram recommends"*

**Q&A page design (سوالات و جوابات):**
- Clean FAQ accordion — question headline → expand Dr. Akram’s answer (`prose`, RTL for Urdu)
- Filter chips: Islamic Economics · Dars / Quran · Lectures · Books · General
- Search bar at top *(keyword at launch; semantic in Phase 5)*
- Prominent **Ask a question** button — form with topic + question + optional name/phone
- Disclaimer strip: *For personal matters, contact via WhatsApp — published answers are general guidance*
- Featured Q&A on homepage (2–3 items) — builds trust before AI phase
- Individual Q&A URLs for SEO and WhatsApp sharing
- **Phase 5d only:** optional “Ask AI” chat — lazy-loaded, cites source Q&A, WhatsApp fallback

**Honors & Awards page design:**
- Proud but dignified — trophy case / hall of recognition feel, not boastful
- **Uniform photo treatment** — all honors share the same professional backdrop via §5.2 enhancer (consistent greens/golds even when originals were messy event photos)
- **Grid layout:** 2 columns on phone, 3–4 on desktop
- Each card: photo, title, organization, year, type badge (shield/trophy icon)
- **Tap any photo** → full-screen lightbox (Radix dialog) with pinch-zoom friendly view
- **Filter chips:** All · Shields · Trophies · Certificates
- Optional **stats bar** at top: "40+ honors from 25+ organizations" *(auto-counted from CMS)*
- Gold accent borders on featured items — matches site palette

**Suggested tagline (draft — approve or edit):**
- EN: *"Scholar of Islamic Economics · Educator · Author"*
- UR: *"اسلامی معاشیات کے ماہر · استاد · مصنف"*

---

## 7. Domain — `drmianakram.pk` vs `drmianakram.com`

No domain owned yet. **Top choice (both extensions):** **`drmianakram.pk`** and **`drmianakram.com`** — short, professional, easy to say on phone and WhatsApp.

Check availability: [.pk via PKNIC registrar](https://pknic.net.pk) · [.com via name.com](https://www.name.com) or any registrar.

### Recommended setup

| Role | Domain | Why |
|---|---|---|
| **Primary (main site)** | **`drmianakram.pk`** | Pakistan audience, trust, matches `.pk` institutions (Punjab Uni, PKNIC). Best for WhatsApp shares locally |
| **Secondary (redirect)** | **`drmianakram.com`** | International visitors, email flexibility, typo safety — **301 redirect → `.pk`** |
| **Email (optional)** | `contact@drmianakram.pk` or `@drmianakram.com` | Pick whichever domain you register first; both work if configured |

**Budget allows one only?** → Register **`drmianakram.pk`** first.  
**Budget allows both?** → Register **both**; `.com` redirects to `.pk` so there is only one website to maintain.

### `.pk` vs `.com` — quick comparison

| | **`.pk`** (`drmianakram.pk`) | **`.com`** (`drmianakram.com`) |
|---|---|---|
| **Best for** | Pakistan — students, teachers, local orgs | International / diaspora, generic “professional” feel |
| **Trust locally** | High — familiar for `.pk` sites | Fine, but less “local professor” signal |
| **WhatsApp / word of mouth** | Easy: *“drmianakram dot pk”* | Easy: *“drmianakram dot com”* |
| **Cost (approx.)** | ₨1,000–3,000/year (PKNIC registrar) | ~$10–15/year (~₨2,800–4,200) |
| **Registration** | PKNIC-accredited `.pk` registrar | Any global registrar (Namecheap, Cloudflare, etc.) |
| **SSL** | Free via Vercel / Let’s Encrypt | Free via Vercel / Let’s Encrypt |

**Verdict:** **`.pk` primary** for this project (audience is mostly Pakistan). **`.com` as optional redirect** if both are available.

### Other options (if `drmianakram` is taken)

| Priority | Domain | Notes |
|---|---|---|
| ⭐ Backup `.pk` | `profdrakram.pk` | Clear academic identity |
| Good `.com` | `drmianmuhammadakram.com` | Full name, international |
| Good `.com` | `mianmuhammadakram.com` | Formal, memorable |
| Short `.pk` | `drakram.pk` | Very short — may be taken |
| Alternative `.pk` | `profakram.pk` | Simple |

### Technical notes (son handles at launch)

- DNS → Vercel; SSL automatic  
- If both registered: `drmianakram.com` → 301 → `https://drmianakram.pk`  
- Open Graph / WhatsApp link previews use primary domain  
- Add both to Google Search Console (`.com` property can point to same site via redirect)

### Decision status

| Item | Status |
|---|---|
| **Preferred name** | `drmianakram` *(confirmed)* |
| **Primary TLD** | **`.pk`** *(recommended)* |
| **Also register `.com`?** | Yes if available + budget — redirect only |
| **Availability check** | 🔲 Confirm both free before registering |
| **Registrar** | 🔲 Pick `.pk` registrar + optional `.com` registrar |

---

## 8. Content Checklist

### Ready now ✅
- [x] Full name confirmed
- [x] All roles & organizations confirmed
- [x] PhD field confirmed (Economics / Islamic Economics)
- [x] Punjab University — Islamic Economics, still active
- [x] Hamdard — Deputy Speaker, Shoora Hamdard
- [x] Afkar-e-Muallim confirmed
- [x] Photo available (to send)
- [x] Languages: Urdu + English
- [x] Contact: public phone/WhatsApp + form
- [x] Design: very modern
- [x] Mobile: responsive + touch-friendly; **premium animations on all devices** (§5.1)
- [x] CMS: father updates content
- [x] CMS Help desk + first-login guided tour for father (§5.3)
- [x] UI stack: full Next.js polish libraries (§5.0) — **unrestricted motion**
- [x] Books page: My Books + Recommended Reading tabs (§4)
- [x] Honors gallery: shields, trophies, certificates from events
- [x] Shared Media Enhancer: honors, portrait, covers, logos — free AI + presets (§5.2)
- [x] Q&A knowledge base + AI roadmap — ask form, FAQ, future RAG (§5.4)
- [x] Content Studio: weekly 2-topic video briefs + RAG from his books/uploads (§5.5)
- [x] Domain strategy: **`drmianakram.pk`** primary + **`drmianakram.com`** optional redirect (§7)

### Still needed before / during build 🔲
- [ ] **Professional photo** (high-res; messy background OK — §5.2 portrait enhancer)
- [ ] **Phone number** (for public display)
- [ ] **WhatsApp number** (may be same as phone)
- [ ] **Email address**
- [ ] **List of books (authored)** — titles, covers, descriptions, purchase links *(publisher cover files preferred — §5.2)*
- [ ] **Reading recommendations** — books he suggests to students/visitors: title, author, why he recommends, topic *(ask father — can start with 5–10 classics in Islamic economics & Islamic studies)*
- [ ] **Lecture videos** — YouTube links or channel *(ask father)*
- [ ] **Urdu name spelling** — confirm: میاں محمد اکرم
- [ ] **Short bio** in his own words — enter in **About Page** CMS after Phase 2.0 *(or draft from public info for his approval)*
- [ ] **Domain** — register **`drmianakram.pk`** (primary); add **`drmianakram.com`** redirect if available (§7)
- [ ] **Afkar-e-Muallim** — link to issues/PDFs; issue cover photos if available *(§5.2 cover enhancer)*
- [ ] **Honors photos** — shields, trophies, certificates *(phone photos OK — §5.2)*
- [ ] **Organization logos** — AFAQ, Tanzeem, Hamdard, Punjab University *(optional — §5.2 logo preset)*
- [ ] **Seed FAQ entries** — 5–10 common questions + answers to launch Q&A page *(ask father — Islamic economics, Dars, books)*
- [ ] **SEO meta descriptions** — short EN + UR blurbs for Google/WhatsApp previews in **Site Settings** *(§5.6; son can draft from bio for father’s approval)*

### Nice-to-have (can add after launch)
- [ ] CV / resume PDF download
- [ ] Testimonials from students/colleagues
- [ ] Social media links (if any)
- [ ] **Articles / announcements blog** *(not in v1 — no §9 phase; add schema + page only if father requests)*

---

## 9. Build Phases

> **Purpose:** Small, verifiable steps so nothing is guessed during build.  
> **Rule:** Do not start the next task until the current task’s **Verify** checklist passes.

### How to use this section

1. Work **top to bottom** within each phase.
2. Each task has: **Build** → **Verify** → **Do not** (scope guard).
3. If a verify step fails, fix it before continuing — do not skip ahead.
4. Use **placeholders** where content is missing (photo, phone, books); swap in Phase 2.
5. When unsure about a field name or route, **grep the repo** or read **§5** above — do not invent schemas.

### Pre-flight (before Phase 0)

| Item | Required for launch | Can use placeholder? |
|------|---------------------|----------------------|
| Professional photo | Phase 2b hero | Yes — gray placeholder image |
| Phone / WhatsApp / Email | Contact page + forms | Yes — fake numbers, swap later |
| Books list | Books page content | Yes — 1–2 sample books in Sanity |
| Honors photos | Honors gallery | Yes — skip gallery until Phase 2a |
| Domain | Production URL | Yes — use `*.vercel.app` until Phase 3 |
| Sanity project | Phase 1b data fetching | **Done** — project `5ce34emc`; CORS + publish `siteSettings` manual |

**Verify pre-flight:** You have read **§4** (site structure) and **§5** (stack). You know which pages exist in nav.

### Phase 0 — Repository bootstrap

**Goal:** Empty Next.js app runs locally with zero custom pages beyond a health check.

#### 0.1 — Create Next.js project

| | |
|---|---|
| **Build** | `pnpm create next-app@latest` with: App Router, TypeScript, Tailwind, ESLint, `src/` optional, import alias `@/*`. Pin **Next.js 15.x** *(upgrade to 16 before Oct 2026 EOL — §5)* |
| **Verify** | `pnpm dev` → `http://localhost:3000` shows default page |
| **Do not** | Install Sanity, shadcn, or motion libraries yet |

#### 0.2 — Folder structure

| | |
|---|---|
| **Build** | Create empty dirs: `src/components/`, `src/lib/`, `src/app/[locale]/`, `messages/` |
| **Verify** | `ls` shows structure; `pnpm build` still passes |
| **Do not** | Add pages beyond `[locale]/layout.tsx` placeholder |

#### 0.3 — Environment template

| | |
|---|---|
| **Build** | `.env.example` with commented keys: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`, `RESEND_API_KEY`, `MEDIA_ENHANCE_SECRET`, `NEXT_PUBLIC_SITE_URL` *(§5.6 — canonical + OG)* |
| **Verify** | `.env.local` gitignored; `.env.example` committed |
| **Do not** | Put real secrets in `.env.example` |

#### 0.4 — Git + README

| | |
|---|---|
| **Build** | Minimal `README.md`: how to run dev, link to this plan |
| **Verify** | `git status` clean after first commit (if repo initialized) |
| **Do not** | Document features not built yet |

**Phase 0 exit:** `pnpm build` succeeds. No i18n, no CMS, no custom UI.

> **Done (8 June 2026):** All tasks 0.1–0.4 verified. `pnpm build` passes; `/` returns default page. `.env.example` committed; `.env.local` gitignored. Initial git commit deferred to developer. Sanity project **`5ce34emc`** created (Phase 1b).

### Phase 1 — Foundation (public site shell)

**Goal:** Bilingual mobile-first site with static/placeholder content. No Sanity until Phase 1b.

#### 1.1 — Core dependencies (minimal first)

| | |
|---|---|
| **Build** | Install: `next-intl`, `tailwindcss` (if not present), `@tailwindcss/typography`, `tailwind-merge`, `clsx`, `class-variance-authority`, `lucide-react`, `sonner`, `vaul`, `sharp` |
| **Verify** | `pnpm build` passes; `package.json` lists versions |
| **Do not** | Install `framer-motion`, `gsap`, `lenis`, R3F, `@imgly/background-removal-node` yet |

#### 1.2 — shadcn/ui init

| | |
|---|---|
| **Build** | `pnpm dlx shadcn@latest init` — add only: `button`, `card`, `input`, `label`, `textarea`, `select`, `tabs`, `accordion`, `dialog`, `sheet` |
| **Verify** | Import `<Button>` in a test page renders without error |
| **Do not** | Add every shadcn component — add on demand per task |

#### 1.3 — Fonts (`next/font`)

| | |
|---|---|
| **Build** | `src/lib/fonts.ts`: Inter (EN), Noto Nastaliq Urdu (single weight subset) |
| **Verify** | DevTools Network: fonts load from `/_next/static`; no Google Fonts CDN request |
| **Do not** | Load 3+ Urdu weights |

#### 1.4 — i18n routing (`next-intl`)

| | |
|---|---|
| **Build** | `src/middleware.ts`, `src/i18n/routing.ts`, `messages/en.json`, `messages/ur.json` with keys: `nav.*`, `common.languageToggle` |
| **Verify** | `/en` and `/ur` both load; `/` redirects to default locale |
| **Do not** | Translate full page copy yet — nav labels only |

#### 1.5 — RTL layout

| | |
|---|---|
| **Build** | `[locale]/layout.tsx`: `dir="rtl"` when `locale === 'ur'`; language toggle component in header |
| **Verify** | On `/ur`, header/nav align right; toggle switches to `/en` and back |
| **Do not** | Mirror icons incorrectly (phone/WhatsApp icons stay recognizable) |

#### 1.6 — Design tokens (Tailwind)

| | |
|---|---|
| **Build** | `globals.css`: deep green, gold accent, off-white; mobile-first spacing; min tap target 48px utility |
| **Verify** | One test button is ≥48×48px on 320px viewport (Chrome DevTools) |
| **Do not** | Add dark mode yet (Phase 3 optional) |

#### 1.7 — Site layout shell

| | |
|---|---|
| **Build** | `Header` (nav links per §4), `Footer`, `MobileBottomBar` (Call · WhatsApp · Contact placeholders) |
| **Verify** | All nav routes exist (can 404 content); bottom bar visible only on mobile (`md:hidden`) |
| **Do not** | Wire real `tel:` / `wa.me` until contact data exists |

#### 1.8 — Home page (static placeholders)

| | |
|---|---|
| **Build** | Hero (placeholder portrait via `next/image`), tagline from messages JSON, services cards (3), static roles text |
| **Verify** | Lighthouse mobile run: no horizontal scroll at 320px; LCP image has `priority` + `sizes` |
| **Do not** | Embla carousel, Framer motion, parallax, 3D hero |

#### 1.9 — About page (placeholder until Phase 2.0)

| | |
|---|---|
| **Build** | `prose` bio (EN+UR from `messages/` placeholder), static timeline placeholder (2–3 hardcoded milestones) |
| **Verify** | Urdu bio renders RTL inside `prose`; page works with JS disabled |
| **Do not** | GSAP ScrollTrigger (Phase 3); Sanity fetch yet — replaced in **Phase 2.0** |

#### 1.10 — Contact page + form UI (no email yet)

| | |
|---|---|
| **Build** | Contact info placeholders; shadcn form (name, phone, city, type, message, optional date); `sonner` + `vaul` for mobile drawer |
| **Verify** | Submit shows toast “not configured” or client validation only; form fields large on mobile |
| **Do not** | Resend API route yet |

#### 1.11 — Remaining page shells (empty states)

| | |
|---|---|
| **Build** | Route files with title + “coming soon” or empty state: `/books`, `/lectures`, `/honors`, `/services`, `/afkar`, `/questions`, `/contact` (if not done) |
| **Verify** | Every link in `Header` navigates without 404 |
| **Do not** | Fetch from Sanity |

#### 1.12 — Responsive + motion baseline

| | |
|---|---|
| **Build** | Techwind-inspired home shell (§6): hero, services, timeline placeholders; install motion libs per §5.0 when redesign lands |
| **Verify** | No horizontal scroll or broken RTL on 320px; animations run on mobile viewport in DevTools |
| **Do not** | Disable Framer/GSAP/Lenis/parallax on mobile — old-phone gating removed |

**Phase 1 exit:** Full nav works EN/UR. Home + About + Contact shell done. No CMS. **Phase 1 used minimal CSS motion only** — full Techwind + animation pass is **Phase 1c** (below).

> **Done (8 June 2026):** All tasks 1.1–1.12 verified. `pnpm build` passes; `/` → `/en`; 22 static pages. Shared JS ~115 kB. Default locale: `en`. **Post-Phase 1 polish:** (P1) desktop hamburger hidden — `md:hidden` wrapper on `MobileNav`; (P2) mobile sheet — `pe-12`/`pt-5` title, `SheetFooter` language strip; (P3) Urdu name clipping — no `line-clamp` on Nastaliq, `.font-urdu` `line-height: 1.8`.

### Phase 1c — Techwind personal home redesign

**Goal:** Rebuild **`/[locale]` home page** using layout patterns from Techwind `index-personal.html`, ported to Next.js + existing green/gold design tokens. Static copy from `messages/` + `portrait.png` until Sanity (Phase 1b) and CMS content (Phase 2). **Multi-page nav unchanged** — home is a rich landing page, not a single-page app.

**Reference (local, gitignored):** `techwind-330/techwind-330/Techwind_v3.3.0/HTML/Landing/src/index-personal.html`

**Design rules:**
- Map Techwind `primary` / purple → site `--brand` / `--gold` (see `globals.css`)
- **Keep:** hero floating card, wave divider, services grid, experience timeline, CTA band, featured image grid, contact CTA
- **Drop:** client logo strip (Amazon/Google), developer skill bars, typewriter name, “Hire me” / freelancer copy, 6-service grid (use **3** only)
- **Motion:** Framer Motion, Lenis, parallax enabled on **all viewports** (§5.1) — jarallax-style hero via CSS/`react-scroll-parallax`, animated circle background, section stagger reveals
- **Do not** embed raw Techwind HTML, Gulp partials, Tobii lightbox, or Bootstrap — React components + Tailwind only

#### Section map (`index-personal.html` → Dr. Akram home)

| Techwind section | HTML lines | Next component | Content source |
|---|---|---|---|
| Hero (floating card + name + wave) | 25–74 | `HomeHero` | `common.siteName`, `common.tagline`, `home.intro`, portrait |
| Client logos | 77–107 | — | **Skip** |
| About (round photo + skill bars) | 112–172 | `HomeCredentials` | PhD / degrees / roles list — **no skill bars**; optional play button → `/lectures` later |
| Services (icon cards) | 173–272 | `HomeServices` | Existing 3 services from `home.dars*` etc. |
| Experience timeline | 277–358 | `HomeTimeline` | `timeline.*` + `roles.*` + career milestones from §2 |
| CTA band (parallax bg) | 362–375 | `HomeCtaBand` | Dars-e-Quran + lecture invitation copy |
| Portfolio grid | 379–516 | `HomeFeaturedGrid` | Placeholder cards → `/books`, `/honors` (real images Phase 2) |
| Blog cards | 519–567 | `HomeLatestSection` | Placeholder → `/lectures`, `/questions` (Phase 2 CMS) |
| Contact block | 569–580 | `HomeContactCta` | Link to `/contact` + open contact drawer |

#### Target file structure (Phase 1c)

```
src/components/home/
  HomeHero.tsx
  HomeCredentials.tsx
  HomeServices.tsx
  HomeTimeline.tsx
  HomeCtaBand.tsx
  HomeFeaturedGrid.tsx
  HomeLatestSection.tsx
  HomeContactCta.tsx
  SectionHeading.tsx
  WaveDivider.tsx
src/components/motion/
  LenisProvider.tsx
  FadeIn.tsx                    # reusable framer wrapper
src/lib/home-data.ts            # timeline milestones (static until CMS)
src/app/[locale]/page.tsx       # compose sections; full-bleed layout
```

#### 1c.1 — Motion & carousel dependencies

| | |
|---|---|
| **Build** | `pnpm add framer-motion lenis @formkit/auto-animate react-scroll-parallax embla-carousel-react` |
| **Verify** | `pnpm build` passes; packages in `package.json` |
| **Do not** | Install GSAP/R3F yet (About page timeline — Phase 3.5); do not copy Techwind `node_modules` |

#### 1c.2 — i18n keys (EN + UR)

| | |
|---|---|
| **Build** | Add to `messages/en.json` + `messages/ur.json`: `home.heroCardTitle`, `home.heroCtaContact`, `home.heroCtaBooks`, `home.aboutLabel`, `home.credentialsTitle`, `home.experienceLabel`, `home.experienceTitle`, `home.experienceDesc`, `home.ctaBandTitle`, `home.ctaBandDesc`, `home.ctaBandButton`, `home.featuredLabel`, `home.featuredTitle`, `home.featuredBooks`, `home.featuredHonors`, `home.latestLabel`, `home.latestTitle`, `home.contactSectionTitle`, `home.contactSectionDesc`, `home.viewAll`; extend `timeline.*` with 4–6 milestone entries |
| **Verify** | `/en` and `/ur` show no missing translation keys in console |
| **Do not** | Hardcode English in components — all visible strings via `useTranslations` / server `getTranslations` |

#### 1c.3 — Home layout shell + shared UI

| | |
|---|---|
| **Build** | `SectionHeading` (uppercase brand label + h2 + optional description); `WaveDivider` (SVG from Techwind lines 69–72); home section spacing utilities in `globals.css` (optional `.home-section`, animated `.circles` background for hero — port from Techwind `_hero.css` if needed) |
| **Verify** | Storybook-style check: render `SectionHeading` on a test fragment or home page with one section |
| **Do not** | Change site-wide `--brand` colors to Techwind purple |

#### 1c.4 — `HomeHero`

| | |
|---|---|
| **Build** | Full-viewport hero: background portrait (`PORTRAIT_SRC` via `next/image`), green gradient overlay, floating intro card (tagline + intro + Contact + Books buttons), large name typography, scroll-down anchor to `#about`, `WaveDivider` below. Framer: card fade-up, name slide-in. Optional `react-scroll-parallax` on portrait layer |
| **Verify** | `/en` + `/ur`: hero readable; RTL mirrors card position; portrait `priority` + `sizes`; no horizontal overflow at 320px |
| **Do not** | Typewriter effect; “Hire me”; Amazon-style client row |

#### 1c.5 — `HomeCredentials`

| | |
|---|---|
| **Build** | Two-column block (`#about`): circular portrait (same image), dot pattern decoration, credentials list (PhD Economics · Islamic Economics, M.A. Islamic Studies, M.Sc. Economics) — replaces Techwind skill bars. Optional muted play icon linking to `/lectures` with “coming soon” empty state |
| **Verify** | Urdu credentials render with Nastaliq; no percentage bars |
| **Do not** | WordPress/JavaScript/HTML skill bars |

#### 1c.6 — `HomeServices`

| | |
|---|---|
| **Build** | Techwind-style 3-column card grid: icon in gold/brand soft box, title, description, “Read more” link → `/services`. Alternate shadow on middle card (Techwind pattern). Framer stagger on scroll into view |
| **Verify** | Exactly **3** cards; links work; tap targets ≥ 48px |
| **Do not** | Six generic UX/design services from template |

#### 1c.7 — `HomeTimeline`

| | |
|---|---|
| **Build** | Vertical timeline with dashed center line (Techwind lines 286–354): milestones from `src/lib/home-data.ts` — e.g. 2020 retirement, GC Science Principal, Punjab lecturer, AFAQ chairman, Afkar editor. Use `ltr:` / `rtl:` flip for alternating sides. Organization initials or lucide icons instead of Google/Lenovo logos |
| **Verify** | `/ur` timeline reads correctly RTL; dates and titles match §2 career facts |
| **Do not** | “UX Designer at Google” placeholder copy |

#### 1c.8 — `HomeCtaBand`

| | |
|---|---|
| **Build** | Full-width band with dark overlay on background image (stock or subtle pattern from `/public/images/`), centered headline + Contact button → `/contact` |
| **Verify** | Text contrast passes WCAG on overlay; button opens contact route |
| **Do not** | “Available for Freelancer Projects” copy |

#### 1c.9 — `HomeFeaturedGrid`

| | |
|---|---|
| **Build** | 4-column responsive grid (2 on mobile): placeholder cards for Books + Honors with hover scale/overlay (Techwind portfolio hover). Links to `/books` and `/honors`; `EmptyState` or styled placeholders until Phase 2 images |
| **Verify** | Hover animation works on desktop and touch devices; grid doesn’t break RTL |
| **Do not** | Tobii lightbox or mockup portfolio images from Techwind assets |

#### 1c.10 — `HomeLatestSection` + `HomeContactCta`

| | |
|---|---|
| **Build** | 3-card row linking to `/lectures` and `/questions` with “coming soon” teasers; final contact strip with phone icon button → `/contact` and secondary WhatsApp via existing bottom bar pattern |
| **Verify** | All CTA links resolve; contact drawer still works from hero/bottom bar |
| **Do not** | Duplicate full contact form on home (keep form on `/contact`) |

#### 1c.11 — Compose `page.tsx` + Lenis

| | |
|---|---|
| **Build** | Replace current simple home grid with full-bleed sections; wrap locale layout or home-only client boundary with `LenisProvider` (smooth scroll); respect `prefers-reduced-motion` (disable Lenis + reduce Framer) |
| **Verify** | Home scrolls smoothly; reduced-motion media query shows static behavior; `pnpm build` succeeds |
| **Do not** | Remove `Header` / `Footer` / `MobileBottomBar`; do not convert site to one-page anchor nav only |

#### 1c.12 — Sanity-ready hooks (optional, no CMS yet)

| | |
|---|---|
| **Build** | Props/interfaces on hero components: `tagline?`, `portraitSrc?` so Phase 1b can pass `siteSettings` without rewriting layout |
| **Verify** | Home still works with defaults when props omitted |
| **Do not** | Block 1c on Sanity — ship with `messages/` + `PORTRAIT_SRC` first |

#### 1c.13 — Phase 1c exit checklist

| | |
|---|---|
| **Verify** | `/en` + `/ur` home matches §6 layout reference; no freelancer/dev copy; animations run on mobile viewport; Lighthouse accessibility ≥ 90; no console i18n errors |
| **Verify** | Other pages (`/about`, `/books`, …) unchanged except shared header/footer if tweaked |
| **Do not** | Port entire Techwind pack — home only in Phase 1c |

**Phase 1c exit:** Premium animated home live. Ready for Phase 1b to swap tagline/portrait from Sanity.

> **Done (8 June 2026):** All tasks 1c.1–1c.13 verified. `src/components/home/` (8 sections + `SectionHeading`, `WaveDivider`, `HomeMotionShell`); `src/components/motion/` (`FadeIn`, `LenisProvider`); `src/lib/home-data.ts`; extended `messages/` keys. Home First Load JS ~276 kB. `embla-carousel-react` installed; featured grid is static (carousel deferred Phase 2).

#### Future Techwind borrows (not Phase 1c)

| Techwind file | Use when | Target page |
|---|---|---|
| `contact-one.html` | Phase 3 polish | `/contact` |
| `blog.html` / `blog-detail.html` | Phase 2+ | `/questions`, `/afkar` |
| `portfolio-detail-one.html` | Phase 2+ | Book / honor detail modals or routes |
| `index-personal.html` GSAP timeline | Phase 3.5 | `/about` scroll timeline (enhance `HomeTimeline` patterns) |

### Phase 1b — Sanity connection (read-only)

**Goal:** Sanity project exists; site reads `siteSettings` for contact + tagline.

#### 1b.1 — Sanity Studio package

| | |
|---|---|
| **Build** | `pnpm add next-sanity @sanity/client @sanity/image-url`; `sanity.config.ts`; Studio at `/studio` |
| **Verify** | `http://localhost:3000/studio` loads login/create project UI |
| **Do not** | Custom Studio components yet |

#### 1b.2 — `siteSettings` schema (minimal)

| | |
|---|---|
| **Build** | Fields: `taglineEn`, `taglineUr`, `phone`, `whatsapp`, `email`, `portrait` (image, optional); optional `metaDescriptionEn`/`metaDescriptionUr`, `ogImage` *(§5.6 — wired in Phase 3.7)* |
| **Verify** | Create singleton in Studio; fill test values; publish |
| **Do not** | Portrait enhancer fields (`rawPortrait`, `portraitSource`) until Phase 2b |

#### 1b.3 — Sanity fetch helper

| | |
|---|---|
| **Build** | `src/lib/sanity/client.ts`, `queries.ts` with `getSiteSettings()` |
| **Verify** | Home hero tagline + portrait props (Phase 1c components) + Contact page show values from Sanity after refresh |
| **Do not** | Hardcode contact numbers in components if Sanity has data |

**Phase 1b exit:** Studio publishes; site displays live contact/tagline from CMS.

> **Done (8 June 2026):** All tasks 1b.1–1b.3 verified. Packages: `next-sanity@9`, `@sanity/client`, `@sanity/image-url`, `sanity@3`, `styled-components`. Studio at `/studio`; `sanity/schemas/siteSettings.ts` singleton; `getSiteSettings()` (React `cache`, 60s revalidate) wired to home, contact, `MobileBottomBar`. Lazy Sanity client — build passes without env. **`1b.P1`:** root `layout.tsx` gets `<html>`/`<body>`; `LocaleHtmlAttributes` sets `lang`/`dir` on locale routes (fixes `/studio` runtime error). **`1b.P2`:** `pnpm build` → webpack only (drop `--turbopack`). **Manual:** CORS origin `http://localhost:3000` (credentials) in Sanity API tab.

### Phase 2 — Content types & pages (no enhancer yet)

**Goal:** All main pages render real CMS data. Enhancer comes in Phase 2a–2d **after** schemas exist.

#### 2.0 — Schema: aboutPage + About page CMS wiring

| | |
|---|---|
| **Build** | `aboutPage` singleton per §5 (`bioEn`, `bioUr`, `careerMilestones[]`); `getAboutPage()` query; About page reads CMS instead of placeholders |
| **Verify** | Edit bio in Studio → `/about` updates EN+UR; add milestone → timeline shows in order; Urdu bio RTL in `prose` |
| **Do not** | GSAP timeline yet (Phase 3 — site-wide motion per §5.1); hardcoded bio after this task |

#### 2.1 — Schemas: books

| | |
|---|---|
| **Build** | `book` + `readingRecommendation` per §5 schemas (all fields; `cover` image only — no custom input yet) |
| **Verify** | Studio: create 1 book + 1 recommendation; both appear in dataset |
| **Do not** | `CoverUploadInput` — use default Sanity image field for now |

#### 2.2 — Books page

| | |
|---|---|
| **Build** | Tabs: My Books · Recommended Reading; grid cards; filter chips (level / topic); `auto-animate` on filter |
| **Verify** | `/books` shows seeded items; filters hide/show cards; Urdu tab labels correct |
| **Do not** | Featured carousel on homepage yet |

#### 2.3 — Schemas: lectures, honors, organizations, afkar

| | |
|---|---|
| **Build** | `lecture`, `honor`, `organization`, `afkarIssue` per §5 |
| **Verify** | Each document type: create 1 sample doc in Studio |
| **Do not** | `PhotoEnhancerInput` on honors yet |

#### 2.4 — Lectures page

| | |
|---|---|
| **Build** | Grid with YouTube thumbnail; **tap-to-load** iframe (facade pattern — no iframe until click) |
| **Verify** | Network tab: no `youtube.com` request until thumbnail clicked |
| **Do not** | Autoplay embeds |

#### 2.5 — Honors page

| | |
|---|---|
| **Build** | Grid 2-col mobile; filter by type; Radix dialog lightbox; pagination/load more (max 12) |
| **Verify** | 12+ test honors paginate; tap opens lightbox; uses `honor.image` field |
| **Do not** | Homepage carousel until 2.7 |

#### 2.6 — Services + Afkar + About organizations

| | |
|---|---|
| **Build** | Services: 3 sections with copy + link to Books recommendations; Afkar: issue carousel (`embla-carousel-react`); About: pull `organization` list *(bio/timeline already from Phase 2.0)* |
| **Verify** | Services “Islamic Economics” links to `/books?tab=recommendations`; Afkar carousel swipes on touch; About shows org logos + roles |
| **Do not** | PDF viewer — link download only; re-hardcode bio |

#### 2.7 — Homepage CMS sections

| | |
|---|---|
| **Build** | Wire Phase **1c** components to Sanity: `HomeFeaturedGrid` ← `book` + `honor` where `featured: true`; `HomeLatestSection` ← latest `lecture` + featured `faqEntry`; optional org row in `HomeCredentials` or separate strip from `organization` schema |
| **Verify** | Toggle `featured: true` on 1 book/honor → appears in existing home grid/carousel after revalidate; placeholders removed |
| **Do not** | Rebuild home layout from scratch — extend 1c components only; skip `plaiceholder` until 2.8 |

#### 2.8 — Images polish

| | |
|---|---|
| **Build** | `plaiceholder` for hero + book covers; `next/image` `sizes` on all grids |
| **Verify** | Blur placeholder shows before image load; no layout shift (CLS) |
| **Do not** | Run enhancer API |

**Phase 2 exit:** All content pages work with standard Sanity image uploads. Father can add content without enhancer.

### Phase 2a — Media Enhancer: Honors (§5.2)

**Goal:** Father can enhance honor photos in Studio.

#### 2a.1 — Install enhancer deps + model assets

| | |
|---|---|
| **Build** | `pnpm add @imgly/background-removal-node`; ensure `sharp` present; copy **`small`** ONNX/WASM to `public/enhance-models/`; `src/lib/media/removeBg.ts` with `publicPath` + `model: 'small'` |
| **Verify** | `pnpm build` passes; `public/enhance-models/` committed; no imgly import in client bundles |
| **Do not** | Import imgly in client components; use `medium` model on Vercel Hobby |

#### 2a.2 — Preset engine (honors only)

| | |
|---|---|
| **Build** | `src/lib/media/presets/honor.ts`: `honor-velvet-green`, `honor-gold-gradient`, `honor-cream-neutral` compositing with `sharp` |
| **Verify** | Unit test or script: pass local PNG → outputs WebP with correct dimensions (max 1600px) |
| **Do not** | Portrait or cover presets in same file without tests |

#### 2a.3 — API route (Vercel Hobby–safe)

| | |
|---|---|
| **Build** | `POST /api/media/enhance` — `runtime: 'nodejs'`, `maxDuration: 10`; auth via `MEDIA_ENHANCE_SECRET` or Sanity token; downscale to 1024px; `model: 'small'`; compositing via honor presets |
| **Verify** | `curl` with secret returns processed WebP; 401 without auth; **deploy to Vercel Hobby preview** — enhance completes in &lt;10s on **second** request (warm); timeout returns JSON error + Studio retry message |
| **Do not** | Expose route publicly without auth; rely on runtime CDN model fetch; expect cold-first-click to always succeed on Hobby |

#### 2a.3b — Optional model warm-up cron (Hobby)

| | |
|---|---|
| **Build** | `GET /api/media/warm` — loads models only; Vercel cron `0 4 * * *` UTC *(9am PKT, off-peak)* |
| **Verify** | Vercel Cron logs show 200; subsequent Studio enhance faster same day |
| **Do not** | Use more than 1–2 cron slots total on Hobby (Content Studio shares slot in Phase 6) |

#### 2a.4 — `PhotoEnhancerInput` (Studio)

| | |
|---|---|
| **Build** | Custom input on `honor`: `rawImage` → enhance → preview → write `image`; `backgroundStyle` enum; `autoEnhanced` flag |
| **Verify** | Studio: upload phone photo → “تصویر بہتر بنائیں / Enhance photo” → preview → save → site shows processed image |
| **Do not** | Dual-path on honors (enhance-first only per §5.2) |

**Phase 2a exit:** One honor enhanced end-to-end in Studio and visible on `/honors`.

### Phase 2b — Media Enhancer: Portrait

#### 2b.1 — Portrait presets

| | |
|---|---|
| **Build** | `src/lib/media/presets/portrait.ts`: `portrait-green`, `portrait-neutral`, `portrait-gradient` |
| **Verify** | Script test: head-and-shoulders crop applied; softer shadow than honors |
| **Do not** | Reuse honor backdrop for portrait |

#### 2b.2 — Extend `siteSettings` schema

| | |
|---|---|
| **Build** | Add: `portraitSource`, `rawPortrait`, `portraitStyle`, `autoEnhancedPortrait` |
| **Verify** | Existing `portrait` still displays if new fields empty |
| **Do not** | Break hero if only old `portrait` filled |

#### 2b.3 — `PortraitUploadInput` (Studio)

| | |
|---|---|
| **Build** | Dual path: Direct professional photo vs Enhance; writes to single `portrait` field |
| **Verify** | Direct upload → hero updates; enhance path → preview → hero + OG meta image |
| **Do not** | Run publisher-quality direct photo through enhancer UI |

**Phase 2b exit:** Hero and About use `siteSettings.portrait` from either path.

### Phase 2c — Media Enhancer: Covers

#### 2c.1 — Cover presets

| | |
|---|---|
| **Build** | `src/lib/media/presets/cover.ts`: `cover-flat-cream`, `cover-flat-green`, `cover-flat-gold` |
| **Verify** | Test image → fixed aspect ratio card with shadow |
| **Do not** | Enhance path for flat vector publisher art (guard in UI copy) |

#### 2c.2 — `CoverUploadInput` (Studio)

| | |
|---|---|
| **Build** | Tab A: Publisher cover (direct to `cover`); Tab B: Photo → `rawCover` → enhance → `cover` |
| **Verify** | `book`, `readingRecommendation`, `afkarIssue` all use component; `coverSource` enum set correctly |
| **Do not** | Default tab = Photo path (must be Publisher per §5.2) |

**Phase 2c exit:** One book via direct cover + one via enhanced photo; both display identically on site.

### Phase 2d — Media Enhancer: Logos

#### 2d.1 — Logo preset

| | |
|---|---|
| **Build** | `logo-transparent` — cutout only, no backdrop |
| **Verify** | Output PNG with alpha; looks OK on green and white sections |
| **Do not** | Add gold border to logos |

#### 2d.2 — `LogoUploadInput` on `organization`

| | |
|---|---|
| **Build** | Dual path: direct file vs enhance from photo |
| **Verify** | Org row on home/about shows logo from `organization.logo` |
| **Do not** | Enhance official SVG/PNG logos (UI warning only) |

**Phase 2d exit:** At least one org logo uploaded (direct or enhanced).

### Phase 3 — CMS UX, polish & deploy prep (§5.3)

**Goal:** Father can use Studio without help from developer. Site ready for domain.

#### 3.1 — Studio structure (§5.3D)

| | |
|---|---|
| **Build** | `structure.ts`: grouped sidebar Urdu+EN labels; Books split; Q&A split; Help pinned last |
| **Verify** | Sidebar matches §5.3D tree exactly; no dev-only types visible |
| **Do not** | Rename sections without bilingual labels |

#### 3.2 — Schema descriptions (inline hints)

| | |
|---|---|
| **Build** | `description` on every field per §5.3C table |
| **Verify** | Open book cover + honor + lecture in Studio → gray helper text visible |
| **Do not** | English-only hints |

#### 3.3 — Help desk (`HelpDeskTool`)

| | |
|---|---|
| **Build** | `sanity/components/HelpDeskTool.tsx`; static content `sanity/help/tasks.ts` (bilingual); `? مدد / Help` navbar button |
| **Verify** | Help opens on mobile; task cards expand steps; Urdu RTL in panel |
| **Do not** | `helpArticle` CMS type (post-launch optional) |

#### 3.4 — Guided tour (`driver.js`)

| | |
|---|---|
| **Build** | `pnpm add driver.js`; `GuidedTour` + `data-tour` on sidebar items; `localStorage` `tourCompleted` |
| **Verify** | First Studio load shows tour; Skip works; Restart from Help reruns |
| **Do not** | More than ~10 steps without updating this section |

#### 3.5 — Site-wide motion & animations

| | |
|---|---|
| **Build** | If Phase **1c** complete: enhance About page with GSAP ScrollTrigger timeline; extend motion to inner pages. If 1c skipped: implement 1c motion stack on home first |
| **Verify** | Motion runs on 320px viewport; `prefers-reduced-motion` disables Lenis + heavy effects |
| **Do not** | `useIsDesktop` gates that strip animation on mobile — removed per §5.1 |

#### 3.6 — Optional 3D hero + parallax extras

| | |
|---|---|
| **Build** | Dynamic import R3F geometric background + enhanced parallax on home hero |
| **Verify** | Lazy chunk loads; hero still usable if WebGL fails; mobile shows same design intent |
| **Do not** | Block launch on 3D hero — skip only if visually broken, not for bundle size alone |

#### 3.7 — SEO & discoverability (§5.6)

> **Depends on:** Phase 1b `siteSettings` (portrait, tagline). **Full spec:** §5.6.

##### 3.7a — SEO foundation

| | |
|---|---|
| **Build** | `src/lib/seo/metadata.ts`, `routes.ts`; add `NEXT_PUBLIC_SITE_URL` to `.env.example`; extend `siteSettings` with `metaDescriptionEn` / `metaDescriptionUr` + optional `ogImage`; i18n `metadata.*` keys in `messages/en.json` + `ur.json` |
| **Verify** | `buildPageMetadata({ locale, path, title, description })` returns canonical + hreflang object; grep confirms env used — no hardcoded domain |
| **Do not** | Client-side `next/head` or duplicate `<title>` in components |

##### 3.7b — Per-page `generateMetadata`

| | |
|---|---|
| **Build** | Export `generateMetadata` on every `[locale]/*` page: home, about, books, lectures, honors, services, afkar, contact, questions (list). Home pulls `metaDescription*` from Sanity when set |
| **Verify** | `/en/about` and `/ur/about` view-source show distinct titles/descriptions in correct language |
| **Do not** | Single static `metadata` export in `[locale]/layout.tsx` only — layout keeps site-name default; pages override |

##### 3.7c — Open Graph + Twitter cards

| | |
|---|---|
| **Build** | OG image from `siteSettings.ogImage` → `portrait` via `urlForImage()`; `openGraph` + `twitter` in `buildPageMetadata`; `og:locale` / `og:locale:alternate` |
| **Verify** | [opengraph.xyz](https://www.opengraph.xyz) on `/en` shows title, description, 1200×630 image |
| **Do not** | Relative image URLs; wrong domain in `og:url` |

##### 3.7d — `sitemap.ts` + `robots.ts`

| | |
|---|---|
| **Build** | `src/app/sitemap.ts` — static routes × `en` + `ur`; `src/app/robots.ts` — allow `/`, disallow `/studio` + `/api`; `Sitemap:` line uses `NEXT_PUBLIC_SITE_URL` |
| **Verify** | Dev: `/sitemap.xml` and `/robots.txt` load; sitemap includes `/en/contact` and `/ur/contact` |
| **Do not** | Index `/studio` or API routes |

##### 3.7e — JSON-LD structured data

| | |
|---|---|
| **Build** | `src/lib/seo/json-ld.ts` + `JsonLd` component; `Person` + `WebSite` on home/about; `BreadcrumbList` on inner pages *(optional if tight on time)* |
| **Verify** | Google Rich Results Test on `/en` — `Person` valid, no errors |
| **Do not** | Fake `aggregateRating` or review schema |

##### 3.7f — Search Console prep

| | |
|---|---|
| **Build** | Document GSC steps in README; after 3.10 deploy, son submits sitemap |
| **Verify** | GSC property added; sitemap status “Success” within 48h of launch |
| **Do not** | Block Phase 3 exit on GSC indexing — submit only, indexing takes days |

**Phase 3.7 exit:** All static pages have locale-correct metadata, hreflang, OG previews, sitemap, robots, and core JSON-LD. Q&A detail metadata added in **Phase 4.3**.

#### 3.8 — Analytics

| | |
|---|---|
| **Build** | `@vercel/analytics` + `@vercel/speed-insights` in root layout |
| **Verify** | Deploy preview → Vercel dashboard receives vitals |
| **Do not** | Google Analytics unless requested |

#### 3.9 — Contact form (Resend)

| | |
|---|---|
| **Build** | `POST /api/contact` → Resend email to `siteSettings.email`; wire form + toasts |
| **Verify** | Submit test inquiry → email received; validation errors show in Urdu+EN |
| **Do not** | Store PII in Sanity for contact form (email only) |

#### 3.10 — Deploy to Vercel

| | |
|---|---|
| **Build** | Connect repo; env vars set; Sanity CORS for production domain |
| **Verify** | Preview URL loads `/en` and `/ur`; Studio works on production |
| **Do not** | Point DNS until father review (3.11) |

#### 3.11 — Domain (§7)

| | |
|---|---|
| **Build** | `drmianakram.pk` → Vercel; optional `.com` 301 redirect |
| **Verify** | HTTPS works; both locales work on production domain |
| **Do not** | Change primary from `.pk` without explicit decision |

**Phase 3 exit:** Site on Vercel (+ domain if ready). Father completes guided tour on production Studio. Contact form sends email. **SEO foundation live** (§5.6 / 3.7). **Soft launch** — Q&A page may still be empty until Phase 4.

### Phase 4 — Q&A & public launch (§5.4)

**Goal:** Public FAQ + ask flow live. **Public launch** with father walkthrough — Phase 3 may already be on production without Q&A.

#### 4.1 — `faqEntry` schema

| | |
|---|---|
| **Build** | All fields per §5.4; status enum `pending` · `published` · `private` only; Studio views: Inbox (`pending`), Published FAQ |
| **Verify** | Create manual published entry → visible in Published list; no `answered` status in schema |
| **Do not** | `aiReady` workflow until Phase 5 |

#### 4.2 — Q&A page

| | |
|---|---|
| **Build** | Accordion list; topic filter chips; only `status: published`; `FAQPage` JSON-LD listing all visible entries |
| **Verify** | Pending/private entries never appear on public page; Rich Results Test on `/en/questions` shows `FAQPage` |
| **Do not** | AI search or chat |

#### 4.3 — Individual Q&A routes + SEO

| | |
|---|---|
| **Build** | `/questions/[slug]` with `generateStaticParams` or ISR; `generateMetadata` from `questionEn`/`questionUr` + answer excerpt; `og:type: article`; `QAPage` JSON-LD; add published slugs to `sitemap.ts` (both locales) |
| **Verify** | Shared WhatsApp link shows Urdu question title on `/ur/questions/...`; Rich Results Test validates `QAPage`; private/pending slugs return 404 |
| **Do not** | Index private slugs; omit hreflang on detail pages |

#### 4.4 — Ask question form

| | |
|---|---|
| **Build** | Public form → `POST /api/questions` → creates `faqEntry` `status: pending` |
| **Verify** | Submit → doc in Studio Inbox; fields match form |
| **Do not** | Auto-publish |

#### 4.5 — Email on new question

| | |
|---|---|
| **Build** | Resend notification to father on ask submit |
| **Verify** | Test question → email with question text + Studio link |
| **Do not** | CC son unless requested |

#### 4.6 — Homepage FAQ teaser

| | |
|---|---|
| **Build** | 2–3 `featured: true` published entries on home |
| **Verify** | Toggle featured → appears/disappears on home |
| **Do not** | Show pending questions |

#### 4.7 — Launch checklist with father

| | |
|---|---|
| **Build** | Walkthrough: Site Settings, add 1 book, 1 honor (enhance), answer 1 test question |
| **Verify** | Father completes tasks using Help only; §12 handover sent; §5.6 SEO verification checklist passed (OG preview, sitemap, hreflang on home + 1 Q&A) |
| **Do not** | Launch without mobile test on real Android if available |

#### 4.8 — Seed content minimum

| | |
|---|---|
| **Build** | Per §12: 3 honors, 5–10 FAQ, main books, 5–10 recommendations, 1–2 lectures |
| **Verify** | No empty primary nav section on production |
| **Do not** | Block launch on full book catalog — minimum viable content OK |

**Phase 4 exit:** Site live on `drmianakram.pk`. Q&A ask + inbox works.

### Phase 5 — Q&A intelligence (post-launch, §5.4)

> **Start when:** ~20+ published Q&A. **Do not install AI SDK in Phase 1–4.** Triggers and tech choices: **§5.4 AI roadmap**.

#### 5a — Keyword search

| | |
|---|---|
| **Build** | Search input on `/questions`; client or server filter on question+answer text |
| **Verify** | Typing “riba” finds matching published entries; no results message shown |
| **Do not** | Embeddings yet |

#### 5b — Similar questions (pre-submit)

| | |
|---|---|
| **Trigger** | ~30+ published Q&A |
| **Build** | Embeddings sync on publish; `/api/faq/similar`; show matches before ask submit |
| **Verify** | Near-duplicate question shows “already answered” links |
| **Do not** | Block submit — suggest only |

#### 5c — AI draft in Studio

| | |
|---|---|
| **Trigger** | ~50+ Q&A |
| **Build** | `/api/faq/draft`; button in Inbox on pending item; father edits before publish |
| **Verify** | Draft pulls from `aiReady` corpus only; father must click Publish |
| **Do not** | Auto-publish AI text |

#### 5d — Public RAG assistant

| | |
|---|---|
| **Trigger** | ~50+ Q&A + father opt-in |
| **Build** | Lazy-loaded chat widget; `/api/faq/ask`; cites sources; WhatsApp fallback |
| **Verify** | Off-topic question → refuses + contact CTA; answer shows source Q&A titles |
| **Do not** | Load chat widget on mobile critical path |

**Phase 5 exit:** Each sub-phase independently verifiable; skip 5d if father declines.

### Phase 6 — Content Studio (private, post-launch, §5.5)

> **Separate from public site.** Email to father only until 6c. Architecture and rules: **§5.5**.

#### 6a — Schemas + template email

| | |
|---|---|
| **Build** | `contentBrief`, `knowledgeDocument`; Vercel cron `0 1 * * *` UTC + **Monday guard** in handler (`Asia/Karachi`); template brief (no AI) |
| **Verify** | On a Monday deploy test: handler runs → 2 `contentBrief` docs → email to `siteSettings.email` only; on Tue–Sun cron no-ops |
| **Do not** | CC son; public routes for briefs |

#### 6b — AI scripts

| | |
|---|---|
| **Build** | `/api/content-studio/generate`; topic #2 from news + expertise topic; verify-yourself footer |
| **Verify** | Email contains research + full script UR+EN; disclaimer present |
| **Do not** | Present AI text as authoritative without disclaimer |

#### 6c — WhatsApp ping

| | |
|---|---|
| **Build** | WhatsApp Business API → father’s `siteSettings.whatsapp` only |
| **Verify** | Monday: email + short WhatsApp template |
| **Do not** | Send scripts in WhatsApp (email only for full script) |

#### 6d — Full RAG corpus

| | |
|---|---|
| **Build** | Index books, `knowledgeDocument`, published FAQ; `sourcesUsed` on brief |
| **Verify** | Brief lists which sources were retrieved |
| **Do not** | Index private FAQ |

#### 6e — Feedback loop (optional)

| | |
|---|---|
| **Build** | Father pastes final script in Studio → stored for future tone |
| **Verify** | Later briefs reference improved style |
| **Do not** | Require son review |

**Phase 6 exit:** Father receives Monday email without developer involvement.

### Anti-hallucination checklist (every session)

Before coding, confirm:

- [ ] Which **phase and task ID** you are on (e.g. `2a.3`)
- [ ] **Files that should exist** from prior tasks (grep, don’t assume)
- [ ] **Schema field names** match **§5** tables exactly (`fieldEn` / `fieldUr` — use `localized()` helper)
- [ ] **`faqEntry.status`** is only `pending` · `published` · `private`
- [ ] **Display field** is always `portrait` / `cover` / `logo` / `image` on frontend — never `raw*`
- [ ] **`prefers-reduced-motion`:** Lenis + heavy Framer disabled when user prefers reduced motion
- [ ] **SEO (§5.6):** `NEXT_PUBLIC_SITE_URL` set; `generateMetadata` per page; hreflang on both locales; no hardcoded preview domain
- [ ] **Verify step** from current task completed before next task

### Build order summary

```
Phase 0   → Repo boots
Phase 1   → EN/UR shell, static pages, mobile bar
Phase 1c  → Techwind personal home redesign (animated landing)
Phase 1b  → Sanity siteSettings on site (+ wire into 1c hero)
Phase 2   → All schemas + pages (plain image upload)
Phase 2.0 → aboutPage bio + career timeline in CMS
Phase 2a  → Honor enhancer (Vercel Hobby–safe)
Phase 2b  → Portrait enhancer
Phase 2c  → Cover enhancer
Phase 2d  → Logo enhancer
Phase 3   → Help, tour, SEO (§5.6: metadata, hreflang, sitemap, JSON-LD), Resend, Vercel, domain (+ Techwind contact/blog patterns)
Phase 4   → Q&A + public launch
Phase 5   → AI (when corpus large enough)
Phase 6   → Weekly briefs (private)
```

### Task log (fill in during build)

| Task ID | Date | Verified by | Notes |
|---------|------|-------------|-------|
| 0.1 | 8 Jun 2026 | build + dev | Next.js 15.5.19, App Router, TS, Tailwind, ESLint, `src/`, `@/*`. Scaffolded via temp dir (`plan.md` blocked direct `create-next-app .`) |
| 0.2 | 8 Jun 2026 | build | `src/components/`, `src/lib/`, `messages/` + `[locale]/layout.tsx` passthrough |
| 0.3 | 8 Jun 2026 | grep + file check | `.env.example` with commented keys; `.gitignore` has `.env*` + `!.env.example`. Sanity project `5ce34emc` created (Phase 1b) |
| 0.4 | 8 Jun 2026 | manual | `README.md` (dev commands + link to plan). Git commit skipped — developer commits when ready |
| 1.1 | 8 Jun 2026 | build | next-intl, typography, shadcn deps, lucide, sonner, vaul, sharp |
| 1.2 | 8 Jun 2026 | build | shadcn v4 init + button, card, input, label, textarea, select, tabs, accordion, dialog, sheet |
| 1.3 | 8 Jun 2026 | build | `src/lib/fonts.ts` — Inter + Noto Nastaliq Urdu (400) |
| 1.4 | 8 Jun 2026 | dev | middleware, i18n routing, `messages/en.json` + `ur.json`, `/` → `/en` |
| 1.5 | 8 Jun 2026 | dev | RTL `dir` on `/ur`, `LanguageToggle` in header |
| 1.6 | 8 Jun 2026 | visual | Design tokens green/gold/off-white, typography plugin, `.tap-target` |
| 1.7 | 8 Jun 2026 | dev | Header, Footer, MobileBottomBar, ContactDrawer (vaul) |
| 1.8 | 8 Jun 2026 | build | Home hero, services cards, roles strip |
| 1.9 | 8 Jun 2026 | build | About prose bio + static timeline |
| 1.10 | 8 Jun 2026 | dev | Contact form UI + sonner toast; no Resend API |
| 1.11 | 8 Jun 2026 | dev | Empty-state shells: books, lectures, honors, services, afkar, questions |
| 1.12 | 8 Jun 2026 | build | Phase 1 shipped without motion libs (~115 kB shared); **policy updated same day** — full animations OK on all devices (§5.1) |
| 1.P0 | 8 Jun 2026 | plan | **Design policy:** remove old-phone performance gating; Techwind `index-personal.html` as home layout ref; motion on all viewports |
| 1c.1 | 8 Jun 2026 | build | framer-motion, lenis, auto-animate, react-scroll-parallax, embla-carousel-react |
| 1c.2 | 8 Jun 2026 | build | `home.*`, `credentials.*`, extended `timeline.*` in EN+UR; `src/lib/home-data.ts` |
| 1c.3 | 8 Jun 2026 | build | `FadeIn`, `LenisProvider`, `SectionHeading`, `WaveDivider`, `.home-section` utilities |
| 1c.4–1c.10 | 8 Jun 2026 | build | `HomeHero` … `HomeContactCta` — 8 sections composed in `HomeMotionShell` |
| 1c.11 | 8 Jun 2026 | build | `page.tsx` thin composer; home-only Lenis + ParallaxProvider |
| 1c.12 | 8 Jun 2026 | build | `tagline?`, `portraitSrc?` props on hero/credentials |
| 1c.13 | 8 Jun 2026 | build | `/en` + `/ur` home; 22 static pages; no freelancer copy |
| 1.P1 | 8 Jun 2026 | visual | Fix: hamburger visible on desktop — wrap `Sheet` in `div.md:hidden` |
| 1.P2 | 8 Jun 2026 | visual | Fix: mobile sheet title/close spacing; language toggle in `SheetFooter` |
| 1.P3 | 8 Jun 2026 | visual | Fix: Urdu name clipping — remove `line-clamp` on Nastaliq; `line-height: 1.8` |
| 1b.1 | 8 Jun 2026 | dev | `next-sanity@9`, Studio `/studio`, `sanity.config.ts`, dynamic `NextStudio` |
| 1b.2 | 8 Jun 2026 | studio | `siteSettings` singleton schema (tagline, contact, portrait) |
| 1b.3 | 8 Jun 2026 | build | `src/lib/sanity/*`, `localized()`, contact page + bottom bar wired |
| 1b.P1 | 8 Jun 2026 | fix | Root layout `<html>`/`<body>`; `LocaleHtmlAttributes` for locale `lang`/`dir` |
| 1b.P2 | 8 Jun 2026 | build | `next build` without Turbopack (Sanity Studio bundle) |
| 1b.P3 | 8 Jun 2026 | manual | Sanity API → CORS: `http://localhost:3000` + allow credentials |
| 2.0 | | | |

*Copy a row per completed task. If Verify failed, note fix before marking done.*

---

## 10. Remaining Questions (minor — can decide during build)

1. **Phone & WhatsApp numbers** — send when ready
2. **Email** — personal or dedicated (e.g. `contact@drmianakram.pk` or `@drmianakram.com`)?
3. **Afkar-e-Muallim** — host PDFs on site, or link to Tanzeem website?
4. **Book purchases** — link to Daraz/publishers, or display info only?
5. **Register `.com` too?** — if `drmianakram.com` is free (~$12/yr), redirect to `.pk` (§7)
6. **Timeline** — any event or deadline we should target?
7. **AI assistant (Phase 5d)** — enable public RAG chat when ready, or FAQ-only forever?
8. **Articles / blog** — defer unless father requests post-launch *(out of v1 — §5)*

---

## 11. Next Step

**Phases 1, 1c, 1b complete.** Begin **§9 Phase 2.0** — `aboutPage` singleton + wire About page to CMS.

**Sanity (father / developer):**
1. **API → CORS origins:** add `http://localhost:3000` (allow credentials). Add production URL before deploy.
2. **Studio** → [http://localhost:3000/studio](http://localhost:3000/studio) → **Site Settings** → fill tagline, phone, WhatsApp, email, portrait → **Publish**.

**Env** (`.env.local`): `NEXT_PUBLIC_SANITY_PROJECT_ID=5ce34emc`, `NEXT_PUBLIC_SANITY_DATASET=production`.

Run locally: `pnpm dev` → `/en`, `/ur`, or `/studio`. Production build: `pnpm build` (webpack).

Books, honors, lectures, and Q&A plug in during **§9 Phase 2**. Contact form email (Resend) is **Phase 3.9**.

---

## 12. Handover Notes for Dad (والد صاحب کے لیے)

> **Purpose:** Simple guide for **Prof. Dr. Akram** — what the website does, how to update it yourself, and when to use which tool. Share this section as a printout or WhatsApp PDF after launch. Technical build details stay in §5–§9 above; **this section is for you.**

### What this website is

Your personal website — in **Urdu and English** — where people can:

- Learn about you and your career  
- See your **books** and **reading recommendations**  
- Watch **lectures** (YouTube)  
- Browse **honors & awards** (shields, trophies, certificates)  
- Read about **Afkar-e-Muallim**  
- Read **published questions & answers** (سوالات و جوابات)  
- **Call, WhatsApp, or send an invitation** (Dars, lecture, Islamic economics advice)  
- **Ask a new question** on the Q&A page *(you answer in admin)*

You update content yourself in **Sanity** (admin panel). No need to call the developer for every new book or photo.

---

### Opening the admin panel

1. Open the **Sanity Studio link** (son will send after launch).  
2. Log in with your email.  
3. **First time:** a short **guided tour** walks you through the screen (~2 minutes).  
4. **Anytime you’re stuck:** tap **? مدد / Help** (top bar) — task list in Urdu + English.  
5. **Restart tour:** Help → **دوبارہ тур / Restart tour**.

**Sidebar (what each section controls):**

| Section | What it updates on the live site |
|---|---|
| **Site Settings** (ترتیبات) | Your photo, phone, WhatsApp, email, tagline, Google/WhatsApp preview text (SEO description) |
| **About Page** (میرے بارے میں) | Biography (Urdu + English) and career timeline |
| **Books → My Books** (میری کتابیں) | Textbooks & works you wrote |
| **Books → Recommended Reading** (مطالعہ کی تجویز) | Books you suggest others read |
| **Honors** (اعزازات) | Shields, trophies, certificates |
| **Lectures** (لیکچرز) | YouTube videos |
| **Afkar Issues** (افکار معلم) | Magazine covers & PDFs/links |
| **Organizations** (ادارے) | AFAQ, Tanzeem, etc. — logos & roles |
| **Q&A → Inbox** (سوالات — Inbox) | Visitor questions waiting for your answer |
| **Q&A → Published** (شائع شدہ) | Live FAQ on website |
| **Content Studio** (مواد سازی) | *Private* — weekly video topics & scripts *(not on public site)* |
| **Help** (مدد) | Instructions — always here |

---

### Golden rule: two ways to upload images

Many uploads offer **two paths**. Pick the right one:

| Situation | What to do | Enhance button? |
|---|---|---|
| **Publisher sent a cover file** (JPEG/PNG) | **Direct upload** — پبلشر کی تصویر | **No** — use as-is |
| **You photographed a book/shield on a table** | **Photo path** → then **تصویر بہتر بنائیں / Enhance** | **Yes** |
| **Professional studio portrait** | **Direct upload** | **No** |
| **Photo at a function — messy background** | **Enhance** (portrait or honor preset) | **Yes** |
| **Official organization logo from their website** | **Direct upload** | **No** |
| **Logo from photo or screenshot** | **Enhance** (logo preset) | **Yes** |

**Never run a perfect publisher cover or official logo through Enhance** — it can make it worse.

---

### Task-by-task guide

#### Update your homepage photo or contact numbers
**Where:** Site Settings (ترتیبات)

- **Photo:** Professional file already good? → direct upload. Event/office photo with clutter? → Enhance → pick portrait style → preview → Save.  
- **Phone / WhatsApp / Email:** Edit → Save. Shows on Contact page and mobile Call/WhatsApp buttons.  
- **SEO description (Urdu + English):** Short summary of who you are — appears when someone shares the website link on WhatsApp or Google. Keep under ~2 lines each language.

#### Update your biography or career timeline
**Where:** About Page (میرے بارے میں)

1. **Biography** — write or edit Urdu + English text (like a short intro for students and visitors).  
2. **Career timeline** — add milestones: year, title (Urdu + English), optional detail. Use **order** to sort oldest → newest.  
3. Save → About page on the website updates within ~1 minute.

#### Add a book you wrote
**Where:** Books → **My Books** (میری کتابیں) → Create

1. Title (Urdu + English)  
2. **Cover:** Publisher file? → **Publisher cover** tab → upload → Save. Only have the physical book? → **Photo of book** → upload → **Enhance cover** → preview → Save.  
3. Description, level (M.A., B.Com., etc.), buy link if any  
4. Turn **Featured** ON to show on homepage  

#### Suggest a book for others to read
**Where:** Books → **Recommended Reading** (مطالعہ کی تجویز) → Create

1. Title + **Author name**  
2. **Topic** (Islamic Economics, Quran, etc.)  
3. **Why I recommend this** (Urdu + English) — *this is the important part; write like you speak to a student*  
4. Cover (same direct vs photo rules as above)  
5. Optional buy link  
6. **Featured** → homepage “Dr. Akram recommends” teaser  

#### Add a shield, trophy, or certificate
**Where:** Honors (اعزازات) → Create

1. Upload phone photo (messy background is OK)  
2. Pick type: Shield · Trophy · Certificate · etc.  
3. Tap **تصویر بہتر بنائیں / Enhance photo** → pick backdrop → **preview** → Save  
4. Fill event name, organization, year  
5. **Featured** → homepage carousel  

#### Add a lecture video
**Where:** Lectures (لیکچرز) → Create

- Paste **YouTube link only** — thumbnail comes automatically.  
- Add title and description. No need to upload video files.

#### Add an Afkar-e-Muallim issue
**Where:** Afkar Issues → Create

- Cover: publisher/issue file → direct; photo of magazine → Enhance  
- Upload PDF **or** paste external link  
- Month / year  

#### Add or update an organization logo
**Where:** Organizations → Create or edit

- **Best:** Download official logo from org website → **direct upload**  
- **If creating your own logo:** see **Logo tools** below → download PNG → upload  
- Photo of letterhead? → **Enhance** (logo preset)  

#### Answer a visitor’s question
**Where:** Q&A → **Inbox** (سوالات — Inbox)

1. Open a **pending** question (email notifies you when new ones arrive)  
2. Write your answer in **Urdu and English**  
3. **Publish** → appears on public Q&A page *(and feeds future AI — §5.4)*  
4. **Private** → if too personal; reply by phone/WhatsApp instead  

You can also add FAQ entries manually: Q&A → Create *(question + answer, no visitor form needed)*.

**Later (son enables):** AI may **suggest a draft answer** from similar past Q&A — you always review before Publish.

#### Weekly video topics & scripts (Content Studio)
**Where:** **Your email** (+ WhatsApp reminder from Phase 6c) every **Monday** — sent **directly to you**, no one else in between.

1. You receive **2 topics** for the week:  
   - one on **Islamic economics or Dars-e-Quran**  
   - one on **current affairs in light of the Quran**  
2. **Email** contains **research** + a **full draft script** — read on phone or print  
3. **You verify yourself** — check ayat, hadith, facts, and whether you agree with the angle. The system does not verify for you.  
4. **Say it in your own words** — the script is a helper, not final word  
5. **Optional:** Copy the script into ChatGPT, Claude, or any AI → add your thoughts → refine  
6. Record video → upload to **YouTube**  
7. **Lectures** in admin → paste YouTube link  

*Skip or change anything you disagree with. You are the authority — no one approves the brief before you see it.*

---

### Photo enhancer — when it helps

The **Enhance** button removes messy backgrounds and places the image on a clean professional backdrop (green/gold, matching the website).

**Good for:** Shields at functions, portraits with clutter, phone photos of books, logos from photos.  
**Not for:** Publisher covers, official logos, already-professional portraits.  
**Always:** Preview before Save. If it looks wrong, skip Enhance or re-upload.  
**First time slow?** Enhancement is free and runs on the server — if it times out, tap **Enhance** again; the second try is usually faster.

**Backdrop choices (honors):** green velvet (shields) · gold (trophies) · cream (certificates)

---

### Creating a logo yourself (optional)

If you need a simple logo (e.g. for Afkar-e-Muallim or a custom mark):

| Tool | Link | Best for | Cost |
|---|---|---|---|
| **Canva** | [canva.com/create/logos](https://www.canva.com/create/logos) | Full control — colors, Urdu text, icons | Free PNG; Pro (~$13/mo) for SVG |
| **Hatchful** | [shopify.com/tools/logo-maker](https://www.shopify.com/tools/logo-maker) | Quick logo in 5 minutes, transparent PNG | **100% free** |
| **Adobe Express** | [adobe.com/express/create/logo](https://www.adobe.com/express/create/logo) | Alternative to Canva | Free PNG |

**Tips for a dignified academic look:**

- Colors: **deep green** + **gold** (same as website)  
- Keep it **simple** — name in Urdu/English often looks better than clip-art icons  
- Avoid flashy startup-style logos  
- For **AFAQ, Tanzeem, Hamdard, Punjab University** — prefer **official logos** from their websites, not a new design  

**Main website logo:** Your name in clean typography (Urdu + English) — handled in the site design; you don’t need to design this in Canva unless you want to.

**After creating/downloading:** Sanity → Organizations (or relevant section) → Logo → upload. Messy background? → **Enhance**.

**Not truly free (preview only — must pay to download):** Looka, Brandmark, LogoAI — skip unless son helps with payment.

---

### What you don’t need to do

- Change website code, colors, or layout  
- Pay for hosting (son sets up Vercel)  
- Understand technical terms (API, CDN, etc.)  
- Upload video files — **YouTube links only**  

If something breaks or you’re unsure → **Help** in admin **or** WhatsApp son (link in Help desk).

---

### Quick reference card *(print or save on phone)*

```
┌─────────────────────────────────────────────────────────┐
│  DR. AKRAM WEBSITE — QUICK GUIDE                        │
├─────────────────────────────────────────────────────────┤
│  Stuck?        →  ? مدد / Help  (top bar)              │
│  Photo messy?  →  تصویر بہتر بنائیں / Enhance           │
│  Publisher file? → Direct upload — NO Enhance           │
│  YouTube lecture? → Paste link only                     │
├─────────────────────────────────────────────────────────┤
│  My photo/phone     → Site Settings                     │
│  My bio / career    → About Page (میرے بارے میں)         │
│  My book            → Books → My Books                  │
│  Book to recommend  → Books → Recommended Reading       │
│  Shield/award       → Honors → Enhance photo              │
│  Lecture            → Lectures → YouTube URL            │
│  Afkar issue        → Afkar Issues                        │
│  Org logo           → Organizations (official logo best)  │
│  Visitor question   → Q&A → Inbox → answer → Publish      │
│  Weekly video script→ Your email (Mon) → you verify → YouTube  │
│  New logo design    → Canva or Hatchful (see §12 above)   │
└─────────────────────────────────────────────────────────┘
```

**Urdu one-liner summary:**  
*“پبلشر کی تیار تصویر براہ راست اپ لوڈ کریں۔ فون کی تصویر ہو تو Enhance دبائیں۔ الجھن ہو تو Help دبائیں۔”*

---

### After launch checklist (for you)

- [ ] Complete first-login tour  
- [ ] Update Site Settings — photo, phone, WhatsApp, email, SEO descriptions (EN + UR)  
- [ ] Update About Page — biography + career timeline  
- [ ] Add at least 3 honors (Enhance photos)  
- [ ] Add 5–10 **seed FAQ** entries (common questions you often get)  
- [ ] Add your main books (My Books)  
- [ ] Add 5–10 reading recommendations with “why I recommend” notes  
- [ ] Add 1–2 lecture YouTube links  
- [ ] Bookmark Sanity link on phone home screen  

*Son handles: domain, SSL, first deploy, and any errors you can’t fix via Help.*
