-- Run in Supabase SQL Editor to create the blogs table and RLS.
-- Enables: public read (frontend), authenticated write (admin).

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  cover_image text,
  author text,
  published boolean not null default true,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.blogs enable row level security;

drop policy if exists "Allow public read on blogs" on public.blogs;
create policy "Allow public read on blogs"
  on public.blogs for select
  using (true);

drop policy if exists "Allow authenticated insert blogs" on public.blogs;
drop policy if exists "Allow authenticated update blogs" on public.blogs;
drop policy if exists "Allow authenticated delete blogs" on public.blogs;

create policy "Allow authenticated insert blogs"
  on public.blogs for insert to authenticated with check (true);

create policy "Allow authenticated update blogs"
  on public.blogs for update to authenticated using (true) with check (true);

create policy "Allow authenticated delete blogs"
  on public.blogs for delete to authenticated using (true);

-- Optional: enable Realtime so admin list can update when new blogs are added.
-- If this line errors (e.g. table already in publication), remove it.
-- alter publication supabase_realtime add table public.blogs;
