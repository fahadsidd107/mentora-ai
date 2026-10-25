# Mentora AI

Mentora AI is a full-stack learning platform that lets users create personalized tutors and hold real-time voice conversations around a chosen subject. I built the application to explore the engineering challenges behind low-latency conversational interfaces, authenticated SaaS workflows, subscription-aware product limits, and a responsive component system.

> **Personalized AI tutors, built around how you learn.**

The project combines a Next.js application layer with Clerk authentication and billing, Supabase persistence, Vapi voice orchestration, and Sentry observability. It is designed as a practical SaaS product rather than a static AI demo: users can discover tutors, create their own companions, bookmark useful ones, complete voice sessions, and review their learning history.

## Product capabilities

- Real-time AI tutoring sessions with speech recognition, synthesized voices, and conversational responses
- Configurable companions with a subject, topic, voice, speaking style, and session duration
- Authentication, user profiles, protected workflows, and subscription plans through Clerk
- Server-side companion discovery with subject filtering, text search, and pagination support
- Persistent bookmarks and session history backed by Supabase
- Plan-aware companion creation limits enforced on the server
- Responsive interfaces built from reusable Tailwind CSS and Radix UI components
- Client, server, and edge-runtime error monitoring through Sentry

## Engineering approach

### Application architecture

The application uses the Next.js App Router and separates server-side data operations from interactive client components. Pages fetch initial data on the server, while focused client components handle browser-only behavior such as filters, bookmarks, microphone state, and live transcripts.

Supabase access is centralized behind a server-side client that forwards the active Clerk session token. Database mutations are implemented as server actions and revalidate affected routes after bookmark changes, keeping authorization and persistence logic outside presentation components.

### Voice orchestration

Each learning companion is translated into a Vapi assistant configuration at session time. The configuration selects the appropriate ElevenLabs voice, Deepgram transcription model, OpenAI conversational model, and a topic-aware system prompt. The prompt constrains the tutor to short, natural spoken responses and encourages progressive explanations with regular comprehension checks.

The session interface tracks connection state, microphone state, live messages, and call lifecycle events. Completed calls are persisted to the user's session history for later review.

### Authentication and subscriptions

Clerk provides authentication, profile management, and pricing UI. Subscription features are checked on the server before a user can create another companion. This keeps product limits enforceable even when requests do not originate from the normal interface.

### Design system

The interface uses Tailwind CSS v4 with shared semantic tokens for colors, borders, surfaces, focus states, and radii. The visual system combines an indigo primary color, navy structural elements, mint accents, and subject-specific pastel cards. Reusable component classes keep navigation, cards, forms, calls to action, and session controls consistent across routes.

## Technology stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS v4, Radix UI, class-variance-authority |
| Authentication and billing | Clerk |
| Database | Supabase/PostgreSQL |
| Voice AI | Vapi, Deepgram, ElevenLabs, OpenAI |
| Validation and forms | Zod, React Hook Form |
| Monitoring | Sentry |
| Animation | Lottie React |

## Project structure

```text
app/                  Routes, layouts, server-rendered pages, and API handlers
components/           Product components and reusable UI primitives
constants/            Subject metadata, voice identifiers, and shared values
lib/actions/          Server actions for companions, bookmarks, and sessions
lib/                  Supabase, Vapi, and general utilities
public/               Icons, illustrations, and static assets
types/                Shared TypeScript declarations
```

## Local development

### Requirements

- Node.js 20 or newer
- npm 10 or newer
- Clerk, Supabase, and Vapi accounts
- A Sentry account only if source-map uploads and monitoring are required

### Installation

```bash
npm install
```

Copy the environment template:

```bash
cp .env.example .env.local
```

Add credentials to `.env.local`:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Optional locally; used for Sentry source-map uploads
SENTRY_AUTH_TOKEN=
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is occupied, use:

```bash
npm run dev -- --port 3001
```

## Database model

The server actions expect the following Supabase tables:

- `companions` stores tutor configuration, ownership, subject, topic, voice, style, and duration.
- `session_history` associates completed companion sessions with Clerk user IDs.
- `bookmarks` associates saved companions with Clerk user IDs. It contains `id` (UUID primary key), `companion_id` (UUID foreign key), `user_id` (Clerk user ID text), and `created_at` (timestamp). A unique constraint on `(user_id, companion_id)` prevents duplicate saves.

Foreign-key relationships should allow Supabase queries to resolve `companions:companion_id (*)` from session-history and bookmark records.

For an existing Supabase project, run
[`supabase/migrations/20261025000000_add_learning_history.sql`](supabase/migrations/20261025000000_add_learning_history.sql)
in the Supabase SQL editor. It adds the Clerk `user_id` field expected by session history, creates the bookmarks table and foreign-key relationship, adds lookup indexes, enables row-level security with per-user read/write/delete policies, and refreshes the PostgREST schema cache.

## Available scripts

```bash
npm run dev      # Start the Turbopack development server
npm run build    # Create a production build
npm run start    # Run the production server
npm run lint     # Run the configured lint command
```

## Implementation notes

- Environment secrets belong in `.env.local`, which is ignored by Git. `.env.example` contains only variable names and safe defaults.
- The public Vapi token is intentionally exposed to the browser; provider-side domain restrictions and usage limits should be configured before deployment.
- Companion limits are checked server-side through Clerk plan and feature entitlements.
- Sentry is configured for browser, Node.js, and edge runtimes. Replace the existing DSN and organization details before deploying under a different Sentry account.
- The included bookmarks migration enables Supabase Row Level Security and scopes private reads and writes to the authenticated Clerk user ID contained in the JWT `sub` claim.

## What this project demonstrates

This project reflects how I approach modern full-stack product development: clear separation between UI and data access, server-enforced authorization, reusable design primitives, defensive validation, third-party service integration, and observability across runtime boundaries. The result is a maintainable foundation that can be extended with richer lesson plans, analytics, additional languages, or organization-level learning workspaces.
