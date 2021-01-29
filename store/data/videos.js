export const state = () => ({
  latest: null,
  latestRequested: false,
  latestLoaded: false,
  latestErrored: false
})

export const mutations = {
  setLatest (state, latest) {
    state.latest = latest
  },
  setLatestRequested (state, latestRequested) {
    state.latestRequested = latestRequested
  },
  setLatestLoaded (state, latestLoaded) {
    state.latestLoaded = latestLoaded
  },
  setLatestErrored (state, latestErrored) {
    state.latestErrored = latestErrored
  }
}

export const actions = {
  async getLatest ({ commit, state }) {
    if (!state.latestRequested) {
      try {
        commit('setLatestRequested', true)
        commit('setLatest', await this.$axios.$get('/videos/latest'))
        commit('setLatestLoaded', true)
      } catch (err) {
        commit('setLatestErrored', true)
        this.$util.log(err)
        throw new Error('Failed requesting latest video!')
      }
    }
  }
}
