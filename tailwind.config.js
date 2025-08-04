/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["debug-panel", "panel-wrapper", "horizontal-section"],
  theme: {
    extend: {},
  },
  plugins: [],
}
