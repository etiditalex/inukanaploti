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
**Netlify** is the most reliable for Next.js static exports.
