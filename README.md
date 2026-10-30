<div align="center">

# 🏛️ JH Innovation Connect

**A societal innovation portal for Jharkhand.**

Citizens report local problems. AI helps triage them. Universities build solutions, industry and CSR partners fund and scale them, and government tracks the impact, all on one platform.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Smart India Hackathon](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-orange?style=for-the-badge)
![Team Pegasus](https://img.shields.io/badge/Team-Pegasus-purple?style=for-the-badge)

[Features](#-features) · [Quick start](#-quick-start) · [Architecture](#️-architecture) · [Known limitations](#️-known-limitations) · [Team](#-team-pegasus)

</div>

> Built by **Team Pegasus** for Smart India Hackathon 2026. Some dashboards use sample data for demonstration; see [Known limitations](#️-known-limitations).

---

## 👥 Team Pegasus

| # | Member |
|---|---|
| 1 | Tharun J V |
| 2 | Sarvesh M |
| 3 | Kishore R |
| 4 | Santhosh Balaji N |
| 5 | Udhayakumari |
| 6 | Vishnuvardhan A |

---

## 😖 The problem

Local problems in Jharkhand, such as water shortages, poor sanitation, weak rural healthcare and broken infrastructure, rarely reach the people who can solve them. Citizens have no simple way to report an issue with proof. Universities and industry have the skills and funding but no pipeline connecting them to real community needs. Government has no single view of what is reported, who is working on it, and whether it worked.

## ✨ What it does

JH Innovation Connect turns a citizen complaint into a tracked project:

1. **Report:** a citizen submits a challenge with location, photos, video or voice evidence.
2. **Triage:** an AI assistant helps categorise and prioritise it.
3. **Verify:** government reviews and validates the challenge.
4. **Match:** it is routed to relevant universities, who form multidisciplinary teams and submit proposals.
5. **Fund and build:** industry and CSR partners collaborate, co-fund and co-implement.
6. **Measure:** progress and social impact are tracked publicly through a 14-stage lifecycle.

---

## 🎯 Features

### Four role-based portals

| Portal | What users can do |
|---|---|
| **Citizen** | Report problems with GPS location and photo, video or audio evidence; track their challenges; endorse others'; get notifications |
| **University** | Browse validated challenges, express interest, build multidisciplinary teams, write solution proposals, manage projects, apply for funding, message partners |
| **Industry / CSR** | Discover open problem statements, express interest, run collaboration workspaces, manage CSR funding, follow project progress, view reports |
| **Government** | Verify and moderate challenges, assign them to institutions, monitor districts, review projects and collaborations, see analytics, impact and reports |

The platform defines 11 user roles (citizen, community organisation, PRI/ULB, government department, university admin, faculty mentor, student, industry/MSME, CSR organisation, research institute and platform admin).

### Highlights

- **Geotagged reporting:** browser GPS with accuracy thresholds, plus reverse geocoding to a readable address through OpenStreetMap Nominatim
- **Multimedia evidence:** camera, microphone and file capture for challenge proof
- **AI assistant ("SolveSphere AI"):** chat widget with voice input, multilingual replies (English, Hindi and others) and navigation commands such as "report a problem" or "track my complaint"
- **Dual-provider AI backend:** Gemini first, with an automatic Groq fallback
- **Email OTP sign-up:** 6-digit codes sent by SMTP, hashed, expiring after 5 minutes, with attempt and rate limits
- **14-stage project lifecycle:** from challenge ingestion to policy feedback loop
- **10 challenge categories:** water, agriculture, healthcare, education, sanitation, energy, environment, tribal handicrafts, urban infrastructure and public services
- **Jharkhand map and impact dashboard:** district-level view of challenges and outcomes
- **PDF problem reports:** downloadable reports generated in the browser
- **Judge demo tour:** a guided walkthrough bar that steps through the full pipeline across roles
- **Multi-user switcher:** sign in as several roles in one browser for demos

---

## 🧰 Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, TanStack Router, Motion |
| 3D / visuals | Three.js with React Three Fiber and Drei, canvas-confetti |
| Backend (API) | Node.js, Express, Nodemailer, express-rate-limit |
| AI server | Python, FastAPI, Google Gemini, Groq |
| Database, auth, storage | Supabase (PostgreSQL, Row Level Security, Storage) |
| Reports | jsPDF |
| Location | Browser Geolocation, OpenStreetMap Nominatim |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────┐
│ React SPA  (src/)                            │
│  4 role portals · AI chat widget · map       │
└───────┬───────────────┬───────────────┬──────┘
        │               │               │
        │ /api/*        │ /chat         │ supabase-js
        ▼               ▼               ▼
┌──────────────┐ ┌────────────────┐ ┌──────────────────────┐
│ Express      │ │ FastAPI        │ │ Supabase             │
│ server.js    │ │ ai-server      │ │ Postgres · Auth ·    │
│ :3001        │ │ :8001          │ │ Storage (RLS)        │
│ OTP + email  │ │ Gemini → Groq  │ └──────────────────────┘
└──────────────┘ └────────────────┘
```

In development, Vite serves the frontend on port **3000** and proxies `/api` to the Express server on port **3001**.

<details>
<summary><b>📁 Project structure</b></summary>

```
SIH2k26/
├── server.js                 # Express: /api/health, /api/send-otp, /api/verify-otp, /api/test-email
├── ai-server/
│   ├── app.py                # FastAPI: /health, /chat, /classify
│   ├── main.py               # Same app, alternate entry point
│   ├── requirements.txt
│   └── start_server.bat      # Windows helper
├── supabase/
│   ├── schema_master.sql     # Tables, RLS, storage buckets
│   ├── pure_supabase_setup.sql
│   ├── migrations/20260908_civic_platform_rls.sql   # Tightened policies
│   └── cleanup_seed_data.sql
├── src/
│   ├── App.tsx · main.tsx
│   ├── router/               # TanStack Router routes and helpers
│   ├── context/              # App, Auth and Toast context
│   ├── services/             # auth, challenge, project, AI, geotag, PDF, communication
│   ├── types/                # Roles, challenges, lifecycle, auth, government, industry
│   ├── mock/                 # Sample data for demos
│   ├── lib/                  # Supabase client, media URL helpers
│   └── components/
│       ├── public/           # Landing, role selection, about, explore, universities, industry
│       ├── auth/             # Login, sign-up, OTP, forgot password, multi-user switcher
│       ├── citizen/  university/  industry/  government/   # Role portals
│       ├── ai/               # Chat widget, voice globe, analysis card
│       ├── map/              # Jharkhand district map
│       ├── project/          # Project workspace
│       ├── impact/           # Public impact dashboard
│       └── common/           # Header, footer, demo tour bar, shared UI
├── cleanup_seed_data.mjs
├── package.json · vite.config.ts · .env.example
```

</details>

---

## 🚀 Quick start

**Prerequisites**

- Node.js 20+
- Python 3.10+ (only for the AI server)
- A [Supabase](https://supabase.com) project
- *(Optional)* Gemini and Groq API keys for AI chat
- *(Optional)* An SMTP account (for example a Gmail app password) for email OTP

### 1. Clone and install

```bash
git clone https://github.com/TharunJV/SIH2k26.git
cd SIH2k26
npm install
```

### 2. Configure the frontend and API server

```bash
cp .env.example .env
```

Fill in your own values (see [Environment variables](#️-environment-variables)).

### 3. Set up the database

In the Supabase **SQL Editor**, run in this order:

1. `supabase/schema_master.sql` (tables, row-level security, storage buckets)
2. `supabase/migrations/20260908_civic_platform_rls.sql` (tighter security policies)

To remove demo records later, use `supabase/cleanup_seed_data.sql`.

### 4. Set up the AI server (optional)

```bash
cd ai-server
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env              # add GEMINI_API_KEY and GROQ_API_KEY
```

### 5. Run

```bash
npm run dev:full      # frontend + Express + AI server
```

or pick what you need:

| Command | Starts |
|---|---|
| `npm run dev` | Vite frontend on http://localhost:3000 |
| `npm run server` | Express API on port 3001 |
| `npm run dev:all` | Frontend and Express together |
| `npm run dev:full` | Frontend, Express and AI server together |

> **macOS / Linux:** the `npm run ai-server` script uses Windows `cmd` syntax. Start the AI server directly instead:
> ```bash
> cd ai-server && uvicorn app:app --host 0.0.0.0 --port 8001 --reload
> ```
> and run `npm run dev:all` for the other two.

Open **http://localhost:3000**.

### Production build

```bash
npm run build         # outputs dist/
npm start             # Express serves dist/ and the API
```

### Other scripts

| Command | Purpose |
|---|---|
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run preview` | Preview the Vite build |
| `npm run clean` | Remove `dist/` |

---

## ⚙️ Environment variables

### Root `.env` (frontend and Express)

| Variable | Used by | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | Browser, Express | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Browser, Express | Supabase anon / publishable key |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser, Express | Alternative name for the same key |
| `VITE_AI_API_URL` | Browser | AI server URL (default `http://127.0.0.1:8001`) |
| `SMTP_HOST` / `SMTP_PORT` | Express | SMTP server (for example `smtp.gmail.com`, `587`) |
| `SMTP_USER` / `SMTP_PASSWORD` | Express | SMTP login (use an app password) |
| `SENDER_EMAIL` / `SENDER_NAME` | Express | "From" address and display name |
| `PORT` | Express | API port (default `3001`) |

### `ai-server/.env`

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Primary AI provider |
| `GROQ_API_KEY` | Fallback AI provider |

> ⚠️ Only the public **anon / publishable** Supabase key belongs in `VITE_` variables, because they are bundled into the browser. Never use a `service_role` key there. `.env` files are git-ignored; keep real keys out of `.env.example`.

---

## 📡 API reference

### Express backend (port 3001)

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Service status, uptime, and whether SMTP and Supabase are configured |
| `GET` | `/api/test-email?email=` | Send a test email to check SMTP |
| `POST` | `/api/send-otp` | Send a 6-digit code to an email (30 requests per minute per client) |
| `POST` | `/api/verify-otp` | Verify the code and create the account (50 requests per 15 minutes) |

OTP codes are stored hashed (SHA-256), expire after 5 minutes, and allow 5 attempts.

### AI server (port 8001)

| Method | Route | Description |
|---|---|---|
| `GET` | `/health` | Whether Gemini and Groq are configured |
| `POST` | `/chat` | `{ "message": "..." }` returns `{ "response", "provider" }`; Gemini first, Groq fallback, `502` if both fail |
| `POST` | `/classify` | Returns a category and priority for a challenge (currently rule-based, see limitations) |

The assistant can return navigation tags such as `[NAVIGATE:submit-challenge]`, which the chat widget uses to open the matching page.

---

## 🗄️ Database

Main tables created by `schema_master.sql`:

`profiles`, `citizen_profiles`, `university_profiles`, `industry_profiles`, `challenges`, `challenge_media`, `challenge_tags`, `challenge_timeline`, `ai_classifications`, `notifications`, `conversations`, `messages`

Storage buckets: `challenge-evidence` and `media` for uploaded proof.

---

## ⚠️ Known limitations

Notes for reviewers and for anyone deploying this:

- **AI triage is partly a placeholder.** The `/classify` endpoint sets priority from the affected-population count with fixed scores; it does not call a model. The conversational assistant (`/chat`) does use Gemini and Groq.
- **Sample data.** Several dashboards, the district map metrics and the demo tour use mock data from `src/mock/`.
- **Permissive database policies in `schema_master.sql`.** Many tables allow public reads, and some allow anyone to insert or update. Run the tightening migration, then review the policies before storing real citizen data.
- **OTP store is in memory.** Pending sign-ups are lost if the Express server restarts, and it cannot run as multiple instances without a shared store.
- **Development leftovers in `server.js`.** It logs generated OTPs to the console, falls back to a default password if none is supplied, and allows CORS from any origin. Remove or restrict these before production.
- **`.env.example` contains what looks like a real Supabase URL and key.** Replace them with placeholders, and rotate the key if the project holds real data.
- **Windows-style `ai-server` script** in `package.json` (see the Quick start note).
- **No automated test suite** yet; use `npm run lint` for type checks.

## 🗺️ Roadmap

- [ ] Replace rule-based `/classify` with a model-backed triage and duplicate detection
- [ ] Tighten row-level security and add role-based access in the database
- [ ] Persist OTPs in Redis or Supabase and add proper CORS
- [ ] Regional language support (Hindi, Santali) across the interface
- [ ] Replace mock dashboards with live Supabase data
- [ ] Add automated tests for services and the OTP flow
- [ ] Cross-platform scripts for starting the AI server

## 🤝 Contributing

Issues and PRs are welcome. Run `npm run lint` before opening a PR.

---

<p align="center">Built by <b>Team Pegasus</b> for <b>Smart India Hackathon 2026</b> · <b>JH Innovation Connect</b>: from local problem to community solution.</p>
