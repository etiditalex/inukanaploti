# Inuka na Ploti - AI Coding Guidelines

## Project Overview
Real estate website for land investments in Kenya. Hybrid Next.js app with static HTML generation for multi-platform deployment. Focuses on property listings, maps, galleries, and financing options.

## Architecture
- **Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: Tailwind CSS with custom color palette (primary blue #1e3a8a, secondary red #dc2626)
- **Data**: Static JSON (`data/listings.json`) with TypeScript interfaces (`types/listing.ts`)
- **Components**: Reusable UI components in `components/` (e.g., `ListingCard`, `MapComponent`)
- **Export**: Static site generation for GitHub Pages/Netlify/Vercel deployment

## Development Workflow
- **Start**: `npm run dev` (Next.js dev server)
- **Build**: `npm run build` (production build)
- **Export**: `npm run export` (static files to `out/`)
- **Lint**: `npm run lint` (ESLint with Next.js config)
- **Deploy**: Use `deploy.sh` for GitHub Pages or deploy `out/` to Netlify/Vercel

## Code Patterns
- **Components**: Client components (`'use client'`) for interactivity, server components for static content
- **Data Loading**: Import JSON directly (e.g., `import listingsData from '@/data/listings.json'`)
- **Currency**: Format prices in KES using `Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' })`
- **Images**: Cloudinary-hosted, use Next.js `Image` with `unoptimized: true` for static export
- **Icons**: Lucide React icons (e.g., `MapPin`, `Search`)
- **Maps**: Mapbox GL JS via `react-map-gl` for property locations
- **SEO**: Structured data with `ListingJsonLd` component, metadata generation in pages

## Key Files
- `app/listings/page.tsx`: Main listings page with filtering/search
- `app/listings/[slug]/page.tsx`: Dynamic property pages with static generation
- `components/ListingCard.tsx`: Property card component with hover effects
- `generate_property_pages.py`: Python script to generate static HTML pages for GitHub Pages

## Conventions
- **Naming**: Kebab-case for slugs/files (e.g., `diani-galu`), PascalCase for components
- **Responsive**: Mobile-first with breakpoints: mobile <768px, tablet 768-1024px, desktop >1024px
- **Accessibility**: Semantic HTML, alt texts for images, touch-friendly interactions
- **Performance**: Lazy loading images, optimized Cloudinary URLs, minimal JS bundles</content>
<parameter name="filePath">c:\Users\etidi\OneDrive\Desktop\Inuka na Ploti\.github\copilot-instructions.md