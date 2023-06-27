/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["BMJUA"],
        special: ["TTWanjudaedunsancheB"],
      },
      colors: {
        "primary-dark": "#1f1f1f",
        primary: "#ffffff",
        highlight: {
          dark: "#FFFFFF",
          light: "#1f1f1f",
        },
        secondary: {
          dark: "#707070",
          light: "#e6e6e6",
        },
        action: "#3B82F6",
        "header-light": "#f2f2f2",
        "header-dark": "#4a4a4a",
      },
      transitionProperty: {
        width: 'width'
      }
    },
    backgroundImage: {
      'png-pattern': 'url("/empty-bg.jpg")'
    }
  },
  plugins: [require('@tailwindcss/typography')],
};
