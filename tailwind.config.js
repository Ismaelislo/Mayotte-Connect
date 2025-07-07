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
        mayotte: {
          turquoise: '#40E0D0',
          'turquoise-dark': '#20B2AA',
          green: '#228B22',
          'green-dark': '#006400',
          sand: '#F4A460',
          'sand-dark': '#D2691E',
          coral: '#FF7F50',
          'coral-dark': '#FF6347',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}