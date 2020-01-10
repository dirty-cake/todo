import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VInput from '@/components/VInput.vue'
import VButton from '@/components/VButton.vue'
import VCollapse from '@/components/VCollapse.vue'
import VDatePicker from '@/components/VDatePicker.vue'
import VSlider from '@/components/VSlider.vue'

import PersistancePlugin from '@/plugins/persistance.js'

Vue.config.productionTip = false

Vue.component(VInput.name, VInput)
Vue.component(VButton.name, VButton)
Vue.component(VCollapse.name, VCollapse)
Vue.component(VDatePicker.name, VDatePicker)
Vue.component(VSlider.name, VSlider)

Vue.use(PersistancePlugin)

const app = new Vue({
  router,
  render: h => h(App)
})

app.$mount('#app')
