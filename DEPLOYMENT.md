# Deployment Guide for Inuka na Ploti

## Option 1: GitHub Pages (Current Setup)

### Prerequisites:
1. Repository is public
2. GitHub Pages is enabled in repository settings

### Steps:
1. Go to repository Settings → Pages
2. Source: "GitHub Actions"
3. The workflow will automatically deploy on push to main branch

### Troubleshooting:
- Check Actions tab for error logs
- Ensure repository is public
- Verify GitHub Pages is enabled

## Option 2: Netlify (Recommended Alternative)

### Steps:
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Click "New site from Git"
4. Connect your GitHub repository
5. Build settings:
   - Build command: `npm run build && npm run export`
   - Publish directory: `out`
6. Deploy!

### Benefits:
- Automatic deployments
- Custom domain support
- Better Next.js support
- Free tier available

## Option 3: Vercel (Alternative)

### Steps:
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Import your repository
4. Vercel will auto-detect Next.js and configure
5. Deploy!

## Option 4: Manual Deployment

### Steps:
1. Run locally:
   ```bash
   npm run build
   npm run export
   ```
2. Upload contents of `out` folder to any static hosting service
3. Examples: GitHub Pages, Netlify, Vercel, Firebase Hosting

## Current Status:
- GitHub Actions workflow: ✅ Configured
- Netlify config: ✅ Ready
- Vercel config: ✅ Ready
- Manual deployment: ✅ Available

## Recommended:
**Vercel** (with Supabase) or **Netlify** for Next.js static exports.

---

## Admin dashboard + Supabase + Vercel

### 1. Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run the script in `supabase/listings-schema.sql` to create the `listings` table.
3. In **Authentication → Providers**, enable Email and create an admin user (or use sign-up from `/admin/login`).
4. In **Settings → API**, copy **Project URL** and **anon public** key.

### 2. Environment variables
- **Local:** copy `.env.local.example` to `.env.local` and set:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Vercel:** Project → Settings → Environment Variables → add the same two variables.

### 3. Deploy on Vercel
- Connect the repo; Vercel will use the existing `vercel.json` or auto-detect Next.js.
- With static export (`output: 'export'` in `next.config.js`), each deploy runs the build and fetches listings from Supabase at build time. New or updated listings from the admin appear on the site after the next deploy.

### 4. Admin flow
- **Navbar:** “Admin” link goes to `/admin` (then redirects to login or listings).
- **Login:** `/admin/login` — sign in with the Supabase user you created.
- **Listings:** `/admin/listings` — list, add, edit, delete. Data is stored in Supabase.
- **Frontend:** Home, `/listings`, and `/listings/[slug]` read from Supabase during the build (or fall back to `data/listings.json` if Supabase env is not set).
