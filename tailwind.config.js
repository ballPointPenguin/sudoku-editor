/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
}
