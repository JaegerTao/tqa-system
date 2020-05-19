import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
// 学生端路由
import StuHome from '../views/StudentHome/StuHome.vue'

// 教师端路由
import TeacherHome from '../views/TeacherHome/TeacherHome.vue'
import FileManage from '../components/Teacher/FileManage.vue' // 档案查看
import TeacherCourse from '../components/Teacher/TeacherCourse.vue' // 教师查看自己的评价结果列表
import TeacherCourseCheck from '../components/Teacher/TeacherCourseCheck.vue' //教师查看评价结果
import TeacherAdvice from '../components/Teacher/TeacherAdvice.vue' // 教师查看评价建议

// 督导路由
import SupervisorHome from '../views/SupervisorHome/SupervisorHome.vue'

// 可公用路由
import Appraise from '../components/Common/Appraise.vue' // 评价列表
import ChangePwd from '../components/Common/ChangePwd.vue' // 修改密码
import AppraiseEdit from '../components/Common/AppraiseEdit.vue' // 评价详情页面
import ForgetPwd from '../components/Common/ForgetPwd.vue' //忘记密码
import RoleErr from '../components/Common/RoleErr.vue' //用户角色访问非权限的提示页面

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
		path: '/initpwd',
		component: ForgetPwd
	},
	{
		path: '/roleerr',
		component: RoleErr
	},
	{//学生页面路由
		path: '/stuhome',
		component: StuHome,
		redirect: '/stu/appraise',
		children: [{
			path: '/stu/appraise',
			name: 'StuAppraise',
			component: Appraise
		}, {
			path: '/stu/changepwd',
			component: ChangePwd
		}, {
			path: '/stu/appraiseedit',
			name: 'StuAppraiseEdit',
			component: AppraiseEdit
		}]
	},
	{//教师页面路由
		path: '/teacherhome',
		component: TeacherHome,
		redirect: '/teacher/filemanager',
		children: [{
			path: '/teacher/filemanager',
			component: FileManage
		}, {
			path: '/teacher/teachercourse',
			component: TeacherCourse
		}, {
			path: '/teacher/teachercoursecheck',
			component: TeacherCourseCheck
		}, {
			path: '/teacher/teacheradvice',
			component: TeacherAdvice
		}, {
			path: '/teacher/appraise',
			name: 'TeacherAppraise',
			component: Appraise
		}, {
			path: '/teacher/appraiseedit',
			name: 'TeacherAppraiseEdit',
			component: AppraiseEdit
		}, {
			path: '/teacher/changepwd',
			component: ChangePwd
		}]
	}, 
	{//督导页面路由
		path: '/spvhome',
		component: SupervisorHome,
		redirect: '/spv/appraise',
		children: [{
			path: '/spv/appraise',
			name: 'SpvAppraise',
			component: Appraise
		}, {
			path: '/spv/changepwd',
			component: ChangePwd
		}, {
			path: '/spv/appraiseedit',
			name: 'SpvAppraiseEdit',
			component: AppraiseEdit
		}]
	}
]

const router = new VueRouter({
	routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
	// to 将要访问的路径
	// from 从哪个路径跳转而来
	// next 是一个函数，表示放行 next()放行、next('/login') 强制跳转
	if (to.path === '/login' || to.path === '/initpwd') return next() // 登录页直接放行
	// 获取token
	const tokenStr = window.sessionStorage.getItem('token')
	if (!tokenStr) return next('/login')
	//不同角色访问守卫
	
	return next()
})

export default router
