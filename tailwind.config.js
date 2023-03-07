/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  theme: {
    extend: {
      gradientColorStops: {
        brand: '#111',
      },

      backgroundColor: {
        brand: '#111',
      },
      colors: {
        brand: '#111',
      },
      fontFamily: {
        cursive: ['cursive', 'system-ui'],
      },
    },
  },
  daisyui: {
    themes: ['dark'],
  },
};
