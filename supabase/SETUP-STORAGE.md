# Create the storage bucket for listing images

The app expects a bucket with id **exactly** `listing-images`. If you see "bucket not found", run the script below.

## Fix "bucket not found" – run this script

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. Go to **SQL Editor** → **New query**.
3. Copy the full contents of **`create-listing-images-bucket.sql`** (in this folder) and paste into the editor.
4. Click **Run**.

That creates the `listing-images` bucket and all policies in one go. No need to create the bucket in the Storage UI first.

---

**Script file:** `supabase/create-listing-images-bucket.sql`

- If you already created a bucket with a different name (e.g. "Listing Images"), you can leave it or delete it; this script creates the one the app uses (`listing-images`).
- After running the script, try "Upload from device" again in the admin.
