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
          500: '#ED8936',
          600: '#DD6B20',
        },
        secondary: {
          500: colors.blue['500'],
          600: colors.blue['600'],
          700: colors.blue['700'],
        },
        danger: {
          500: colors.red['500'],
          600: colors.red['600'],
        },
        success: colors.green['500'],
        error: colors.red['500'],
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [],
};
