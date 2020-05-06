import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV === 'production'? 'http://loacalhost:8080':'/api'

import md5 from 'js-md5'

Vue.prototype.$http = axios

Vue.prototype.$md5 = md5

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
