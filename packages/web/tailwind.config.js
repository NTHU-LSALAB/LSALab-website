module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#0E6BA8",
        primary: "#007FFF",
      },
      height: {
        main: "calc(100vh - 80px)",
      },
      boxShadow: {
        '5': '0 3px 8px rgba(0, 0, 0, 0.24)',
        app: "0 4px 12px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
