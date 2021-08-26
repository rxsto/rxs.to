import executions from './utils/executions'
import log from './utils/log'
import store from './utils/store'
import youtube from './utils/youtube'

export default function (ctx, inject) {
  const util = {
    ...executions(ctx),
    ...log(ctx),
    ...store(ctx),
    ...youtube(ctx)
  }

  inject('util', util)
}
