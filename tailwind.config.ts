import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './features/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'admin-bg-base': '#0F1535',
        'admin-bg-deep': '#070C2B',
        'admin-border': 'rgba(255, 255, 255, 0.12)',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0AEC0',
        'text-muted': '#718096',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #0075FF, #582CFF)',
        'gradient-success': 'linear-gradient(90deg, #01B574, #2CD9FF)',
        'gradient-warning': 'linear-gradient(90deg, #FF9F0A, #FF5E62)',
        'gradient-danger': 'linear-gradient(90deg, #FF0080, #7928CA)',
        'gradient-info': 'linear-gradient(90deg, #2CD9FF, #582CFF)',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(30%, -30%) scale(1.1)' },
          '66%': { transform: 'translate(-20%, 20%) scale(0.9)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        aurora: 'aurora 8s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
