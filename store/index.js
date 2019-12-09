export const state = () => ({
  authUser: null
})

export const mutations = {
  login(state, user) {
    state.authUser = user
  },
  logout(state) {
    state.authUser = null
  },
  setUser(state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit는 모든 페이지를 서버 렌더링하기 전에 Nuxt.js에 의해 호출
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('setUser', req.session.authUser)
    }
  },
  async login({ commit }, { id, pw }) {
    const res = await this.$axios.$post('/api/login', { id, pw })
    if (!res.id) {
      throw new Error('로그인에 실패했습니다.')
    }
    commit('login', res.id)
  },
  async logout({ commit }) {
    await this.$axios.$post('/api/logout').then(() => commit('logout'))
  }
}
