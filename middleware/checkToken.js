export default async ({store, req, route, redirect}) => {
  await store.dispatch('auth/checkToken', req)
  const token = store.getters['auth/readToken']
  if (!token && route.name !== 'factory') {
    redirect('/factory')
  }
  if (token && route.name === 'factory') {
    redirect('/factory/floor')
  }
}