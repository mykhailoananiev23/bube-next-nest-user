/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./modules/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0071BC",
        sec: "#00c6d9",
        bgcolor: "#F6F7FB",
        secondary: "#DCF0FB",
        darkText: "#050931",
      },
      fontFamily: {
        "inter" : "'Inter', sans-serif"
      }
    },
  },
  plugins: [
  ],
});

// fontFamily: {
//   sans: ["Inter", ...defaultTheme.fontFamily.sans],
// },
