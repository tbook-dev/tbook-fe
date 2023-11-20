// const plugin = require("tailwindcss/plugin");
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  // important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tbook/ui/src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        lg: "1212px",
      },
      backgroundImage: {
        cw1: "linear-gradient(57.39deg, #6AB3F7 -4.5%, #67EBD4 96.91%);",
      },
      boxShadow: {
        d1: "0px 0px 8px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        rhd: ["Red Hat Display", "sans-serif"],
      },
      fontSize: {
        c1: ["14px", { lineHeight: "22px" }],
      },
      colors: {
        c: {
          0: "#000",
          3: "#333",
          6: "#666",
          9: "#999",
        },
        // black
        b: {
          1: "rgba(255, 255, 255, 0.1)",
          2: "rgba(255, 255, 255, 0.2)",
          4: "rgba(255, 255, 255, 0.4)",
          6: "rgba(255, 255, 255, 0.6)",
          8: "rgba(255, 255, 255, 0.8)",
        },
        l: {
          1: "rgba(0, 0, 0, 0.1)",
          8: "rgba(0, 0, 0, 0.8)",
        },
        // disable
        disable: "rgba(255, 255, 255, 0.2)",
        theme: "#69D0E5",
      },
      borderWidth: {
        3: "3px",
      },
      minWidth: {
        36: "9rem",
        44: "11rem",
        56: "14rem",
        60: "15rem",
        72: "18rem",
        80: "20rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      zIndex: {
        60: "60",
      },
      animation: {
        marquee: "marquee 100s linear infinite",
        marquee2: "marquee2 100s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  //   plugins: [require("tw-elements/dist/plugin")]
};
