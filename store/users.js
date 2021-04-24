export const state = () => ({
  activeUser: null
})

export const actions = {
  async setUser ({dispatch, commit}, initialUserInfo) {
    try {
      const userResult = await this.$axios.$post('/api/db', {
        function: 'getUser',
        collection: 'Users',
        values: {
          email: initialUserInfo.email
        }
      })
      if (userResult) {
        const fetchedUser = JSON.parse(userResult.user)
        await this.$axios.$post('/api/db', {
          function: 'setSession',
          collection: 'Sessions',
          values: {
            userId: fetchedUser.UserId,
            tokenId: initialUserInfo.tokenId,
            tokenExpires: initialUserInfo.expires
          }
        })
        commit('SET_USER', {initialUserInfo, fetchedUser})
      }
    } catch (error) {
      dispatch('log/setError', error, {root:true})
      this.$router.push('/error')
    }
  },
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
      }
    } catch (error) {
      dispatch('log/setError', error, {root:true})
      this.$router.push('/error')
    }
  }
}

export const mutations = {
  SET_USER (state, data) {
    state.activeUser = {
      userId: data.fetchedUser.UserId,
      userInfo: {
        firstName: data.fetchedUser.FirstName,
        lastName: data.fetchedUser.LastName,
        validationStatus: data.fetchedUser.Unvalidated,
        accountCreated: data.fetchedUser.Created
      },
      tokenId: data.initialUserInfo.tokenId
    }
  },
  CLEAR_USER (state) {
    state.activeUser = null
  }
}

export const getters = {
  getUser: (state) => {
    return state.activeUser
  }
}