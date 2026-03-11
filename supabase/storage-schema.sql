-- Run this in Supabase SQL Editor (Dashboard → SQL Editor) to enable image uploads from the admin.
-- Option A: Create the bucket in Dashboard (Storage → New bucket → name: listing-images, Public: yes), then run only the policies below.
-- Option B: Run this entire file to create the bucket and policies.

-- Create public bucket for listing images (skip if you created it in Dashboard)
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;

-- Allow authenticated users to upload and update/delete their uploads
-- Allow public read (bucket is public)
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
