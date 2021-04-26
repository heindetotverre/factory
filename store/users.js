export const state = () => ({
  userInfo: null
})

export const actions = {
  clearUser ({commit}) {
    commit('CLEAR_USER')
  },
  async setUserByToken ({dispatch, commit}, data) {
    try {
      const sessionResult = await this.$axios.$post('/api/db', {
        function: 'getSession',
        collection: 'Sessions',
        values: {
          ...data
        }
      })
      if (sessionResult.session) {
        const userResult = await this.$axios.$post('/api/db', {
          function: 'getUserByUserId',
          collection: 'Users',
          values: {
            userId: sessionResult.session.userId
          }
        })
        commit('SET_USER', {
          initialUserInfo: {
            tokenId: data
          },
          fetchedUser: {
            ...JSON.parse(userResult.user)
          }
        })
      } else {
        dispatch('auth/clearToken', {}, {root:true})
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
      email: data.fetchedUser.Email,
      firstName: data.fetchedUser.FirstName,
      lastName: data.fetchedUser.LastName,
      websiteName: data.fetchedUser.WebsiteName,
      validationStatus: data.fetchedUser.Unvalidated,
      accountCreated: data.fetchedUser.Created
    }
  },
  CLEAR_USER (state) {
    state.userId = null
    state.userInfo = null
  }
}

export const getters = {
  getUserInfo: (state) => {
    return state.userInfo
  }
}