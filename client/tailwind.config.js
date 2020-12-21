const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    fontFamily: {
      serif: ['Libre Baskerville', 'sans-serif'],
      sans: ['Nunito', 'sans'],
    },
    extend: {
      colors: {
        primary: {
          base: '#ED8936',
          dark: '#DD6B20',
        },
        secondary: {
          base: colors.blue['500'],
          dark: colors.blue['600'],
          darker: colors.blue['700'],
        },
        success: colors.green['500'],
        error: colors.red['500'],
      },
    },
  },
  variants: {},
  plugins: [],
};
