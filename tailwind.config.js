module.exports = {
  important: true,
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      green: {
        base: '#2e6b33',
        darker: '#3b9933',
        dark: '#59cc3d',
        light: '#8de052',
        lighter: '#c6f075',
        lightest: '#e3fa9e'
      },
      grey: {
        darker: '#222',
        dark: '#313131',
        base: '#424242',
        light: '#757575',
        lighter: '#fafafa'
      }
    },
    fontFamily: {
      body: ['Space Mono', 'Courier New', 'monospace']
    }
  },
  variants: {
    margin: ['responsive', 'last']
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
