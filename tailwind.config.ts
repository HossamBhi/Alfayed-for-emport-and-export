/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors')
import colors from "tailwindcss/colors";
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        ...colors,
        "black-100": "#2B2C35",
        primary: {
          DEFAULT: "var(--color-primary)",
          100: "#F5F8FF",
        },
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        "background-card": "var(--color-background-card)",
        // "on-background": "rgb(var(--color-on-background))",
        // surface: "rgb(var(--color-surface))",
        // "surface-varient": "rgb(var(--color-surface-varient))",
        text: "var(--color-text)",
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
      },
      backgroundImage: {
        pattern: "url('/pattern.png')",
        "hero-bg": "url('/hero-bg.png')",
      },
      
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(transparent|current|blue|white|purple|green|midnight|metal|tahiti|silver|bermuda)/,
    },
    {
      pattern:
        /(bg|text|border)-(tahiti)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
};
