export const state = () => ({
  homePage: null
})

export const actions = {
  async pageCheck ({dispatch}, data) {
    try {
      const result = await this.$axios.$post('/api/db', {
        ...data
      })
      return result
    } catch {
      dispatch('log/setError', error, {root:true})
      this.$router.push('/error')
    }
  },
  async createPage ({dispatch}, data) {
    try {
      const result = await this.$axios.$post('/api/db', {
        ...data
      })
      return result
    } catch (error) {
      dispatch('log/setError', error, {root:true})
      return {...error}
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