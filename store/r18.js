import Cookies from 'js-cookie'

export const state = () => ({
  enable: false
})

export const mutations = {
  ch(state, s) {
    state.enable = s
  }
}

export const actions = {
  set({commit}, s) {
    commit('ch', s)
    if(process.client){
      if(s) Cookies.set('_r18', true, { expires: 7 })
      else Cookies.set('_r18', false, { expires: 7 })
    }
  }
}
