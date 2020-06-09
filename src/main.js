import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'

//axios请求组件
import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV === 'production'? 'http://localhost:8081':'/api',
axios.defaults.timeout = 5000
Vue.prototype.$http = axios

//md5加密组件
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

//打印组件
import Print from 'vue-print-nb'
Vue.use(Print)

//Echarts图标组件
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/pie'
Vue.component('v-chart', ECharts)

//xss组件
import xss from 'xss'
Vue.prototype.$xss = xss


Vue.config.productionTip = false

const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
