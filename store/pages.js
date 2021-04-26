export const state = () => ({
  homePage: null
})

export const actions = {
  async pageCheck ({}, data) {
    try {
      const result = await this.$axios.$post('/api/db', {
        function: data.function,
        collection: data.collection
      })
      return result
    } catch {
      dispatch('log/setError', error, {root:true})
      this.$router.push('/error')
    }
  },
  setHome ({commit}, data) {
    commit('SET_PAGE', data)
  }
}

export const mutations = {
  SET_PAGE (state, data) {
    state.homePage = data
  }
}

export const getters = {
  getHomePage: (state) => {
    return state.homePage
  }
}