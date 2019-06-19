<template>
  <div class="card">
    <h3 class="card__title">
      {{ title }}
    </h3>
    <div class="card__contents">
      <ul v-if="list.length" class="card__list">
        <li v-for="(item, index) in list" :key="index" class="card__item">
          <button
            :disabled="idx===0"
            class="card__move card__move--left"
            @click="$emit('move-card',{ cardIdx: idx, contentIdx: index, direction: 'left' })"
          >
            &lt;
          </button>
          <div ref="text" class="card__text">
            <input :value="item.text" type="text" @change="updateText({ cardIdx: idx, contentIdx: index},$event)">
          </div>
          <button
            :disabled="cardsLength === idx + 1"
            class="card__move card__move--right"
            @click="$emit('move-card',{ cardIdx: idx, contentIdx: index, direction: 'right' })"
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
    title: {
      type: String,
      default: 'Title'
    },
    idx: {
      type: Number,
      default: -1
    },
    list: {
      type: Array,
      default: () => []
    },
    cardsLength: {
      type: Number,
      default: 0
    }
  },
  methods: {
    addJob() {
      const text = window.prompt('텍스트를 입력해 주세요')
      if (!text) {
        alert('비어 있지 않아야 등록됩니다.')
        return
      }
      this.$emit('add-content', { text, idx: this.idx })
    },
    updateText({ cardIdx, contentIdx }, e) {
      const text = e.target.value
      this.$store.commit('cards/updateText', { cardIdx, contentIdx, text })
    }
  }
}
</script>

<style lang="scss">
.card {
  border: 1px solid gray;
  &__title {
    background: blue;
    color: #fff;
  }
  &__list {
    margin: 0;
    padding: 0;
  }
  &__item {
    margin: 0;
    padding: 5px 0;
    display: flex;
    width: 100%;
  }
  &__text {
    flex: 1;
  }
  * {
    align-items: stretch;
  }
}
button[disabled] {
  opacity: 0.3;
}
input[type='text'] {
  border: none;
}
</style>
