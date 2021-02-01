export default function ({ store, app }) {
  return {
    execute (action, from, data = null) {
      return new Promise((resolve, reject) => {
        if (!store.state.store.executions.find(execution => execution === action)) {
          store.commit('store/addExecution', { action, data })
          store.dispatch(action, data).then(() => {
            store.commit('store/removeExecution', { action, data })
            app.$util.log(['i', `Successfully executed action '${action}'!`, `Origin: ${from}`])
            resolve()
          }).catch((err) => {
            store.commit('store/removeExecution', { action, data })
            app.$util.log(['e', `Failed to execute action '${action}'!`, `Origin: ${from}`])
            reject(err)
          })
        } else {
          app.$util.log(['w', `Ignoring '${action}' since it was already requested!`, `Origin: ${from}`])
          resolve()
        }
      })
    }
  }
}
