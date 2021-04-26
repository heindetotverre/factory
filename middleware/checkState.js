export default async ({store, redirect, req}) => {
  try {
    const result = await store.dispatch('pages/pageCheck', {
      function: 'pageCheck',
      collection: 'Pages'
    })
    if (result.action === 'redirect') {
      await store.dispatch('auth/checkToken', req)
      const token = store.getters['auth/readToken']
      if (token) {
        redirect('/factory/dashboard')
      } else {
        redirect({ name: 'factory', params: { slug: 'homePage' } })
      }
    }
    if (result.page) {
      store.dispatch('pages/setHome', result)
    }
  } catch (error) {
    store.dispatch('log/setError', error)
    redirect('/error')
  }
}