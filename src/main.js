import Vue from 'vue'
import vueRouter from 'vue-router'
import router from './routers/rootRouters.js'
import App from './App.vue'
import axios from './http'
// import $ from 'jquery'


import '../node_modules/bootstrap/dist/css/bootstrap.css'


Vue.use(vueRouter);
Vue.prototype.$axios=axios;

new Vue({
    el: '#app',
    router,
    render : h => h(App)
  })