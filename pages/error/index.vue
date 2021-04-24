<template>
  <div class="">Something went wrong
    <div v-for="error, index in getErrors" :key="index">
      <div v-if="error.response">
        <p>A Network Error has occurred</p>
        <p>Error: {{ error.response.status }} || {{ error.response.statusText }}</p>
        <p>Reason: {{ error.response.data.message }}</p>
      </div>
      <div v-else>
        <p>A Client Error has occurred</p>
        <p>Error: {{ error.error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted () {
    if (!this.getErrors.length) {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters({
      getErrors: 'log/getErrors'
    })
  }
}
</script>