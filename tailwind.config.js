/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx,js,jsx,mdx}',
    './src/components/**/*.{ts,tsx,js,jsx,mdx}',
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D7D7D7',
        secondary: '#758694',
        therd: '#F5F5F5',
      },
    },
  },
  plugins: [],
};
