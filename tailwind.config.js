/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4AF37',
          light: '#F4D03F',
          dark: '#B7950B'
        },
        secondary: {
          DEFAULT: '#8B4513',
          light: '#CD853F',
          dark: '#5D2F05'
        },
        accent: '#228B22',
        surface: {
          50: '#FAF9F6',
          100: '#F5F3ED',
          200: '#EBE6D5',
          300: '#E0D8BD',
          400: '#D6CBA5',
          500: '#CCBE8D',
          600: '#C2B175',
          700: '#B8A45D',
          800: '#AE9745',
          900: '#A48A2D'
        }
      },
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
        heading: ['Pirata One', 'cursive']
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'neu-light': '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
        'neu-dark': '20px 20px 60px #1e1e1e, -20px -20px 60px #404040'
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem'
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s infinite'
      }
    },
  },
  plugins: [],
}