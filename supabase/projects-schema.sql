-- Run this in Supabase SQL Editor to create the projects table for the locations map.
-- Projects can have multiple locations (pins) shown on the map.

create table if not exists public.projects (
  id text primary key,
  name text not null,
  slug text not null unique,
  short_description text default '',
  locations jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.projects enable row level security;

drop policy if exists "Allow public read on projects" on public.projects;
create policy "Allow public read on projects"
  on public.projects for select
  using (true);

drop policy if exists "Allow authenticated write on projects" on public.projects;
create policy "Allow authenticated write on projects"
  on public.projects for all
  using (auth.role() = 'authenticated');

comment on column public.projects.locations is 'Array of { lat, lng, label? } for map pins';
