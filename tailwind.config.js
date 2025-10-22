/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#1e3a8a', // Dark blue from logo
          600: '#1e40af',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#dc2626', // Red from logo
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        accent: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        'heading': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        'heading-alt': ['var(--font-playfair)', 'Playfair Display', 'serif'],
        'body': ['var(--font-roboto)', 'Roboto', 'var(--font-open-sans)', 'Open Sans', 'sans-serif'],
        'body-alt': ['var(--font-lato)', 'Lato', 'sans-serif'],
        'body-secondary': ['var(--font-pt-sans)', 'PT Sans', 'sans-serif'],
        'serif': ['var(--font-merriweather)', 'Merriweather', 'serif'],
        'serif-alt': ['var(--font-pt-serif)', 'PT Serif', 'serif'],
        'luxury': ['var(--font-playfair)', 'Playfair Display', 'serif'],
        'luxury-alt': ['Georgia', 'serif'],
        'display': ['var(--font-playfair)', 'Playfair Display', 'serif'],
        'sans': ['var(--font-roboto)', 'Roboto', 'var(--font-open-sans)', 'Open Sans', 'sans-serif'],
        'roboto': ['var(--font-roboto)', 'Roboto', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
        'lato': ['var(--font-lato)', 'Lato', 'sans-serif'],
        'pt-sans': ['var(--font-pt-sans)', 'PT Sans', 'sans-serif'],
        'pt-serif': ['var(--font-pt-serif)', 'PT Serif', 'serif'],
        'merriweather': ['var(--font-merriweather)', 'Merriweather', 'serif'],
        'montserrat': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        'playfair': ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
