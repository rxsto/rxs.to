const expected = [
  401,
  403,
  404
]

const allowed = [
  404
]

export default function ({ store, app }) {
  return {
    store: {
      execute (action, { data = null, refresh = false }) {
        return new Promise((resolve, reject) => {
          if (!store.state.core.global.executions.find(execution => execution.action === action) || !store.state.core.global.executions.filter(execution => execution.action === action).find(execution => execution.data === data) || refresh) {
            const dispatchment = store.dispatch(action, data)
            store.commit('core/global/addExecution', { action, data, dispatchment })
            dispatchment.then(() => {
              app.$util.log(['i', `[STORE] Successfully ${refresh ? 'refreshed' : 'executed'} action "${action}" ${data ? `with data "${data}"` : ''}`])
              resolve()
            }).catch((err) => {
              app.$util.log(['e', `[STORE] Failed to ${refresh ? 'refresh' : 'execute'} action "${action}" ${data ? `with data "${data}"` : ''}`])
              if ((err.response && !expected.find(code => code === err.response.status)) || (!err.response && err.request)) {
                // app.$sentry.captureException(err)
              }
              reject(err)
            })
          } else {
            if (app.$config.logStoreWarnings) {
              app.$util.log(['w', `[STORE] Ignoring ${refresh ? 'refreshing of' : 'execution of'} "${action}" since it was already requested ${data ? `with data "${data}"` : ''}`])
            }
            const dispatchment = store.state.core.global.executions.filter(execution => execution.action === action).find(execution => execution.data === data).dispatchment || store.state.core.global.executions.find(execution => execution.action === action).dispatchment
            dispatchment.then(() => {
              resolve()
            }).catch((err) => {
              reject(err)
            })
          }
        })
      },
      async request (commit, { entity, mutation, endpoint, error }) {
        try {
          commit(mutation, await app.$axios.$get(endpoint))
        } catch (err) {
          if ((err.response && !allowed.find(code => code === err.response.status)) || (!err.response && err.request)) {
            app.$util.log(['e', error])
            throw err
          }
        }
        if (entity) {
          store.commit('core/global/addLoaded', entity)
        }
      }
    }
  }
}
