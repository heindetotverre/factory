<template>
  <div class="factory factory__floor floor">
    <h1>Welcome at the factory floor</h1>
    <button @click="logout">Logout</button>
    <button @click="gotToCreatePage">Create page</button>
    <div class="floor__user" v-if="getUserInfo">
      <ul class="user">
        <li class="user__item">
          <label class="label">Website name</label>
          <p class="text">{{ getUserInfo.websiteName }}</p>
        </li>
        <li class="user__item">
          <label class="label">Your name</label>
          <p class="text">{{ getUserInfo.firstName }} {{ getUserInfo.lastName }}</p>
        </li>
        <li class="user__item">
          <label class="label">Your email</label>
          <p class="text">{{ getUserInfo.email }}</p>
        </li>
      </ul>
    </div>
    <div class="floor__pages" v-if="mapPages">
      <p class="text">pages:</p>
      <ul class="pages">
        <li class="pages__item">

        </li>
      </ul>
    </div>
    <div class="floor__notification" v-else>
      <p class="text">There are no pages. Please create a homepage</p>
    </div>
    <layoutSpinner v-if="!getUserInfo"></layoutSpinner>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'factory',
  name: 'factoryDashboard',
  computed: {
    ...mapGetters({
      getUserInfo: 'users/getUserInfo'
    }),
    mapPages () {
      return null
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/clearToken')
      this.$router.push('/factory')
    },
    gotToCreatePage () {
      this.$router.push('/factory/createPage')
    }
  }
}
</script>