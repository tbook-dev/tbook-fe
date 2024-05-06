// const plugin = require("tailwindcss/plugin");
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: 'class',
  // important: true,
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@tbook/credential/*.{js,jsx}',
  ],
  theme: {
    extend: {
      screens: {
        lg: '1120px', // 96*2+928=1120
      },
      backgroundImage: {
        cw1: 'linear-gradient(283.69deg, #4D0BEF -14.58%, #D645ED 134.55%);',
        cw2: 'linear-gradient(326deg, #4D0BEF 0%, #CF0063 100%)',
      },
      boxShadow: {
        s1: ' 0px 0px 6px 0px rgba(0, 0, 0, 0.10)',
        s2: ' 0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
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
        t: {
          1: '#C8C8C8',
          2: '#666',
          3: '#FCFCFC',
        },
        c: {
          0: '#000',
          3: '#333',
          6: '#666',
          9: '#999',
        },
        // black
        b: {
          1: 'rgba(255, 255, 255, 0.1)',
          2: 'rgba(255, 255, 255, 0.2)',
          4: 'rgba(255, 255, 255, 0.4)',
          6: 'rgba(255, 255, 255, 0.6)',
          8: 'rgba(255, 255, 255, 0.8)',
        },
        l: {
          1: 'rgba(0, 0, 0, 0.1)',
          2: 'rgba(0, 0, 0, 0.02)',
          4: 'rgba(0, 0, 0, 0.4)',
          8: 'rgba(0, 0, 0, 0.8)',
        },
        // disable
        disable: 'rgba(255, 255, 255, 0.2)',
        theme: '#69D0E5',
        gray: '#121212',
        //bg-container
        bg: {
          b: '#000',
          l: '#FBFDFF',
          'b-1': '#161616',
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
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.2s ease-out infinite',
      },
    },
  },
  //   plugins: [require("tw-elements/dist/plugin")]
};
