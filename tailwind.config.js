module.exports = {
  important: true,
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      gray: {
        darker: '#333333',
        dark: '#888888',
        light: '#BBBBBB',
        lighter: '#EEEEEE'
      },
      green: {
        darker: '#273921',
        dark: '#515934',
        light: '#637D40',
        lighter: '#EBE5B5'
      }
    },
    fontFamily: {
      body: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
    }
  },
  variants: {
    extend: {}
  },
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
