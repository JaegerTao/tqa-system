import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
//学生端路由
import StuHome from '../views/StudentHome/StuHome.vue'
//教师端路由
import TeacherHome from '../views/TeacherHome/TeacherHome.vue'
import FileManage from '../components/Teacher/FileManage.vue'//档案查看
import TeacherCourse from '../components/Teacher/TeacherCourse.vue'//教师查看自己的评价结果
//可公用路由
import Appraise from '../components/Common/Appraise.vue'//评价列表
import ChangePwd from '../components/Common/ChangePwd.vue'//修改密码

Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: Login
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/stuhome',
		component: StuHome
	},
	{
		path: '/teacherhome',
		component: TeacherHome,
		redirect: '/filemanager',
		children: [{
			path: '/filemanager',
			component: FileManage
		},{
			path: '/teachercourse',
			component: TeacherCourse
		},{
			path: '/appraise',
			component: Appraise
		},{
			path: '/changepwd',
			component: ChangePwd
		}]
	}
]

const router = new VueRouter({
	routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
	//to 将要访问的路径
	//from 从哪个路径跳转而来
	//next 是一个函数，表示放行 next()放行、next('/login') 强制跳转
	if (to.path === '/login') return next(); //登录页直接放行
	//获取token
	const tokenStr = window.sessionStorage.getItem('token');
	if (!tokenStr) return next('/login');
	next();
})

export default router
