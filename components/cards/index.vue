<template>
  <div class="trello">
    <button @click="addCard">
      Add card
    </button>
    <br>
    <hr>
    <br>
    <div class="trello__content">
      <template v-if="cards.length">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="trello__item"
        >
          <card
            :list="card.list"
            :title="card.title"
            :idx="index"
            :id="card._id"
            :cards-length="cards.length"
            @add-job="addJob"
            @move-card="moveCard"
          />
        </div>
      </template>
      <div v-else>
        카드를 추가해 주세요
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Card from './card'
const { mapState: cardsMapState } = createNamespacedHelpers('cards')

export default {
  components: {
    Card
  },
  computed: {
    ...cardsMapState({
      cards: state => state.cards
    })
  },
  methods: {
    addCard() {
      const title = window.prompt('타이틀을 입력해주세요')
      if (!title) {
        return
      }
      this.$store.dispatch('cards/addCard', { title })
    },
    addJob({ cardId, job }) {
      this.$store.dispatch('cards/addJob', { cardId, job })
    },
    moveCard({ currentCardId, selectedJobId, direction }) {
      this.$store.dispatch('cards/moveCard', { currentCardId, selectedJobId, direction })
    }
  }
}
</script>
