<template>
  <div class="factory factory__dashboard dashboard">
    <h1>Welcome at the factory dashboard</h1>
    <uiButton @click="logout"
      setClasses="button button--sec">Logout</uiButton>
    <uiButton @click="gotToCreatePage"
      setClasses="button button--prim">Create page</uiButton>
    <uiButton @click="goToHome"
      v-if="getHomePage"
      setClasses="button button--sec">Go to home</uiButton>
    <div class="dashboard__user" v-if="getUserInfo">
      <ul class="user">
        <li class="user__item">
          <label class="label">Website name</label>
          <p class="value">{{ getUserInfo.websiteName }}</p>
        </li>
        <li class="user__item">
          <label class="label">Your name</label>
          <p class="value">{{ getUserInfo.firstName }} {{ getUserInfo.lastName }}</p>
        </li>
        <li class="user__item">
          <label class="label">Your email</label>
          <p class="value">{{ getUserInfo.email }}</p>
        </li>
      </ul>
    </div>
    <div class="dashboard__pages" v-if="mapPages">
      <p class="text">pages:</p>
      <ul class="pages">
        <li class="pages__item">

        </li>
      </ul>
    </div>
    <div class="dashboard__notification" v-else>
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
      getHomePage: 'pages/getHomePage',
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
    },
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>