import axios from '~/plugins/axios'

export const state = () => ({
  token: null,
  user: null,
  logged_in: false,
  del: false
})

export const mutations = {
  set (state, token) {
    state.token = token
  },
  setUser (state, user) {
    state.user = user
    state.logged_in = Boolean(user)
  },
  remove (state) {
    state.session_key = null
  },
  setDel(state, s){
    state.del = s
  }
}

export const actions = {
  async load ({commit, dispatch}, token) {
    commit('set', token)
    await dispatch('validate')
  },
  async login ({commit}, param) {
    commit('set', param.token)
    commit('setUser', param.user)
  },
  async logout({commit, state}) {
    try{
      const r = await this.$axios.delete('auth/sign_out', {
        headers: {
          'x-api-key': state.token
        }
      })
    }catch(e){
      this.$sentry.captureException(e)
    }
    await commit('set', null)
    await commit('setUser', null)
  },
  async validate ({commit, state}) {
    try {
      const r = await this.$axios.get('auth/validate_token', {
        headers: {
          'x-api-key': state.token
        }
      })
      if(r.status != 200){
        throw new Error("invalid token")
      }
      const d = r.data.data
      if(d.id===undefined||d.icon_str===undefined||d.name===undefined){
        throw new Error("invalid userData " + JSON.stringify(d))
      }
      await commit('setUser', d)
    } catch(e) {
      await commit('remove')
      await commit('setUser', null)
      await commit('setDel', true)
      this.$sentry.captureException(e)
    }
  },
  async reset ({commit}){
    await commit('remove')
    await commit('setUser', null)
    await commit('setDel', false)
  }
}
