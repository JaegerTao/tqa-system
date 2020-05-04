import Vue from 'vue'
import {
	Button,
	Form,
	FormItem,
	Input,
	Message,
	Container,
	Header,
	Main,
	Footer,
	Table,
	Aside,
	Menu,
	Submenu,
	MenuItemGroup,
	MenuItem
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Table)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
//弹框组件挂载到Vue原型对象上，每个组件可以通过this访问到$message进行弹框提示
Vue.prototype.$message = Message
