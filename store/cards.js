export const state = () => ({
  cards: []
})

export const mutations = {
  addCard(state, { title }) {
    state.cards.push({ title, list: [] })
  },
  addContent(state, { cardIndex, text }) {
    state.cards[cardIndex].list.push({ text })
  },
  moveCard(state, { cardIdx, contentIdx, direction }) {
    const targetCardIdx = direction === 'right' ? cardIdx + 1 : cardIdx - 1
    const originCardIdx = cardIdx
    const text = state.cards[originCardIdx].list[contentIdx]
    const newList = state.cards[originCardIdx].list.filter((card, index) => index !== contentIdx)
    state.cards[originCardIdx].list = newList
    state.cards[targetCardIdx].list.push(text)
  },
  updateText(state, { cardIdx, contentIdx, text }) {
    state.cards[cardIdx].list[contentIdx].text = text
  }
}
