<template>
  <div class="">Homepage
    <p>{{ getHomePage }}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    layout: 'homePage',
    computed: {
      ...mapGetters({
        getHomePage: 'pages/getHomePage'
      })
    }
  }
</script>