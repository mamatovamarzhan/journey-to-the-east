# Journey to the East

> A modern editorial travel guide and AI booking concierge for Uzbekistan and the Silk Road.

Plan a trip through Samarkand, Bukhara, Khiva, Tashkent and the Fergana Valley — read the editorial city guides, browse curated itineraries, calculate a realistic budget, and finish the booking with a Gemini-powered AI concierge that emails or Telegrams you the confirmation.

```
                            Journey to the East
                          ──────────────────────
       ╔════════════╗       ╔════════════╗       ╔════════════╗
       ║  Cities    ║       ║   Map      ║       ║   Budget   ║
       ║  Stories   ║  ←→   ║  Leaflet   ║  ←→   ║ calculator ║
       ║ Itineraries║       ║   + OSM    ║       ║ + Recharts ║
       ╚═════╤══════╝       ╚════════════╝       ╚═════╤══════╝
             │                                          │
             └──→  ╔══════════════════════════════╗  ←──┘
                   ║   AI Concierge   (/chat)     ║
                   ║   Gemini 2.5 Flash, streaming║
                   ╚══════════════╤═══════════════╝
                                  ▼
                   ╔══════════════════════════════╗
                   ║       Booking confirmed       ║
                   ║   Email (Resend) + Telegram   ║
                   ╚═══════════════════════════════╝
```

## Tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 16** (App Router) + TypeScript |
| Styling | **Tailwind CSS v4** with custom palette (turquoise / terracotta / ochre / cream) |
| UI primitives | shadcn-style, hand-restyled — built on Radix |
| Fonts | Inter (body), Cormorant Garamond (headings), Caveat (handwriting) — `next/font/google` |
| Animation | framer-motion (used sparingly) |
| Database + Auth | **Supabase** — Postgres + Auth + Storage + RLS |
| Map | **Leaflet** + OpenStreetMap (no API key) with marker clustering |
| AI | **Google Gemini 2.5 Flash** via `@google/generative-ai`, streaming + structured output |
| Email | **Resend** (transactional HTML emails) |
| Notifications | **Telegram Bot API** for booking confirmations |
| Charts | Recharts (cost breakdowns, weather mini-charts) |
| Forms | react-hook-form + zod |
| Toasts | Sonner |
| Hosting | Vercel (web) — no separate backend |

## Project structure

```
journey-to-the-east/
├── app/                              Next.js routes
│   ├── page.tsx                      / homepage
│   ├── cities/                       /cities + /cities/[slug]
│   ├── itineraries/                  /itineraries + /itineraries/[slug]
│   ├── map/                          /map
│   ├── budget/                       /budget
│   ├── chat/                         /chat (AI concierge)
│   ├── stories/                      /stories
│   ├── auth/                         /auth/login, /register, /profile, /callback, /sign-out
│   ├── favorites/                    /favorites (gated)
│   ├── my-bookings/                  /my-bookings (gated)
│   └── api/
│       ├── chat/route.ts             POST /api/chat — streams Gemini reply
│       ├── build-tour/route.ts       POST /api/build-tour — structured Tour JSON
│       ├── bookings/create/route.ts  POST /api/bookings/create
│       └── notify/
│           ├── email/route.ts        Resend HTML email
│           └── telegram/route.ts     Telegram Bot API
├── components/                       UI components by area
│   ├── ui/                           shadcn primitives (Button, Card, Dialog, ...)
│   ├── layout/                       Navbar, Footer, AccountMenu
│   ├── sections/                     Homepage section components
│   ├── cities/                       City listing + detail
│   ├── itineraries/                  Itinerary listing + detail
│   ├── chat/                         ChatUI, TourSummaryCard, BookingDialog
│   ├── map/                          Leaflet map (lazy-loaded)
│   ├── budget/                       BudgetCalculator
│   ├── stories/                      StoryCard
│   ├── favorites/                    FavoriteButton, FavoritesList
│   └── auth/                         AuthShell, LoginForm, RegisterForm, ProfileEditor
├── content/                          Static travel-guide data
│   ├── types.ts                      City, Itinerary, Attraction, ...
│   ├── images.ts                     Centralized image URL registry
│   ├── stories.ts                    Traveler stories
│   ├── countries.ts                  Country registry + lookup helpers
│   └── countries/uzbekistan/         Uzbekistan content (cities, itineraries)
├── lib/
│   ├── supabase/                     Browser / server / service-role clients
│   ├── ai/                           System prompt + tour context for Gemini
│   ├── auth.ts, favorites.ts         Server-side helpers
│   ├── budget.ts                     Budget calculation logic
│   ├── tour-types.ts                 Tour JSON shape
│   └── db-types.ts                   Profile, Booking, ... types
└── supabase/migrations/              SQL — run these in the Supabase dashboard
    ├── 0001_init.sql                 8 tables + RLS policies + triggers
    └── 0002_avatars_bucket.sql       Avatar storage bucket + RLS
```

## Setup (Windows / PowerShell)

### Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | 20+ | `winget install OpenJS.NodeJS.LTS` |
| Git | any | `winget install Git.Git` |
| GitHub CLI | optional | `winget install GitHub.cli` — for `gh repo create` |
| A code editor | VS Code | recommended |

### 1. Clone + install

```powershell
git clone https://github.com/<your-username>/journey-to-the-east.git
cd journey-to-the-east
npm install
```

### 2. Environment variables

Copy the template:

```powershell
Copy-Item .env.example .env.local
```

Edit `.env.local` and fill in the values. See the next section for where to find each key.

### 3. Database

The project relies on Supabase for auth, favorites, saved trips, and bookings.

1. Create a free project at <https://supabase.com>
2. Project settings → API → copy the URL and the **anon** + **service_role** keys into `.env.local`
3. SQL Editor → New query → paste **`supabase/migrations/0001_init.sql`** → Run
4. Repeat with **`supabase/migrations/0002_avatars_bucket.sql`**
5. Authentication → Providers → Email → toggle off "Confirm email" if you want simpler local testing
6. (Optional) Authentication → Providers → Google → enable, paste OAuth credentials. Add `https://<project-ref>.supabase.co/auth/v1/callback` to the Google OAuth client's redirect URLs

### 4. Run the dev server

```powershell
npm run dev
```

Open http://localhost:3000. The site is fully functional even without the AI key — the `/chat` route will surface a clear error until `GEMINI_API_KEY` is set.

## Environment variables

| Variable | Required for | How to get it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | everything | Supabase → Project settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client-side auth + queries | same page |
| `SUPABASE_SERVICE_ROLE_KEY` | `/api/bookings/create` (bypasses RLS) | same page — **keep server-side only** |
| `GEMINI_API_KEY` | `/chat`, `/api/chat`, `/api/build-tour` | <https://aistudio.google.com/apikey> — create key, attach to a project where the Gemini API is enabled |
| `RESEND_API_KEY` | email notifications | <https://resend.com> → API Keys → "Create API Key" |
| `FROM_EMAIL` | email "from" address | `onboarding@resend.dev` works without DNS (sandbox); use your own domain in production |
| `TELEGRAM_BOT_TOKEN` | Telegram notifications | Telegram → DM `@BotFather` → `/newbot` → follow prompts → copy the HTTP API token |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | shows the user which bot to `/start` | the same `@BotFather` flow assigns this; without the `@` |

### How to get a Gemini API key

1. Visit <https://aistudio.google.com/apikey>
2. Click **Create API key**
3. If you don't already have a Google Cloud project, AI Studio offers to create one
4. Confirm the chosen project has the **Generative Language API** enabled (Cloud Console → APIs & Services → Library → "Generative Language" → Enable)
5. Copy the key into `.env.local` as `GEMINI_API_KEY=…`
6. **Restart the dev server** — `process.env.*` is only read at boot

If the key returns `429 Quota exceeded for ... limit: 0`, the underlying Cloud project doesn't have the free tier enabled. Pick a different project or enable billing.

### How to get a Telegram bot

1. Open Telegram, search for **`@BotFather`**, start a conversation
2. Send `/newbot` and follow the prompts (name + username)
3. Copy the HTTP API token into `.env.local` as `TELEGRAM_BOT_TOKEN`
4. Put the bot's username (without `@`) in `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`
5. To receive notifications, users must first send `/start` to your bot in Telegram. The `/api/notify/telegram` route looks them up via `getUpdates` within the last 24 hours.

### How to get a Resend API key

1. Sign up at <https://resend.com>
2. API Keys → **Create API Key** → permission "Sending access"
3. Paste into `.env.local` as `RESEND_API_KEY`
4. The default `FROM_EMAIL=onboarding@resend.dev` is Resend's sandbox sender and works without verifying a domain — fine for local development. For production, add your own domain in Resend's Domains tab.

## Deploying to Vercel

1. Push the repository to GitHub (the next section covers this).
2. Go to <https://vercel.com/new>, import the repo.
3. Framework preset will auto-detect as **Next.js**. Leave the defaults.
4. **Environment variables**: paste every variable from `.env.local` into the Vercel project settings → Environment Variables. Pay attention to the `NEXT_PUBLIC_` prefix — only those variables ship to the browser.
5. Deploy. Vercel builds + deploys; you'll get a `*.vercel.app` URL.
6. Back in Supabase → Authentication → URL Configuration → add your Vercel URL to the allow-list so OAuth + email magic links work.
7. Back in Resend → Domains → add and verify your custom domain if you want a non-sandbox sender.

The project has no separate backend — `/api/*` routes run on Vercel as Node serverless functions. The Gemini, Resend and Telegram calls all happen server-side.

## Extending to more countries

The content layer is set up to drop in additional Central Asian countries without code changes:

1. Create `content/countries/<slug>/cities.ts` and `itineraries.ts` following the same shape as `content/countries/uzbekistan/`
2. Register the new country in `content/countries.ts`
3. The `/cities`, `/itineraries`, and `/map` routes pick it up automatically; the AI's tour context needs a manual update in `lib/ai/tour-context.ts`

## Useful commands

```powershell
# dev
npm run dev                 # start on http://localhost:3000
npm run build               # production build
npm start                   # serve the production build

# database migrations
# (run SQL in supabase/migrations/ via the Supabase SQL Editor)

# git
git status
git log --oneline -n 20
```

## Author

Built by **Marzhan Mamatova** — [nFactorial Incubator, Almaty](https://nfactorial.school).

## License

MIT. Travel safely.
