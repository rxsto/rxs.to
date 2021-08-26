const initial = () => ({
  latestVideo: null
})

export const state = initial

export const mutations = {
  setLatestVideo (state, latestVideo) {
    state.latestVideo = latestVideo
  }
}

export const actions = {
  async getLatestVideo ({ commit }) {
    await this.$util.store.request(commit, {
      entity: 'latestVideo',
      mutation: 'setLatestVideo',
      endpoint: '/videos/latest',
      error: 'Failed requesting latest video!'
    })
  }
}
