import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@@/icons'
import './permission'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, {
  size: 'small'
})

if (process.env.NODE_ENV === 'local') {
  require('./mock')
}

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
