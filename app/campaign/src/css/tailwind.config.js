// const plugin = require("tailwindcss/plugin");
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: 'class',
  // important: true,
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@tbook/ui/src/**/*.{js,jsx}',
    './node_modules/@tbook/snapshot/**/*.{js,jsx}',
    './node_modules/@tbook/credential/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      screens: {
        lg: '1200px', // 96*2+928=1120
      },
      backgroundImage: {
        linear1:
          'linear-gradient(280deg, rgba(144, 75, 246, 0.10) 49.68%, rgba(207, 0, 99, 0.10) 108.87%)',
        linear2: 'linear-gradient(116deg, #7535C4 0%, #351857 100%)',
        linear3: 'linear-gradient(30deg, #C60C7A 0%, #904bf6  60%)',
        linear4:
          'linear-gradient(179deg, rgba(0, 0, 0, 0.00) 58.87%, rgba(0, 0, 0, 0.90) 91.27%, #000 104.31%)',
        linear5:
          'linear-gradient(280deg, rgba(144, 75, 246, 0.10) 49.68%, rgba(207, 0, 99, 0.10) 108.87%)',
        linear6:
          'radial-gradient(364.17% 143% at 96.13% 4.31%, #7535C4 0%, #1B0B2D 44.67%, #220F3A 91.12%)',
        linear7: 'linear-gradient(280deg, #904BF6 49.68%, #CF0063 108.87%)',
        linear8: 'linear-gradient(163deg, #904BF6 1.97%, #CF0063 92.07%)',
        linear9:
          ' linear-gradient(90deg, rgba(255, 234, 181, 0.35) 0%, rgba(242, 168, 93, 0.35) 26%, rgba(128, 82, 228, 0.35) 50%, rgba(46, 133, 234, 0.35) 74.5%, rgba(104, 239, 174, 0.35) 100%)',
      },
      boxShadow: {
        s1: ' 0px 0px 6px 0px rgba(0, 0, 0, 0.10)',
        s2: '0px 0px 2px 0px rgba(177, 125, 255, 0.60)',
        s3: '0px 0px 4px 0px rgba(0, 0, 0, 0.08)',
        s4: '0px 4px 20px 0px rgba(0, 110, 233, 0.02)',
        s5: ' 0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)',
      },
      fontFamily: {
        rhd: ['Red Hat Display', 'sans-serif'],
        'zen-dot': ['zen-dot', 'sans-serif'],
      },
      fontSize: {
        '6.5xl': '4rem',
        '4.2xl': '42px',
      },
      colors: {
        // light text num
        lt: {
          1: '#191919',
          2: '#666',
        },
        c: {
          0: '#000',
          3: '#333',
          6: '#666',
          9: '#999',
        },
        blue: {
          1: '#3A82F7',
        },
        // disable
        disable: 'rgba(255, 255, 255, 0.2)',
        theme: '#69D0E5',
        gray: '#121212',
        //bg-container
        bg: {
          b: '#000',
          l: '#FBFDFF',
        },
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        button: '20px',
        '2.5xl': '20px',
        '4xl': '40px',
      },
      spacing: {
        bx: '1280px',
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
      },
    },
  },
  //   plugins: [require("tw-elements/dist/plugin")]
};
