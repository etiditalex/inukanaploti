-- Run in Supabase SQL Editor if your listings table was created before map_locations existed.
alter table public.listings add column if not exists map_locations jsonb default '[]';
