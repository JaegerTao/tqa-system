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
	Aside,
	Menu,
	Submenu,
	MenuItemGroup,
	MenuItem,
	Breadcrumb,
	BreadcrumbItem,
	Card,
	Table,
	TableColumn,
	Pagination,
	Tabs,
	TabPane,
	Row,
	Col,
	Radio,
	RadioGroup,
	RadioButton,
	Loading,
	MessageBox,
	Autocomplete,
	DatePicker,
	InfiniteScroll,
	Avatar
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Loading)
Vue.use(Autocomplete)
Vue.use(DatePicker)
Vue.use(InfiniteScroll)
Vue.use(Avatar)
// 弹框组件挂载到Vue原型对象上，每个组件可以通过this访问到$message进行弹框提示
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
