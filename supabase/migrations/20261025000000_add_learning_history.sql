-- Mentora AI persistence required by lib/actions/companion.actions.ts.
-- Run this migration in the Supabase SQL editor for an existing project.

alter table public.session_history
  add column if not exists user_id text;

create index if not exists session_history_user_id_idx
  on public.session_history (user_id);

create index if not exists session_history_created_at_idx
  on public.session_history (created_at desc);

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  companion_id uuid not null references public.companions(id) on delete cascade,
  user_id text not null,
  created_at timestamptz not null default now(),
  constraint bookmarks_user_companion_unique unique (user_id, companion_id)
);

create index if not exists bookmarks_user_id_idx
  on public.bookmarks (user_id);

create index if not exists bookmarks_companion_id_idx
  on public.bookmarks (companion_id);

-- Ask PostgREST to immediately refresh its table/column cache.
notify pgrst, 'reload schema';
