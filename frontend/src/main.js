// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuex from 'vuex';
import store from './store'
import axios from './http'
import './permission'

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$axios = axios;


Vue.use(vuex);

// Vue.prototype.$axios = Axios 
// Axios.defaults.baseURL = 'http://127.0.0.1:8000/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
