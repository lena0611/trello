export default function ({ store, route, redirect, error }) {
  if (route.name !== 'login' && !store.state.authUser) {
    return redirect('/login')
  }
}
