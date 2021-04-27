import {uuidv4} from '@/plugins/uuid.js'
import cookie from 'js-cookie'
import bcrypt from 'bcryptjs'

export const state = () => ({
  token: null
})

export const actions = {
  async auth ({dispatch}, data) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(data.values.Password, salt)
    const makeToken = uuidv4
    try {
      if (data.form === 'FactoryAuth') {
        const result = await this.$axios.$post('/api/db', {
          function: 'login',
          collection: 'Users',
          values: {
            ...data.values,
            Password: hash
          }
        })
        if (!result.authorized || (result.hash && !bcrypt.compareSync(data.values.Password, result.hash))) {
          return {
            function: 'login',
            message: 'Login was unsuccesfull',
            authorized: false
          }
        } else {
          const token = {
            tokenId: makeToken(),
            expires: new Date().getTime() + 3600000
          }
          const userResult = await this.$axios.$post('/api/db', {
            function: 'getUser',
            collection: 'Users',
            values: {
              email: data.values.Email
            }
          })
          if (userResult) {
            const fetchedUser = JSON.parse(userResult.user)
            await this.$axios.$post('/api/db', {
              function: 'setSession',
              collection: 'Sessions',
              values: {
                ...token,
                userId: fetchedUser.UserId
              }
            })
            dispatch('storeToken', token)
          }
          return {
            ...result,
            authorized: true
          }
        }
      } 
      if (data.form === 'FactoryRegister') {
        const result = await this.$axios.$post('/api/db', {
          function: 'register',
          collection: 'Users',
          values: {
            ...data.values,
            Password: hash,
            UserId: makeToken()
          }
        })
        if (result) {
          dispatch('auth', {
            form: 'FactoryAuth',
            values: {
              Email: data.values.Email,
              Password: hash
            },
            source: 'register'
          })
        }
        return result
      }
    } catch (error) {
      dispatch('log/setError', error, {root:true})
      this.$router.push('/error')
    }
  },
  storeToken({commit}, data) {
    console.log()
    cookie.set('factoryToken', data)
    commit('STORE_TOKEN', data)
  },
  clearToken({commit, dispatch}) {
    dispatch('users/clearUser', {}, {root:true})
    cookie.remove('factoryToken')
    commit('CLEAR_TOKEN')
  },
  checkToken({dispatch}, req) {
    try {
      let token = ''
      if (req && req.headers.cookie) {
        token = JSON.parse(decodeURIComponent(
          req.headers.cookie.split(';')
          .find(c => c.trim().startsWith('factoryToken'))
          .split('=')[1]
        ))
      } 
      if (cookie.get('factoryToken')) {
        token = JSON.parse(decodeURIComponent(cookie.get('factoryToken')))
      }
      if (token) {
        const now = new Date().getTime()
        if (token.expires < now) {
          dispatch('clearToken')
          return
        } else {
          dispatch('users/setUserByToken', token, {root:true})
          dispatch('storeToken', {
            ...token,
            expires: (new Date().getTime() + 3600000)
          })
        }
        return token
      }
    } catch (error) {
      dispatch('log/setError', error, {root:true})
      this.$router.push('/error')
    }
  }
}

export const mutations = {
  STORE_TOKEN (state, data) {
    state.token = data
  },
  CLEAR_TOKEN(state) {
    state.token = null
  }
}

export const getters = {
  readToken: (state) => {
    return state.token
  }
}