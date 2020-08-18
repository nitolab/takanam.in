
export default async ({ store, redirect }) => {
  // console.log("-session middleware async start")
  if (!store.state.session.token||!store.state.session.logged_in) {
    redirect('/login')
  }
  // console.log("-session middleware async end")
}
