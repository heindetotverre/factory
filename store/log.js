export const state = () => ({
  logList: []
})

export const actions = {
  setError ({commit}, error) {
    commit('SET_ERROR', error)
  }
}

export const mutations = {
  SET_ERROR(state, error) {
    state.logList.push({type:'error', ...error, error})
  }
}

export const getters = {
  getErrors: (state) => {
    return state.logList.filter(l => {
      return l.type === 'error'
    })
  }
}