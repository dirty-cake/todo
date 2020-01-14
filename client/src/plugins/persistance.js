export default function (Vue) {
  const observable = Vue.observable(Object.entries(localStorage).reduce((state, [key, value]) => {
    return Object.assign(state, { [key]: value })
  }, {}))

  const persistance = new Proxy(observable, {
    get (target, key, receiver) {
      if (!(key in target)) {
        Vue.set(target, key, undefined)
      }
      return Reflect.get(target, key, receiver)
    },
    set (target, key, value) {
      localStorage.setItem(key, value)
      Vue.set(target, key, value)
      return true
    },
    deleteProperty (target, key) {
      localStorage.removeItem(key)
      Vue.set(target, key, undefined)
      return true
    }
  })

  Vue.persistance = persistance
  Vue.prototype.$persistance = persistance
}
