import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

import './assets/css/base-1.1.css'


Vue.config.productionTip = false

Vue.use(ElementUI)


Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
