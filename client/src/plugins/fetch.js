export default function (Vue) {
  const $fetch = async (config) => {
    if (config.headers === undefined) {
      config.headers = {}
    }
    config.headers['Authorization'] = Vue.persistance.token
    if (config.body) {
      config.headers['Content-Type'] = 'application/json'
      config.body = JSON.stringify(config.body)
    }
    const response = await fetch(config.url, config)
    if (response.status >= 400) {
      throw new Error(response.statusText)
    }
    return response.json()
  }
  Vue.fetch = $fetch
  Vue.prototype.$fetch = $fetch
}
