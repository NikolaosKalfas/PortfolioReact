/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "h1-mob": ["50px", "60px"],
        "h1-desk": ["70px", "80px"],
      },
      colors: {
        "primary-color": "#eee",
        "secondary-color": "#383838",
        "text-color-primary": "#383838",
        "link-primary": "#1F51FF",
        "navigation-color": "#28282B",
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
