/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./projects/*.html",
    "./js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#F5B942',
          muted: '#D9A737',
          soft: '#FFF3D6',
        }
      }
    },
  },
  plugins: [],
}
