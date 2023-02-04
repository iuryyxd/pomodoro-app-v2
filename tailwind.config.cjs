/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#d7e0ff",
        "dark-blue": "#1e213f",
        "dark-blue-2": "#161932",
        "light-grey": "#eff1fa",
        red: "#F87070",
        cyan: "#70F3F8",
        pink: "#D881F8",
      },
      fontFamily: {
        "kumbh-sans": "Kumbh Sans, sans-serif",
        roboto: "Roboto Slab, sans-serif",
        "space-mono": "Space Mono, monospace",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "568px" },
      // => @media (max-width: 568px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
