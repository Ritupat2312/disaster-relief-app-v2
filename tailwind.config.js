// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // This tells Tailwind to scan all your JavaScript/JSX/TS/TSX files in the src/ directory
  // for class names to generate the CSS. This is a crucial step.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  // The 'theme' object is where you customize Tailwind's default values.
  // 'extend' is used to add new values without overwriting the defaults.
  theme: {
    extend: {
      // 1. Customizing Colors
      // You can add your brand's colors here.
      colors: {
        'primary': '#0057B8', // A primary brand color (e.g., a shade of blue)
        'secondary': '#FFD700', // A secondary or accent color
        'dark': '#1C1C1E',      // A deep, dark color for backgrounds
        'light': '#F5F5F7',     // A light color for backgrounds
        'accent-red': '#E53E3E',
      },

      // 2. Customizing Typography (Font Families)
      // You can define your own fonts here. Make sure to import them in your CSS.
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans], // Uses Inter as the primary sans-serif font
        serif: ['Georgia', ...defaultTheme.fontFamily.serif],
        mono: ['Menlo', 'monospace'],
      },

      // 3. Customizing Spacing and Sizing
      // You can add new values to the spacing scale.
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '256': '64rem',
      },

      // 4. Customizing Breakpoints
      // You can add custom breakpoints if needed.
      screens: {
        '3xl': '1600px',
      },
    },
  },

  // The 'plugins' array is where you add Tailwind plugins.
  // Make sure you have installed these plugins via npm.
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Add other plugins as needed, e.g., require('@tailwindcss/aspect-ratio'),
  ],
};