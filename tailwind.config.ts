/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./routes/**/*.tsx", // Scan all route files for class names
    "./islands/**/*.tsx", // If you have islands
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};