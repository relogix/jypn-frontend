const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false,
  important: true,
  theme: {
    extend: {
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
    },
  },
  variants: {
    extend: {
      backgroundSize: ["hover"],
      backgroundPosition: ["hover"],
      filter: ["hover"],
    },
  },
  plugins: [],
};
