/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
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
        "text-color-primary": "#383838",
      },
      maxWidth: {
        60: "60px",
      },
    },
  },
  plugins: [],
};
