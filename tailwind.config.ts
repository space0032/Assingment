import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#080c10',
          card: '#0e1318',
          elevated: '#131920',
          border: '#1e2a35',
        },
        accent: {
          cyan:   '#00e5ff',
          violet: '#7c3aed',
          teal:   '#0d9488',
          amber:  '#f59e0b',
          rose:   '#f43f5e',
          green:  '#22c55e',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        pulse_soft: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.4' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        'progress-fill': {
          from: { width: '0%' },
          to:   { width: 'var(--progress-width)' },
        },
      },
      animation: {
        pulse_soft:      'pulse_soft 2s ease-in-out infinite',
        shimmer:         'shimmer 1.6s linear infinite',
        'progress-fill': 'progress-fill 1s ease-out forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        shimmer: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}

export default config