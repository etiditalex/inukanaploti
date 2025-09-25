/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dyfnobo9r/image/upload/**',
      },
    ],
  },
  // Support for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/inuka-na-ploti' : '',
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/inuka-na-ploti' : '',
}

module.exports = nextConfig
