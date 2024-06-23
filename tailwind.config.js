/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "h1-mob": ["50px", "60px"],
        "h1-desk": ["70px", "80px"],
      },
      colors: {
        "primary-color": "#1b365d",
        "secondary-color": "#dc582a",
        "tertiary-color": "#f5f5f5",
        "text-color-primary": "#1b365d",
        "text-color-secondary": "#f5f5f5",
        "link-primary": "#1F51FF",
        "navigation-color": "#28282B",
        "off-white": "#f5f5f5",
      },
      padding: {
        80: "80px",
      },
      width: {
        200: "200px",
      },
      minHeight: {
        60: "60px",
        200: "200px",
      },
      minWidth: {
        60: "60px",
        200: "200px",
      },
      maxWidth: {
        15: "15px",
        25: "25px",
        60: "60px",
        200: "200px",
      },
    },
  },
  plugins: [],
};
