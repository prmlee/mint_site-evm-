/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#000000',
        'blue-light': '#83adb2',
        'yellow-heavy': '#ffa503',
      },
      width: {
        sm: '10px',
        sms: '15px',
        smm: '20px',
        sml: '25px',
        '1/5': '20%',
        full: '100%',
      },
      maxWidth: {
        md: '1024px',
        mds: '1152px',
        mdm: '1280px',
      },
      minWidth: {
        'button-mint': '160px',
      },
      margin: {
        nsm: '-30px',
        nxsl: '-18px',
        nxsm: '-15px',
        nxss: '-12px',
        nxs: '-10px',
        xs: '5px',
        sm: '30px',
      },
      padding: {
        xs: '10px',
        xsl: '25px',
        sm: '30px',
        md: '50px',
        lg: '70px',
        xl: '90px',
        xxl: '110px',
        sl: '130px',
        'normal-button': '10px 20px',
        input: '15px 10px 15px 30px',
      },
      backgroundImage: {
        decrease: "url('/src/assets/images/rectangle1.png')",
        increase: "url('/src/assets/images/rectangle2.png')",
        input: "url('/src/assets/images/rectangle3.png')",
      },
      backgroundSize: {
        full: '100% 100%',
      },
      borderWidth: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '10px',
      },
      fontSize: {
        sm: '12px',
        smm: '20px',
        sml: '28px',
        md: '36px',
      },
      lineHeight: {
        gsm: '120%',
      },
    },
  },
  plugins: [],
};
