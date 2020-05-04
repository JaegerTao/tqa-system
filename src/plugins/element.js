import Vue from 'vue'
import {
	Button,
	Form,
	FormItem,
	Input,
	Tabs,
	TabPane,
	Message,
	Container,
	Header,
	Main,
	Footer,
	Table
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Table)
//弹框组件挂载到Vue原型对象上，每个组件可以通过this访问到$message进行弹框提示
Vue.prototype.$message = Message
