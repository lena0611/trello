<template>
  <CardList />
</template>

<script>
import Cards from '~/components/cards'
export default {
  components: {
    CardList: Cards
  },
  async fetch({ store }) {
    try {
      const list = await store.dispatch('cards/getCards')
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
