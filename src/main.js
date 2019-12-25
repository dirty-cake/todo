import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Signup from './Signup.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
  { path: '/signup', component: Signup }
]
const router = new VueRouter({
  routes
})

new Vue({
  router
}).$mount('#app')
