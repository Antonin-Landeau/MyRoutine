/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "title": "#2D2D2D",
        "green-default": "#80ED99",
        "black-default": "#1F1F1F",
        "gray-default": "#B3B3B3",
      },
    },
    fontFamily: {
      exo: ['"JetBrains Mono"', "monospace"],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
