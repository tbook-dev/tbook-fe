// const plugin = require("tailwindcss/plugin");
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  // important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tbook/ui/src/**/*.{js,jsx}",
    "./node_modules/@tbook/snapshot/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        lg: "1198px", // 96*2+928=1120
      },
      backgroundImage: {
        linear1:
          "linear-gradient(280deg, rgba(144, 75, 246, 0.10) 49.68%, rgba(207, 0, 99, 0.10) 108.87%)",
        linear2: "linear-gradient(116deg, #7535C4 0%, #351857 100%)",
      },
      boxShadow: {
        s1: " 0px 0px 6px 0px rgba(0, 0, 0, 0.10)",
        s2: "0px 0px 8px 0px rgba(0, 0, 0, 0.08)",
        s3: "0px 0px 4px 0px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        rhd: ["Red Hat Display", "sans-serif"],
      },
      fontSize: {
        "6.5xl": "4rem",
        "4.2xl": "42px",
      },
      colors: {
        // light text num
        lt: {
          1: "#191919",
          2: "#666",
        },
        c: {
          0: "#000",
          3: "#333",
          6: "#666",
          9: "#999",
        },
        blue: {
          1: "#3A82F7",
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
          2: "rgba(0, 0, 0, 0.02)",
          4: "rgba(0, 0, 0, 0.4)",
          6: "rgba(0, 0, 0, 0.06)",
          8: "rgba(0, 0, 0, 0.8)",
        },
        // disable
        disable: "rgba(255, 255, 255, 0.2)",
        theme: "#69D0E5",
        gray: "#121212",
        //bg-container
        bg: {
          b: "#000",
          l: "#FBFDFF",
        },
      },
      borderWidth: {
        3: "3px",
      },
      borderRadius: {
        button: "20px",
        "2.5xl": "20px",
        "4xl": "40px",
      },
      spacing: {
        bx: "1280px",
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
    },
  },
  //   plugins: [require("tw-elements/dist/plugin")]
};
