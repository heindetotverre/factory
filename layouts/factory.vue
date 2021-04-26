<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'factory',
  middleware: 'checkToken',
  async created () {
    await this.$store.dispatch('users/setUserByToken', this.token)
  },
  computed: {
    ...mapGetters({
      token: 'auth/readToken'
    })
  }
}
</script>