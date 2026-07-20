/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          orange: '#E8804A',
          amber: '#D4A832',
          rust: '#C05020',
        },
        night: {
          950: '#08090f',
          900: '#0d1117',
          800: '#111520',
          700: '#161c2e',
          600: '#1e2640',
        },
        sand: {
          50: '#fdf8f0',
          100: '#f5e8d0',
          200: '#e8d0a8',
          300: '#d4b07a',
          400: '#c49060',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
