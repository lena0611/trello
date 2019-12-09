<template>
  <div class="card">
    <h3 class="card__title">
      {{ title }}
      <button @click="removeCard" class="btn-delCard">
        X
      </button>
    </h3>
    <div class="card__contents">
      <ul v-if="list.length" class="card__list">
        <li v-for="(item, index) in list" :key="index" class="card__item">
          <button
            :disabled="idx === 0"
            @click="$emit('move-card',{ currentCardId: id, selectedJobId: item._id, direction: 'prev' })"
            class="card__move card__move--left"
          >
            &lt;
          </button>
          <div ref="text" class="card__text">
            <input
              :value="item.job"
              @change="updateJob({ cardId: id, jobId: item._id }, $event)"
              type="text"
            >
          </div>
          <button
            :disabled="cardsLength === idx + 1"
            @click="$emit('move-card',{ currentCardId: id, selectedJobId: item._id, direction: 'next' })"
            class="card__move card__move--right"
          >
            &gt;
          </button>
        </li>
      </ul>
      <button @click="addJob">
        Add Job
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Title' },
    idx: { type: Number, default: -1 },
    id: { type: String, default: '' },
    list: { type: Array, default: () => [] },
    cardsLength: { type: Number, default: 0 }
  },
  methods: {
    addJob() {
      const text = window.prompt('텍스트를 입력해 주세요')
      if (!text) {
        alert('비어 있지 않아야 등록됩니다.')
        return
      }
      this.$emit('add-job', { cardId: this.id, job: text })
    },
    updateJob({ cardId, jobId }, e) {
      const job = e.target.value
      // this.$store.commit('cards/updateText', { cardIdx, contentIdx, text })
      this.$store.dispatch('cards/updateJob', { cardId, jobId, job })
    },
    removeCard() {
      this.$store.dispatch('cards/removeCard', { cardId: this.id })
    }
  }
}
</script>
