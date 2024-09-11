// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class', // This enables dark mode
  theme: {
    extend: {
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
}
