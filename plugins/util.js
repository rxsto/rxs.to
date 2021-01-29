import log from './util/log'
import store from './util/store'

export default function (ctx, inject) {
  const util = {
    ...log(ctx),
    ...store(ctx)
  }

  inject('util', util)
}
