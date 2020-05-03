import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import StuHome from '../views/StudentHome/StuHome.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/', redirect: Login},
	{ path: '/login', component: Login},
	{ path: '/stuhome', component: StuHome }
]

const router = new VueRouter({
	routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
	//to 将要访问的路径
	//from 从哪个路径跳转而来
	//next 是一个函数，表示放行 next()放行、next('/login') 强制跳转
	if(to.path === '/login') return next(); //登录页直接放行
	//获取token
	const tokenStr = window.sessionStorage.getItem('token');
	if(!tokenStr) return next('/login');
	next();
})

export default router
