create table if not exists public.notably_review_comments (
  id text primary key,
  page text not null default 'home',
  path text not null,
  review_id text not null,
  selector text not null,
  text_quote text,
  author_name text,
  comment text not null,
  status text not null default 'open' check (status in ('open', 'resolved')),
  viewport jsonb,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

alter table public.notably_review_comments enable row level security;

drop policy if exists "allow anonymous notably review select"
  on public.notably_review_comments;

create policy "allow anonymous notably review select"
  on public.notably_review_comments
  for select
  to anon
  using (true);

drop policy if exists "allow anonymous notably review insert"
  on public.notably_review_comments;

create policy "allow anonymous notably review insert"
  on public.notably_review_comments
  for insert
  to anon
  with check (status = 'open' and resolved_at is null);

drop policy if exists "allow anonymous notably review status updates"
  on public.notably_review_comments;

create policy "allow anonymous notably review status updates"
  on public.notably_review_comments
  for update
  to anon
  using (true)
  with check (status in ('open', 'resolved'));
