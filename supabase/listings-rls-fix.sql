-- Run this in Supabase SQL Editor to fix "new row violates row-level security policy" when adding listings.
-- This replaces the single "write" policy with explicit INSERT, UPDATE, and DELETE policies for authenticated users.

-- Remove the existing write policy (if it exists)
drop policy if exists "Allow authenticated write on listings" on public.listings;

-- Allow authenticated users to INSERT new rows
create policy "Allow authenticated insert listings"
  on public.listings for insert
  to authenticated
  with check (true);

-- Allow authenticated users to UPDATE any row
create policy "Allow authenticated update listings"
  on public.listings for update
  to authenticated
  using (true)
  with check (true);

-- Allow authenticated users to DELETE any row
create policy "Allow authenticated delete listings"
  on public.listings for delete
  to authenticated
  using (true);
