# MiddleGround — Build for Cursor (MVP Pack)

A production-ready starter to implement the **human-centered work alignment dashboard**. Includes Builder’s Toolkit (principles + choices) and a Cursor-friendly Build Pack with file structure, code scaffolds, and agents.

---

## 0) Quickstart (tl;dr)

```bash
# 1) Create app
pnpm create next-app@latest tablature --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --use-pnpm
cd tablature

# 2) Install deps
pnpm add zustand framer-motion jotai class-variance-authority clsx tailwind-merge zod date-fns

# (Optional UI kit)
pnpm add @radix-ui/react-dialog @radix-ui/react-scroll-area @radix-ui/react-popover

# 3) Dev
pnpm dev
```

> You can paste the files below directly into Cursor. Where a file already exists (e.g., `tailwind.config.ts`, `globals.css`, `layout.tsx`), **replace** with these versions.

---

### 0b) Run This Now — Cursor Checklist (with DB + Slack)

**Goal:** Stand up the MVP locally *today*, with a Neon Postgres via Prisma and a Slack friction logger (mock adapter now, real-ready later).

#### ⏱️ Step 1 — Pull the Starter

1. Create the Next.js app (above) **or** open your existing repo.
2. Copy the **pages/components** from this canvas into `src/` matching the tree.
3. Replace configs where specified.

#### 🗂️ Step 2 — Install extra deps (DB + Auth-ready)

```bash
pnpm add prisma @prisma/client
pnpm dlx prisma init --datasource-provider postgresql
```

This creates `prisma/schema.prisma` and `.env`.

#### 🗄️ Step 3 — Create a Neon database

1. Go to neon.tech → New Project → Postgres 16.
2. Copy the connection string and put into `.env.local`:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
NEXT_PUBLIC_APP_NAME=Tablature
SLACK_BOT_TOKEN=mock
SLACK_SIGNING_SECRET=mock
```

#### 🧬 Step 4 — Paste Prisma schema

Create/replace `prisma/schema.prisma` with:

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }

model User {
  id       String  @id @default(cuid())
  name     String
  role     Role
  teamId   String?
  reflections Reflection[]
  frictions   Friction[]
}

enum Role { worker manager }

enum Mood { low neutral high }

enum FrictionTag { meetings unclear context tools fatigue }

model Reflection {
  id      String @id @default(cuid())
  userId  String
  date    DateTime @default(now())
  mood    Mood
  note    String?
  user    User   @relation(fields: [userId], references: [id])
}

model Friction {
  id      String @id @default(cuid())
  userId  String
  date    DateTime @default(now())
  tag     FrictionTag
  user    User   @relation(fields: [userId], references: [id])
}

model Experiment {
  id        String   @id @default(cuid())
  title     String
  status    ExperimentStatus @default(proposed)
  start     DateTime?
  end       DateTime?
  rationale String?
  outcome   String?
}

enum ExperimentStatus { proposed running done }

model OverrideLog {
  id        String   @id @default(cuid())
  managerId String
  reason    String
  date      DateTime @default(now())
}
```

Then generate + migrate:

```bash
pnpm dlx prisma generate
pnpm dlx prisma migrate dev --name init
```

#### 🧠 Step 5 — Wire Prisma in API routes

Create `src/lib/db.ts`:

```ts
import { PrismaClient } from '@prisma/client'
export const prisma = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') (globalThis as any).prisma = prisma
```

Update API routes to use Prisma (minimal examples):

`src/app/api/reflections/route.ts`

```ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(){
  const rows = await prisma.reflection.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(rows)
}
export async function POST(req:Request){
  const body = await req.json()
  const row = await prisma.reflection.create({ data: { userId: body.userId, mood: body.mood, note: body.note } })
  return NextResponse.json(row)
}
```

`src/app/api/frictions/route.ts`

```ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export async function GET(){
  const rows = await prisma.friction.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(rows)
}
export async function POST(req:Request){
  const body = await req.json()
  const row = await prisma.friction.create({ data: { userId: body.userId, tag: body.tag } })
  return NextResponse.json(row)
}
```

`src/app/api/experiments/route.ts`

```ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export async function GET(){
  return NextResponse.json(await prisma.experiment.findMany())
}
export async function POST(req:Request){
  const body = await req.json()
  const row = await prisma.experiment.create({ data: { title: body.title, rationale: body.rationale } })
  return NextResponse.json(row)
}
```

#### 🧵 Step 6 — Seed a demo user (for local testing)

Create `scripts/seed.ts`:

```ts
import { prisma } from '../src/lib/db'
async function main(){
  const u = await prisma.user.upsert({
    where: { id: 'demo-worker' },
    update: {},
    create: { id: 'demo-worker', name: 'Demo Worker', role: 'worker' }
  })
  console.log('Seeded', u)
}
main().then(()=>process.exit(0))
```

Run: `ts-node scripts/seed.ts` (or add a small API seed route if you prefer).

#### 💬 Step 7 — Slack friction logger (mock now, real-ready)

**A) Create adapter:** `src/lib/slack.ts`

```ts
export type SlackClient = { postMessage:(channel:string,text:string)=>Promise<void> }

export function getSlack(): SlackClient {
  const token = process.env.SLACK_BOT_TOKEN
  if (!token || token==='mock') {
    return { postMessage: async (_c,_t)=>{ console.log('[SLACK:mock]', _t) } }
  }
  return {
    async postMessage(channel, text){
      await fetch('https://slack.com/api/chat.postMessage',{
        method:'POST',
        headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
        body: JSON.stringify({ channel, text })
      })
    }
  }
}
```

**B) Add Slack endpoint:** `src/app/api/slack/friction/route.ts`

```ts
import { NextResponse } from 'next/server'
import { getSlack } from '@/lib/slack'

export async function POST(req:Request){
  const { userId, tag } = await req.json()
  const text = `:guitar: Friction logged by ${userId}: *${tag}*`
  await getSlack().postMessage(process.env.SLACK_CHANNEL_ID || 'general', text)
  return NextResponse.json({ ok:true })
}
```

**C) Hook UI button:** in `My Flow Map` page, replace `onSubmit` for frictions with:

```ts
onSubmit={async (t)=>{
  await fetch('/api/frictions',{ method:'POST', body: JSON.stringify({ userId:'demo-worker', tag:t }), headers:{ 'Content-Type':'application/json' } })
  await fetch('/api/slack/friction',{ method:'POST', body: JSON.stringify({ userId:'demo-worker', tag:t }), headers:{ 'Content-Type':'application/json' } })
}}
```

**D) When ready for real Slack:**

- Create a Slack app → Bot Token Scopes: `chat:write`.
- Install to workspace → set `SLACK_BOT_TOKEN`, optional `SLACK_CHANNEL_ID`.
- (Optional) Slash command `/friction` → point to an API route that records + posts.

#### ▶️ Step 8 — Run it

```bash
pnpm dev
# Open http://localhost:3000 → navigate to Worker / Manager screens
```

#### 🚀 Step 9 — Deploy

- **Railway or Vercel/Netlify** work; for Postgres use **Neon**. Set the same env vars.
- Run `prisma migrate deploy` on first boot.

---

## 1) Builder’s Toolkit (Stage 1 of 2)

### Product Principles

- **Human-first**: Optimize *conditions*, not people. No surveillance.
- **Accessory**: Integrate with Slack/Jira later; MVP runs standalone with mock data.
- **Radical ease**: One-tap logs, low-friction reflections, soft language.
- **Shared middle**: Explicit space where *intent* (manager) meets *method* (worker).
- **Privacy by default**: Worker controls data visibility; manager sees aggregates.

### MVP Scope

- Screens: **My Flow Map**, **Team Pulse**, **Alignment Canvas**, **Culture Moments**, **Settings & Privacy**
- Local mock API for demo; types + store ready for DB later (Postgres/Neon recommended).

### Tech Choices

- **Next.js App Router (TS)** + **Tailwind** + **Framer Motion**
- **Zustand** for app state; **Zod** for schema validation
- **Jotai** for per-component ephemeral atoms (emoji/micro states)
- **Radix** primitives (Dialog/Popover) — optional but used below for good DX

### Data Model (evolvable)

```ts
// lib/types.ts
export type Role = 'worker' | 'manager';

export interface User {
  id: string;
  name: string;
  role: Role;
  teamId?: string;
}

export interface Reflection {
  id: string;
  userId: string;
  date: string; // ISO
  mood: 'low' | 'neutral' | 'high';
  note?: string;
}

export interface FrictionTag =
  | 'meetings' | 'unclear' | 'context' | 'tools' | 'fatigue';

export interface Friction {
  id: string;
  userId: string;
  date: string;
  tag: FrictionTag;
}

export interface FlowPoint { t: number; intensity: number; }

export interface Experiment {
  id: string;
  title: string; // e.g., "No-Meeting Mornings"
  status: 'proposed' | 'running' | 'done';
  start?: string; end?: string;
  rationale?: string; outcome?: string;
}

export interface OverrideLog {
  id: string;
  managerId: string;
  reason: string;
  date: string;
}
```

### Privacy Model

- Reflections stored private-by-default.
- Team Pulse uses **only anonymized aggregates** (counts, averages, trends).
- Alignment Canvas logs consensus + rationale transparently (no personal diaries).

---

## 2) Build Pack (Stage 2 of 2)

### File Tree

```
middleground/
  .cursorrules
  AGENTS.md
  .env.example
  next.config.mjs
  postcss.config.mjs
  tailwind.config.ts
  tsconfig.json
  src/
    app/
      layout.tsx
      page.tsx
      (dashboard)/
        layout.tsx
        my-flow/page.tsx
        team-pulse/page.tsx
        alignment/page.tsx
        culture/page.tsx
        settings/page.tsx
      api/
        reflections/route.ts
        frictions/route.ts
        experiments/route.ts
        insights/route.ts
    components/
      nav/Sidebar.tsx
      nav/Topbar.tsx
      charts/FlowGraph.tsx
      cards/ReflectionCard.tsx
      modals/FrictionLogModal.tsx
      pulse/TeamHeatField.tsx
      canvas/AlignmentCanvas.tsx
      culture/CultureReel.tsx
    lib/
      types.ts
      store.ts
      mock.ts
      anonymize.ts
    styles/
      globals.css
```

---

### Project Configs

#### `.env.example`

```
NEXT_PUBLIC_APP_NAME=MiddleGround
# Integrations later
SLACK_BOT_TOKEN=
JIRA_TOKEN=
```

#### `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: {
```
