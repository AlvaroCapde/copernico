/** @type {import('tailwindcss').Config} */
const theme = require('./tailwind.theme.json');

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme,
  plugins: [],
}

