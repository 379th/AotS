/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gothic': ['UnifrakturMaguntia', 'serif'],
      },
      colors: {
        'shadow-purple': {
          50: '#f3f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bea6ff',
          400: '#9f75ff',
          500: '#843dff',
          600: '#7916ff',
          700: '#6b04fd',
          800: '#5a03d4',
          900: '#4b05ad',
          950: '#2c0076',
        }
      },
      backgroundImage: {
        'mystic-gradient': 'radial-gradient(circle at 20% 10%, #3C2A6A 0%, #2C1B4C 35%, #1B1030 70%)',
        'frame-gradient': 'linear-gradient(180deg, rgba(216,186,144,.95), rgba(186,152,109,.95))',
        'content-gradient': 'linear-gradient(180deg, rgba(17,21,35,.90), rgba(18,22,38,.90))',
        'input-gradient': 'linear-gradient(180deg, rgba(233,213,184,.96), rgba(215,189,150,.98))',
        'button-gradient': 'linear-gradient(180deg, rgba(221,196,158,.94), rgba(199,167,127,.96))',
      }
    },
  },
  plugins: [],
}

