export const state = () => ({
  executions: []
})

export const mutations = {
  addExecution (state, execution) {
    state.executions.push(execution)
  },
  removeExecution (state, execution) {
    state.executions = state.executions.filter(executionFiltered => executionFiltered === execution)
  }
}
