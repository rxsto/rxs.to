export default function ({ app }) {
  return {
    executions: {
      add (schemes) {
        const executions = []
        schemes.forEach((scheme) => {
          scheme.actions.forEach((action) => {
            if (typeof action === 'string') {
              executions.push(app.$util.store.execute(`${scheme.root}/${action}`, {}))
            } else {
              executions.push(app.$util.store.execute(`${scheme.root}/${action.type}`, { refresh: action.refresh || false, data: action.data }))
            }
          })
        })
        return Promise.all(executions)
      }
    }
  }
}
