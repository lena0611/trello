<template>
  <div class="trello">
    <button @click="addCard">
      Add card
    </button>
    <hr>
    <div class="trello__content">
      <template v-if="cards.length">
        <div v-for="(card, index) in cards" :key="index" class="trello__item">
          <card
            :list="card.list"
            :title="card.title"
            :idx="index"
            :cards-length="cards.length"
            @add-content="addContent"
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
      this.$store.commit('cards/addCard', { title })
    },
    addContent({ text, idx }) {
      this.$store.commit('cards/addContent', { cardIndex: idx, text })
    },
    moveCard({ cardIdx, contentIdx, direction }) {
      this.$store.commit('cards/moveCard', { cardIdx, contentIdx, direction })
    }
  }
}
</script>

<style lang="scss">
.trello {
  &__content {
    display: flex;
    flex-wrap: wrap;
  }
  &__item {
    flex-basis: 200px;
    margin: 0 10px;
  }
}
</style>
