<template>
  <div class="factory factory__floor floor">
    <h1>Welcom at the factory floor</h1>
    <button @click="logout">Logout</button>
    <div class="user">{{ getUser }}</div>
    <layoutSpinner v-if="busy"></layoutSpinner>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'factory',
  async asyncData ({params}) {
    return 
  },
  data () {
    return {
      busy: true
    }
  },
  watch: {
    getUser() {
      this.busy = false
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'users/getUser'
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/clearToken')
      this.$router.push('/factory')
    }
  }
}
</script>