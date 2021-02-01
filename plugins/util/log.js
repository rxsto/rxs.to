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
            console.info(`${LEVELS[data.shift()]} » ${data.join(' ')}`)
          } else if (typeof data.message === 'string') {
            console.error(data.message)
          }
          break
        default:
      }
    }
  }
}

const LEVELS = {
  i: '[INFO]',
  w: '[WARN]',
  e: '[ERROR]',
  f: '[FATAL]'
}
