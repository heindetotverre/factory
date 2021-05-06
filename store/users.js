export const state = () => ({
  userInfo: null
})

export const actions = {
  clearUser ({commit}) {
    commit('CLEAR_USER')
  },
  async setUserByToken ({dispatch, commit}, token) {
    try {
      const sessionResultByToken = await this.$axios.$post('/api/db', {
        function: 'getSession',
        collection: 'Sessions',
        values: {
          ...token
        }
      })
      if (sessionResultByToken.session) {
        const userResultBySession = await this.$axios.$post('/api/db', {
          function: 'getUserByUserId',
          collection: 'Users',
          values: {
            userId: sessionResultByToken.session.userId
          }
        })
        commit('SET_USER', {
          fetchedUser: {
            ...JSON.parse(userResultBySession.user)
          }
        })
      }
    } catch (error) {
      dispatch('log/setError', error, {root:true})
      this.$router.push('/error')
    }
  }
}

export const mutations = {
  SET_USER (state, data) {
    state.userInfo = {
      userId: data.fetchedUser.UserId,
      email: data.fetchedUser.Email,
      firstName: data.fetchedUser.FirstName,
      lastName: data.fetchedUser.LastName,
      websiteName: data.fetchedUser.WebsiteName,
      unvalidated: data.fetchedUser.Unvalidated,
      accountCreated: data.fetchedUser.Created
    }
  },
  CLEAR_USER (state) {
    state.userInfo = null
  }
}

export const getters = {
  getUserInfo: (state) => {
    return state.userInfo
  }
}