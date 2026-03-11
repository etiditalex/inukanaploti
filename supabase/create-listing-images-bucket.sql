-- Run this entire script in Supabase: SQL Editor → New query → Paste → Run
-- This creates the "listing-images" bucket and policies so admin image uploads work.
-- The app expects the bucket id to be exactly: listing-images

-- 1. Create the bucket (id must be exactly "listing-images")
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do update set
  name = excluded.name,
  public = excluded.public;

-- 2. Policies so authenticated users can upload and everyone can read
drop policy if exists "Allow authenticated upload listing-images" on storage.objects;
create policy "Allow authenticated upload listing-images"
  on storage.objects for insert
  with check (bucket_id = 'listing-images' and auth.role() = 'authenticated');

drop policy if exists "Allow authenticated update listing-images" on storage.objects;
create policy "Allow authenticated update listing-images"
  on storage.objects for update
  using (bucket_id = 'listing-images' and auth.role() = 'authenticated');

drop policy if exists "Allow authenticated delete listing-images" on storage.objects;
create policy "Allow authenticated delete listing-images"
  on storage.objects for delete
  using (bucket_id = 'listing-images' and auth.role() = 'authenticated');

drop policy if exists "Allow public read listing-images" on storage.objects;
create policy "Allow public read listing-images"
  on storage.objects for select
  using (bucket_id = 'listing-images');
