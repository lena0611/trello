export const state = () => ({
  cards: []
})

export const mutations = {
  setCards(state, cards) {
    state.cards = cards
  },
  addCard(state, card) {
    state.cards.push(card)
  },
  addJob(state, { _id, list }) {
    const idx = state.cards.findIndex(el => el._id === _id)
    state.cards[idx].list = list
  },
  moveCard(state, { cardIdx, contentIdx, direction }) {
    const targetCardIdx = direction === 'next' ? cardIdx + 1 : cardIdx - 1
    const originCardIdx = cardIdx
    const text = state.cards[originCardIdx].list[contentIdx]
    const newList = state.cards[originCardIdx].list.filter((card, index) => index !== contentIdx)
    state.cards[originCardIdx].list = newList
    state.cards[targetCardIdx].list.push(text)
  },
  updateJob(state, { cardId, jobId, job }) {
    const cardIdx = state.cards.findIndex(el => el._id === cardId)
    const jobIdx = state.cards[cardIdx].list.findIndex(el => el._id === jobId)
    state.cards[cardIdx].list[jobIdx].job = job
  }
}

export const actions = {
  async getCards({ commit }) {
    const res_cards = await this.$axios.$get('/api/cards')
    commit('setCards', res_cards)
  },
  async addCard({ commit }, { title }) {
    const res_card = await this.$axios.$post('/api/addCard', { title })
    commit('addCard', res_card)
  },
  async removeCard({ commit }, { cardId }) {
    const res_cards = await this.$axios.$post('/api/removeCard', { cardId })
    commit('setCards', res_cards)
  },
  async addJob({ commit }, { cardId, job }) {
    const res_card = await this.$axios.$post('/api/addJob', { cardId, job })
    commit('addJob', res_card)
  },
  async updateJob({ commit }, { cardId, jobId, job }) {
    const res_card = await this.$axios.$post('/api/updateJob', { cardId, jobId, job })
    commit('updateJob', { cardId, jobId, job })
  },
  async moveCard({ commit }, { currentCardId, selectedJobId, direction }) {
    // TODO: direction을 이용하여 드롭할 카드의 아이디를 찾아낸다.
    const res_cards = await this.$axios.$post('/api/moveJob', { currentCardId, selectedJobId, direction })
    commit('setCards', res_cards)
  }
}
