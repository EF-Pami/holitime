/** @type {import('tailwindcss').Config} */
export default  {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      25: "25px",
      50: "50px",
      full: "50%",
    },
    fontFamily: {
      text: ["Roboto Flex", "sans-serif"],
      heading: ["Archivo Black", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      background: "#63AEF4", //off-white
      black: "#000",
      blue: "#5C00FF",
      white: "#fff",
      primary: "#DE8E59", // Very dark gray
      secondary: "#2B2129", // Orange
      accent: "#708A81", // Teal
      accentTwo: "#C2956E", //Tan
    },
    extend: {},
  },
  plugins: [],
};

