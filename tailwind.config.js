/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightBg: "#d5b9b9",
        darkBg: "#1B1C1E",
        lightText: "#000000",
        darkText: "#ffffff",
        bgInDark: "#2D3031",
        inputBg: "#F9ECE8",
      },
      fontFamily: {
        rancho: ["Rancho", "cursive"],
        silkscreen: ["Silkscreen", "monospace"],
      },
      screens: {
        xs: { max: "410px" },
        xss: { max: "360px" },
      },
      transitionProperty: {
        bg: "background-color",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        float: "float 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
