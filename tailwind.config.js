/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        secondary: "#333745",
        main_light: "#12BD83",
        main: "#0DAB76",
        main_dark: "#0D996A",
      },
    },
  },
  plugins: [],
};
