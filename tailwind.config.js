/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        extend: {
          "0%": { width: "100%" },
          "100%": { width: "200px" },
        },
        shrink: {
          "0%": { width: "200px" },
          "100%": { width: "200%" },
        },
      },
      animation: {
        "extend-m": "extend 0.25s ease out",
        "shrink-m": "shrink 0.25s ease out",
      },
    },
  },
  plugins: [],
};
