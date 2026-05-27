import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0F',
        card: '#111118',
        teal: {
          DEFAULT: '#00F5C4',
          dim: 'rgba(0,245,196,0.15)',
          glow: 'rgba(0,245,196,0.3)',
        },
        amber: {
          DEFAULT: '#F5A623',
          dim: 'rgba(245,166,35,0.15)',
        },
        muted: '#8B8B9E',
        border: 'rgba(0,245,196,0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        pill: '999px',
      },
      backgroundImage: {
        'grid-texture':
          'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,245,196,0.04) 39px, rgba(0,245,196,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,245,196,0.04) 39px, rgba(0,245,196,0.04) 40px)',
      },
      boxShadow: {
        teal: '0 0 20px rgba(0,245,196,0.15), 0 0 40px rgba(0,245,196,0.05)',
        'teal-lg': '0 0 40px rgba(0,245,196,0.25), 0 0 80px rgba(0,245,196,0.1)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'pulse-teal': 'pulseTeal 2s ease-in-out infinite',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.4s ease forwards',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseTeal: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,245,196,0.15), 0 0 40px rgba(0,245,196,0.05)' },
          '50%': { boxShadow: '0 0 40px rgba(0,245,196,0.35), 0 0 80px rgba(0,245,196,0.15)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
