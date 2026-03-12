-- Run in Supabase SQL Editor to create the testimonials table and RLS.
-- Public read (frontend), authenticated write (admin).

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_role text,
  display_order integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.testimonials enable row level security;

drop policy if exists "Allow public read on testimonials" on public.testimonials;
create policy "Allow public read on testimonials"
  on public.testimonials for select
  using (true);

drop policy if exists "Allow authenticated insert testimonials" on public.testimonials;
drop policy if exists "Allow authenticated update testimonials" on public.testimonials;
drop policy if exists "Allow authenticated delete testimonials" on public.testimonials;

create policy "Allow authenticated insert testimonials"
  on public.testimonials for insert to authenticated with check (true);

create policy "Allow authenticated update testimonials"
  on public.testimonials for update to authenticated using (true) with check (true);

create policy "Allow authenticated delete testimonials"
  on public.testimonials for delete to authenticated using (true);
