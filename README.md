# Architecture Summary

This project is a Next.js (App Router) dashboard that favors server-side data fetching for reliability and client components for interactivity and animation.

**Architectural choices:**
- Use server components for data fetching and composition to keep initial HTML fast and SEO-friendly.
- Keep Supabase access on the server (server-only env vars) and expose only minimal data to the client.
- Use client components selectively for UI that needs state, effects, or animations (Framer Motion).

**Server / Client split:**
- Server components: pages and route-level data loaders (fetching courses, user activity). They render the initial UI and handle Supabase queries via `lib/supabase.ts` and `lib/data.ts`.
- Client components: interactive tiles, grids, and animation wrappers (e.g., `BentoGrid`, card hover effects). These are small, focused, and receive serialized props from the server.

**Challenges faced:**
- Balancing animation-driven UX with zero layout-shift: animations use `transform`/`opacity` only and run in client components to avoid reflow.
- Minimizing client bundle size by keeping data access and heavy logic on the server and only hydrating the minimal interactive bits.
- Reliable dev experience when Supabase isn’t available: implemented mock fallbacks and skeleton loaders for graceful degradation.

If you want this merged into the main `README.md` instead of a separate `readme.md`, tell me and I’ll update it in place.
# LearnForge – Student Dashboard

A **production-grade Next.js 14** learning dashboard built for the Frontend Intern Challenge. Features real Supabase data fetching, Framer Motion spring animations, and a fully responsive Bento Grid layout.

---

## ✦ Tech Stack

| Tool | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework, RSC data fetching |
| **Supabase** | PostgreSQL database + BaaS |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Spring physics animations |
| **Lucide React** | Icon system |
| **TypeScript** | Type safety throughout |

---

## ✦ Quick Start

### 1 · Clone & install

```bash
git clone <your-repo>
cd learning-dashboard
npm install
```

### 2 · Set up Supabase

1. Create a **free project** at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → New query
3. Paste and run the contents of `supabase_schema.sql`
4. Go to **Project Settings → API** and copy your URL + anon key

### 3 · Configure environment

```bash
cp .env.example .env
# Now edit .env and fill in your Supabase values
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

> **Note:** Without these values the app still runs using built-in mock data.

### 4 · Run

```bash
npm run dev
# Open http://localhost:3000
```

---

## ✦ Architecture

```
app/
  layout.tsx              ← Root layout (fonts, globals)
  dashboard/
    layout.tsx            ← Sidebar + MobileNav wrapper
    page.tsx              ← RSC – fetches Supabase data, wraps in <Suspense>

components/
  layout/
    Sidebar.tsx           ← Collapsible sidebar with layoutId highlight
    MobileNav.tsx         ← Bottom nav for mobile
  dashboard/
    BentoGrid.tsx         ← Client component – staggered entrance animations
    HeroTile.tsx          ← Welcome card + streak badge
    CourseCard.tsx        ← Dynamic icon, animated progress bar
    ActivityTile.tsx      ← 120-day contribution heatmap
    BentoSkeleton.tsx     ← Shimmer skeleton (Suspense fallback)
  ui/
    BentoCard.tsx         ← Base tile: grain texture + spring hover
    ErrorBanner.tsx       ← Graceful Supabase error display

lib/
  supabase.ts             ← Server-side Supabase client factory
  data.ts                 ← getCourses() + mock fallback
  utils.ts                ← cn() helper

types/
  index.ts                ← CourseRow, NavItem, ActivityPoint interfaces
```

---

## ✦ Animation Details

| Interaction | Technique |
|---|---|
| Page entrance | `motion.div` stagger container + `y: 24 → 0` + `opacity` |
| Card hover | `whileHover: scale(1.015)` with `spring(300, 20)` – transform only, no layout shift |
| Sidebar nav highlight | `layoutId="nav-highlight"` shared layout animation |
| Progress bar fill | `0% → n%` width with cubic-ease delay |
| Heatmap cells | Staggered scale + opacity entrance |
| Streak badge | Delayed spring scale-in |

---

## ✦ Responsive Breakpoints

| Viewport | Sidebar | Grid |
|---|---|---|
| `< 768px` | Hidden (bottom nav shown) | 1 column |
| `768–1024px` | Icon-only (collapsed) | 2 columns |
| `> 1024px` | Full labels visible | 3–4 columns |

---

## ✦ Evaluation Checklist

- [x] **RSC data fetching** – `getCourses()` called from a server component inside `<Suspense>`
- [x] **Supabase env vars** – server-only, never in client bundle
- [x] **Skeleton loaders** – shimmer animation while data loads
- [x] **Error handling** – `ErrorBanner` + mock fallback if DB fails
- [x] **Staggered entrance** – `staggerChildren` on BentoGrid container
- [x] **Spring hover physics** – `stiffness: 300, damping: 20` on every card
- [x] **layoutId** – sidebar and mobile nav highlights use shared layout animation
- [x] **Zero layout shifts** – all animations use `transform` / `opacity` only
- [x] **TypeScript interfaces** – `CourseRow`, `NavItem`, `ActivityPoint`
- [x] **Semantic HTML** – `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`
- [x] **Responsive** – 3 breakpoints fully handled
