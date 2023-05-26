// const plugin = require("tailwindcss/plugin");
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: 'class',
  // important: true,
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@tbook/ui/src/**/*.{js,jsx}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      screens: {
        lg: '1120px' // 96*2+928=1120
      },
      backgroundImage: {
        cw1: 'linear-gradient(283.69deg, #4D0BEF -14.58%, #D645ED 134.55%));'
      },
      fontFamily: {
        rhd: ['Red Hat Display', 'sans-serif']
      },

      colors: {
        c: {
          0: '#000',
          3: '#333',
          6: '#666',
          9: '#999'
        },
        // black
        b: {
          1: 'rgba(255, 255, 255, 0.1)',
          2: 'rgba(255, 255, 255, 0.2)',
          4: 'rgba(255, 255, 255, 0.4)',
          6: 'rgba(255, 255, 255, 0.6)',
          8: 'rgba(255, 255, 255, 0.8)'
        },
        l: {
          1: 'rgba(0, 0, 0, 0.1)',
          2: 'rgba(0, 0, 0, 0.02)',
          4: 'rgba(0, 0, 0, 0.4)',
          8: 'rgba(0, 0, 0, 0.8)'
        },
        // disable
        disable: 'rgba(255, 255, 255, 0.2)',
        theme: '#69D0E5',
        gray: '#191919',
        //bg-container
        bg: {
          b: '#000',
          l: '#FBFDFF'
        }
      },
      borderWidth: {
        3: '3px'
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      zIndex: {
        60: '60'
      }
    }
  }
  //   plugins: [require("tw-elements/dist/plugin")]
}
