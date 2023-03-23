/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.workersScroll' : {
          'height': '100%',
          'width': '100%',
          'overflow-y': 'auto'
        },
        '.workersScroll::-webkit-scrollbar' : {
          'width': '5px',
          'height': '5px'
        },
        '.workersScroll::-webkit-scrollbar-thumb' : {
          'background-color': '#A4A9AE',
          'borderRadius': '20px'
        }
      });
    }),
  ],
}
