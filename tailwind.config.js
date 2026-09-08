/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        oled: {
          black: '#000000',
          border: '#1A1A1A',
        },
        primary: '#F5F5F5',
        secondary: '#8A8A8A',
        muted: '#555555',
        accent: '#C8FF00',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        avenir: ['"Avenir Next"', 'Avenir', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
      },
    },
  },
  plugins: [],
};
