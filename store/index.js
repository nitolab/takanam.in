import Cookie from 'cookie'

export const actions = {
  nuxtServerInit: async function({dispatch, state}, {req, res}) {
    const cookies = Cookie.parse(req.headers.cookie||'')
    const token = cookies['_session'] || ''
    if(token) {
      await dispatch('session/load', token)
      if(state.session.del) {
        res.setHeader('Set-Cookie','_session=; Max-Age=0')
        dispatch('session/reset')
      }
    }
    const r18 = cookies['_r18'] || false
    if(r18) dispatch('r18/set', r18)
  }
}
