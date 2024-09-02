/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
    './public/index.html', // if you have any utility classes in your public HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

