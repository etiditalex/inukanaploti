-- Run this in Supabase SQL Editor (Dashboard → SQL Editor) to create the listings table
-- and allow access with your anon key. Without the policies below, you get 401 "Access to schema is forbidden".

create table if not exists public.listings (
  id text primary key,
  title text not null,
  slug text not null unique,
  price_kes integer not null default 0,
  size_acres text,
  location text,
  coords jsonb default '{"lat": 0, "lng": 0}',
  status text not null default 'available' check (status in ('available', 'sold')),
  images jsonb default '[]',
  payment_plan jsonb default '{"deposit_kes": 0, "months": 12}',
  features jsonb default '[]',
  short_description text,
  long_description text,
  amenities jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Required: allow anon key to read (public site + build) and authenticated users to write (admin).
alter table public.listings enable row level security;

drop policy if exists "Allow public read on listings" on public.listings;
create policy "Allow public read on listings"
  on public.listings for select
  using (true);

drop policy if exists "Allow authenticated write on listings" on public.listings;
create policy "Allow authenticated write on listings"
  on public.listings for all
  using (auth.role() = 'authenticated');
