# Inuka na Ploti - Premium Land Investment Website

A modern, Apple-like real estate website built with Next.js, Tailwind CSS, and static export capabilities for GitHub Pages deployment.

## 🚀 Features

- **Modern Design**: Clean, Apple-inspired UI with generous whitespace and elegant typography
- **Static Export**: Fully static website deployable to GitHub Pages
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Complete metadata, Open Graph, JSON-LD, sitemap, and robots.txt
- **Accessibility**: WCAG AA compliant with proper focus states and landmarks
- **Performance**: Optimized images, lazy loading, and minimal bundle size
- **Interactive Maps**: Mapbox GL JS or Google Maps integration with environment switching
- **Form Integration**: Formspree integration for contact forms and newsletters
- **Property Listings**: Dynamic property grid with filtering and search
- **Payment Plans**: Interactive payment calculators and financing information

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Maps**: Mapbox GL JS or Google Maps (configurable)
- **Forms**: Formspree integration
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **TypeScript**: Full type safety

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inuka-na-ploti
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Map Configuration
   NEXT_PUBLIC_MAP_PROVIDER=mapbox
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   # OR
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key_here

   # Formspree Configuration
   NEXT_PUBLIC_FORMSPREE_CONTACT=your_contact_form_endpoint
   NEXT_PUBLIC_FORMSPREE_NEWSLETTER=your_newsletter_endpoint
   NEXT_PUBLIC_FORMSPREE_SITEVISIT=your_site_visit_endpoint

   # GitHub Pages (for deployment)
   GITHUB_PAGES=true
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Export static site
- `npm run lint` - Run ESLint

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── financing/         # Financing page
│   ├── gallery/           # Gallery page
│   ├── faqs/              # FAQs page
│   └── listings/          # Property listings
│       ├── page.tsx       # Listings grid
│       └── [slug]/        # Individual property pages
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── ListingCard.tsx   # Property card
│   ├── MapComponent.tsx # Interactive map
│   └── GalleryGrid.tsx   # Image gallery
├── data/                 # Static data
│   └── listings.json     # Property data
├── lib/                  # Utilities
│   └── utils.ts          # Helper functions
└── public/              # Static assets
    ├── sitemap.xml      # SEO sitemap
    └── robots.txt       # SEO robots
```

## 🗺 Map Integration

The website supports both Mapbox and Google Maps. Configure your preferred provider using environment variables:

### Mapbox Setup
1. Get a Mapbox access token from [mapbox.com](https://mapbox.com)
2. Set `NEXT_PUBLIC_MAP_PROVIDER=mapbox`
3. Set `NEXT_PUBLIC_MAPBOX_TOKEN=your_token`

### Google Maps Setup
1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com)
2. Set `NEXT_PUBLIC_MAP_PROVIDER=google`
3. Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key`

## 📝 Form Integration

Forms are integrated with Formspree for easy form handling:

1. Create a Formspree account at [formspree.io](https://formspree.io)
2. Create forms for contact, newsletter, and site visits
3. Add the form endpoints to your environment variables

## 🚀 Deployment

### GitHub Pages Deployment

1. **Build and export the static site**
   ```bash
   npm run build
   npm run export
   ```

2. **Deploy to GitHub Pages**
   - Push the `out` folder contents to your `gh-pages` branch
   - Or use GitHub Actions for automatic deployment

3. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages section
   - Select source as "Deploy from a branch"
   - Choose `gh-pages` branch and `/` folder

### Alternative Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `out` folder or connect via Git
- **AWS S3**: Upload the `out` folder contents to an S3 bucket
- **Any static hosting**: The `out` folder contains all necessary files

## 🎨 Customization

### Brand Colors
The website uses a custom color palette extracted from the Inuka na Ploti logo:
- Primary: #2dabe1 (Blue)
- Secondary: #ec1c26 (Red)
- Accent: #64748b (Gray)
- Neutral: Various shades of gray

### Typography
- Headings: Playfair Display (600-700 weight)
- Body: Inter (400-500 weight)

### Adding New Properties
1. Edit `data/listings.json`
2. Add new property objects with required fields
3. Include high-quality images from Cloudinary
4. Update coordinates for map integration

### Modifying Content
- Update page content in respective `app/[page]/page.tsx` files
- Modify metadata in `app/layout.tsx`
- Update sitemap in `public/sitemap.xml`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_MAP_PROVIDER` | Map provider: 'mapbox' or 'google' | Yes |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox access token | If using Mapbox |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key | If using Google Maps |
| `NEXT_PUBLIC_FORMSPREE_CONTACT` | Contact form endpoint | Yes |
| `NEXT_PUBLIC_FORMSPREE_NEWSLETTER` | Newsletter form endpoint | No |
| `NEXT_PUBLIC_FORMSPREE_SITEVISIT` | Site visit form endpoint | No |
| `GITHUB_PAGES` | Set to 'true' for GitHub Pages deployment | For GitHub Pages |

### Next.js Configuration

The `next.config.js` is configured for static export:
- `output: 'export'` - Enables static export
- `images: { unoptimized: true }` - Required for GitHub Pages
- `basePath` and `assetPrefix` - Support for project pages

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- WCAG AA compliant
- Proper focus states and keyboard navigation
- Alt text for all images
- Semantic HTML structure
- ARIA labels where needed

## 🚀 Performance

- Optimized images with Next.js Image component
- Lazy loading for better performance
- Minimal JavaScript bundle
- Static generation for fast loading
- CDN-ready assets

## 🐛 Troubleshooting

### Common Issues

1. **Map not loading**
   - Check your API keys and environment variables
   - Ensure the map provider is correctly configured
   - Check browser console for errors

2. **Forms not working**
   - Verify Formspree endpoints are correct
   - Check network tab for form submission errors
   - Ensure CORS is properly configured

3. **Build errors**
   - Clear `.next` folder and rebuild
   - Check for TypeScript errors
   - Verify all dependencies are installed

### Getting Help

- Check the browser console for errors
- Verify environment variables are set correctly
- Ensure all required dependencies are installed
- Check the Next.js documentation for framework-specific issues

## 📄 License

This project is proprietary software for Inuka na Ploti. All rights reserved.

## 🤝 Contributing

This is a private project. For any modifications or improvements, please contact the development team.

---

**Built with ❤️ for Inuka na Ploti**
