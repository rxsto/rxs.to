const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#6e8c24',
        secondary: '#5f6b35',
        tertiary: '#30480c',
        background: '#080d02',
        foreground: '#f1e9da'
      },
      fontFamily: {
        sans: [
          'Gabarito',
          ...defaultTheme.fontFamily.sans,
        ]
      },
    },
  },
  content: [
    '/components/**/*.{vue,js,ts}',
    '/layouts/**/*.vue',
    '/pages/**/*.vue',
    '/composables/**/*.{js,ts}',
    '/plugins/**/*.{js,ts}',
    '/utils/**/*.{js,ts}',
    '/App.{js,ts,vue}',
    '/app.{js,ts,vue}',
    '/Error.{js,ts,vue}',
    '/error.{js,ts,vue}',
    '/app.config.{js,ts}'
  ],
  plugins: [],
}
