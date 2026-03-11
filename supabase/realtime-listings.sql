-- Run this in Supabase SQL Editor once so the listings page updates automatically when you add/edit/delete from admin.
-- If you see "already in publication", the table is already enabled — you're done.

alter publication supabase_realtime add table public.listings;
