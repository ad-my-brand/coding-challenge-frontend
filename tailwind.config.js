/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "poppins": ['Poppins', "sans-serif"],
    },
    screens: {
      "xs": "376px",
      "sm": "576px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px"
    },
    extend: {},
  },
  plugins: [],
}
