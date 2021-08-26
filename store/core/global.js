const initial = () => ({
  loaded: {},
  executions: []
})

export const state = initial

export const mutations = {
  addLoaded (state, loaded) {
    state.loaded = {
      ...state.loaded,
      [loaded]: true
    }
  },
  removeLoaded (state, loaded) {
    delete state.loaded[loaded]
  },
  addExecution (state, execution) {
    state.executions.push(execution)
  },
  reset (state) {
    Object.assign(state, initial())
  }
}
