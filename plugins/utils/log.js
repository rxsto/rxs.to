/* eslint-disable no-console */
export default function () {
  return {
    log (data) {
      switch (typeof data) {
        case 'string':
          console.info(data)
          break
        case 'object':
          if (typeof data.length === 'number') {
            const level = LEVELS[data.shift()]
            console.log(`%c${level.display}`, `${level.style}`, '»', data[0])
          } else if (typeof data.message === 'string') {
            console.error(data.message)
          }
          break
        default:
          console.info(...data)
      }
    }
  }
}

const LEVELS = {
  b: {
    display: '[BUILD]',
    style: 'color: #727375;'
  },
  m: {
    display: '[METRICS]',
    style: 'color: #492991;'
  },
  i: {
    display: '[INFO]',
    style: 'color: #78a4fa;'
  },
  w: {
    display: '[WARN]',
    style: 'color: #ffcc00;'
  },
  e: {
    display: '[ERROR]',
    style: 'color: #ff9966;'
  },
  f: {
    display: '[FATAL]',
    style: 'color: #cc3300;'
  }
}
