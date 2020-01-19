import Vue from 'vue'
import VueRouter from 'vue-router'
import ToDo from './views/ToDo.vue'
import Signin from './views/Signin.vue'
import Signup from './views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'todo',
    component: ToDo,
    beforeEnter (to, from, next) {
      if (Vue.persistance.token) {
        return next()
      } else {
        return next({ name: 'signin' })
      }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    beforeEnter (to, from, next) {
      if (!Vue.persistance.token) {
        return next()
      } else {
        return next({ name: 'todo' })
      }
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    beforeEnter (to, from, next) {
      if (!Vue.persistance.token) {
        return next()
      } else {
        return next({ name: 'todo' })
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
