const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    colors: {
      gray: colors.coolGray,
      emerald: colors.emerald,
      green: colors.green,
      cyan: colors.cyan,
      pink: colors.pink,
      rose: colors.rose,
      yellow: colors.yellow,
      red: colors.red,
      blue: colors.blue,
      white: colors.white,
      black: colors.black,
      orange: colors.orange,
    },
    extend: {
      fontFamily: {
        sans: ["IRANSansWeb", "Helvetica", "Arial", "sans-serif"],
      },
      spacing: {
        28: "7rem",
        72: "18rem",
        80: "20rem",
        128: "32rem",
        168: "42rem",
        192: "48rem",
      },
    },
  },
  variants: {
    float: ["responsive", "direction"],
    margin: ["responsive", "direction"],
    padding: ["responsive", "direction"],
  },
  plugins: [require("tailwindcss-dir")()],

  purge: {
    // Filenames to scan for classes
    content: [
      "./src/**/*.html",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./public/index.html",
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      // safelist: [],
    },
  },
};
