/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffbd64",
        secondary: "#eaa334",
      },
      boxShadow: {
        profile: "0 3px 4px rgba(0, 0, 0, 0.2)",
        avatar: "0px 5px 10px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
