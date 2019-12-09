<template>
  <div>
    <ul>
      <li>
        <input id="id" v-model="frmId" type="text" name="id">
      </li>
      <li>
        <input id="pw" v-model="frmPw" type="password" name="pw">
      </li>
      <li>
        <button @click="login">
          로그인
        </button>
      </li>
    </ul>
    <p v-if="returnMsg">
      {{ returnMsg }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      returnMsg: null,
      frmId: '',
      frmPw: ''
    }
  },
  methods: {
    async login() {
      console.log('method login')
      try {
        await this.$store.dispatch('login', {
          id: this.frmId,
          pw: this.frmPw
        }).then(() => this.redirect())
      } catch (e) {
        this.returnMsg = e.message
      }
    },
    redirect() {
      console.log('redirect')
      this.$router.push('/')
    }
  }
}
</script>
