/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        body: ['Instrument Sans', 'sans-serif'],
      },
      colors: {
        bg: '#080c14',
        surface: '#0d1420',
        surface2: '#131c2e',
        surface3: '#0a1020',
        border: 'rgba(56,189,248,0.12)',
        cyan: '#38bdf8',
        'cyan-dim': 'rgba(56,189,248,0.15)',
        'cyan-glow': 'rgba(56,189,248,0.4)',
        gold: '#f59e0b',
        purple: '#a78bfa',
        green: '#34d399',
        text: '#e2e8f0',
        muted: '#64748b',
      },
    },
  },
  plugins: [],
};
