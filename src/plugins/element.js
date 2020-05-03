import Vue from 'vue'
import {
	Button,
	Form,
	FormItem,
	Input,
	Tabs,
	TabPane,
	Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
//弹框组件挂载到Vue原型对象上，每个组件可以通过this访问到$message进行弹框提示
Vue.prototype.$message = Message
