const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // 500: '#92D293'
          500: '#B1D292'
          // 500: '#77dd77'
        }
      },
      fontFamily: {
        'sans': ['Heebo', ...defaultTheme.fontFamily.sans],
      }
    },
  }
}
