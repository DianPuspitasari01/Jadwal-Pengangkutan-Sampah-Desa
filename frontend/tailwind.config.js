/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#10b981',
        'primary-dark': '#059669',
        'primary-light': '#d1fae5',
      }
    },
  },
  plugins: [],
}
