// const plugin = require("tailwindcss/plugin");
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  // important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tbook/ui/src/**/*.{js,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        lg: "1120px", // 96*2+928=1120
      },
      backgroundImage: {
        cw1: "linear-gradient(57.39deg, #6AB3F7 -4.5%, #67EBD4 96.91%);",
        cw2: "linear-gradient(57.39deg, rgba(106, 179, 247, 0.15) -4.5%, rgba(103, 235, 212, 0.15)  96.91%);",
        cw3: "linear-gradient(57.39deg, rgba(106, 179, 247, 0.1) -4.5%, rgba(103, 235, 212, 0.1) 96.91%);",
        cw4: "linear-gradient(0deg, rgba(255, 255, 255, 0.95), #45A0F5);",
      },
      boxShadow: {
        d1: "0px 0px 8px rgba(0, 0, 0, 0.08)",
        d2: "0px 8px 24px rgba(69, 160, 245, 0.2)",
        d3: "0px 0px 8px rgba(255, 255, 255, 0.25)",
        d4: "0px 0px 2px rgba(255, 255, 255, 0.25)",
        d5: "0px 0px 8px rgba(255, 255, 255, 0.6)",
        d6: "0px 0px 8px rgba(255, 255, 255, 0.3)",
        d7: "0px 0px 8px rgba(255, 255, 255, 0.6)",
        d8: "0px 1px 4px rgba(0, 0, 0, 0.1)",
        d9: "1px 3px 8px rgba(0, 0, 0, 0.3)",
        d10: "0px 0px 8px rgba(255, 255, 255, 0.35)",
        d11: "0px 0px 16px rgba(255, 255, 255, 0.6)",
        l1: "0px 0px 8px rgba(0, 0, 0, 0.08)",
        l2: "0px 0px 8px rgba(0, 0, 0, 0.25)",
        l3: "inset 0px 0px 6px rgba(69, 160, 245, 0.04)",
        l4: "0px 0px 8px rgba(0, 0, 0, 0.1)",
        l5: "0px -2px 8px rgba(255, 255, 255, 0.25)",
        l6: "0px -2px 8px rgba(0, 0, 0, 0.1)",

        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)",
        c1: "1px 2px 2px rgba(0, 0, 0, 0.25)",
        c2: "1px 1px 10px rgba(0, 0, 0, 0.1)",
        c3: "0px 1px 2px rgba(15, 23, 42, 0.04)",
        c4: "4px 4px 8px rgba(15, 23, 42, 0.04)",
        c5: "1px 1px 10px rgba(0, 0, 0, 0.1)",
        c6: "0px -3px 20px rgba(0, 0, 0, 0.1)",
        c7: "0px -4px 16px rgba(0, 0, 0, 0.1)",
        c8: "0px 0px 6px rgba(0, 0, 0, 0.1)",
        c9: "0px 2px 4px rgba(0, 0, 0, 0.04)",
        c10: "0px -4px 20px rgba(0, 0, 0, 0.1)",
        c11: "0px 2px 6px rgba(0, 0, 0, 0.04)",
        c12: "0px 2px 10px rgba(0, 0, 0, 0.08)",
        c13: "1px 2px 10px rgba(0, 0, 0, 0.08)",
      },
      outline: {
        blue: "2px solid rgba(0, 112, 244, 0.5)",
      },
      fontFamily: {
        rhd: ["Red Hat Display", "sans-serif"],
      },
      fontSize: {
        c1: ["14px", { lineHeight: "22px" }],
        c2: ["14px", { lineHeight: "16px" }],
        c3: ["20px", { lineHeight: "28px" }],
        c4: ["12px", { lineHeight: "16px" }],
        c5: ["12px", { lineHeight: "20px" }],
        c6: ["16px", { lineHeight: "24px" }],
        c7: ["18px", { lineHeight: "24px" }],
        c8: ["13px", { lineHeight: "16px" }],
        c9: ["16px", { lineHeight: "20px" }],
        c10: ["18px", { lineHeight: "20px" }],
        c11: ["28px", { lineHeight: "32px" }],
        c12: ["20px", { lineHeight: "24px" }],
        c13: ["20px", { lineHeight: "32px" }],
        c14: ["14px", { lineHeight: "18px" }],
        c15: ["12px", { lineHeight: "14px" }],
        c16: ["14px", { lineHeight: "20px" }],

        // coustom web h1
        cwh1: ["32px", { lineHeight: "40px" }],
        cwh2: ["24px", { lineHeight: "32px" }],
        cwh3: ["40px", { lineHeight: "40px" }],

        cwh4: ["56px", { lineHeight: "74px" }],
        cwh5: ["24px", { lineHeight: "28px" }],

        // coustom h5 h1
        ch1: ["28px", { lineHeight: "36px" }],

        // xxs: ["11px", { lineHeight: '30px', "transform-origin-x": 0, "transform": 'scale(0.9)'}],
        // xs: ["0.75rem", { lineHeight: "1.5" }],
        // sm: ["0.875rem", { lineHeight: "1.5715" }],
        // base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        // lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        // xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        // "2xl": ["1.5rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        // "3xl": ["1.88rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        // "4xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        // "5xl": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        // "6xl": ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
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
          2: "rgba(0, 0, 0, 0.02)",
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
    },
  },
  //   plugins: [require("tw-elements/dist/plugin")]
};
