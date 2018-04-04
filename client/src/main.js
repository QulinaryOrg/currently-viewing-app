// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import bootstrap from "bootstrap"
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSocketio from 'vue-socket.io';

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(VueSocketio, "http://localhost:3000");

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
