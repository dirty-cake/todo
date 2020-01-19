export default function (Vue) {
  const $fetch = async (url, config) => {
    if (config.headers === undefined) {
      config.headers = {}
    }
    if (Vue.persistance.token) {
      config.headers['Authorization'] = Vue.persistance.token
    }
    if (config.body) {
      config.headers['Content-Type'] = 'application/json'
      config.body = JSON.stringify(config.body)
    }
    const response = await fetch(`http://localhost:3000${url}`, config)
    if (response.status >= 200 && response.status < 300) {
      if (response.headers.get('Content-Type') && response.headers.get('Content-Type').startsWith('application/json')) {
        return response.json()
      } else {
        return null
      }
    }
    throw new Error(response.statusText)
  }
  Vue.fetch = $fetch
  Vue.prototype.$fetch = $fetch
}
