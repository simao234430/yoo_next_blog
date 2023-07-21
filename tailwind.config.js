/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

const linkHeadingStyles = {
  color: colors.gray[100],
  borderBottomColor: 'transparent',
  '&:hover': {
    color: `${colors.gray[900]}`,
  },
};
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
 
  theme: {
    extend: {
    },
  },
 
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
}
