-- Run after blogs-schema.sql if you want the blog list to update in real time when posts are added/updated from admin.
-- If this errors (e.g. "relation already in publication"), you can ignore it.

alter publication supabase_realtime add table public.blogs;
