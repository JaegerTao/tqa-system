<template>
	<el-container class="home-container">
		<el-header height="10%">
			<div class="header-title">
				<div class="avatar_box">
					<img src="../../assets/image/logoITElite.jpg" alt="" />
				</div>
				<span> 教学质量评估-教师端 </span>
			</div>
			<div class="header-name">
				<span>ID:{{ name + ' '}}</span> <span>您好，老师</span>
				<el-button type="info" @click="logout">退出登录</el-button>
			</div>
		</el-header>
		<el-container class="main-container">
			<!-- 侧边栏 -->
			<el-aside width="15%">
				<!-- 侧边栏菜单 -->
				<el-menu router :default-active="activePath">
					<el-menu-item index="/teacher/filemanager" @click="saveNavState('/teacher/filemanager')">
						<i class="el-icon-menu"></i>
						<span slot="title">我的档案</span>
					</el-menu-item>
					<el-menu-item index="/teacher/teachercourse" @click="saveNavState('/teacher/teachercourse')">
						<i class="el-icon-view"></i>
						<span slot="title">我的课程</span>
					</el-menu-item>
					<el-menu-item index="/teacher/appraise" @click="saveNavState('/teacher/appraise')">
						<i class="el-icon-edit-outline"></i>
						<span slot="title">教师互评</span>
					</el-menu-item>
					<el-menu-item index="/teacher/changepwd" @click="saveNavState('/teacher/changepwd')">
						<i class="el-icon-unlock"></i>
						<span slot="title">修改密码</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<!-- 路由占位符 -->
				<router-view :pathheader="pathheader"></router-view>
			</el-main>
		</el-container>
		<el-footer height="5%">
			<span>Made by Team 4 : JaegerTao</span>
			<span>教师端</span>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				pathheader: '/teacher',
				name: '',
				activePath: '/teacher/filemanager' // 被激活的路由地址
			}
		},
		created() {
			this.getUserinfo()
			this.activePath = window.sessionStorage.getItem('activePath')
			if (!this.activePath) this.activePath = '/teacher/filemanager'
		},
		methods: {
			//获取用户信息
			getUserinfo(){
				this.name = window.sessionStorage.getItem('username')
			},
			// 退出登录
			logout() {
				window.sessionStorage.clear()
				this.$router.push('/login')
			},

			// 保存链接激活状态
			saveNavState(activePath) {
				window.sessionStorage.setItem('activePath', activePath)
				this.activePath = activePath
			}
		}

	}
</script>

<style lang="less" scoped>
	.el-header {
		background-color: #55557f;
		border-radius: 0px 0px 10px 10px;
		box-shadow: 10px 10px 5px #e2e2e2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.header-title {
			display: flex;
			align-items: center;

			span {
				margin-left: 20px;
				font-size: 25px;
				color: #ffffff;
				height: 30px;
				overflow: hidden;
			}
		}

		.header-name {
			align-items: center;

			span {
				font-size: 20px;
				color: #ffffff;
				margin-right: 30px;
				height: 30px;
				overflow: hidden;
			}
		}
	}

	.avatar_box {
		height: 30px;
		width: 30px;
		border: 1px solid #eee;
		border-radius: 50%;
		padding: 10px;
		box-shadow: 0 0 10px #ddd;
		background-color: #FFFFFF;

		img {
			height: 100%;
			width: 100%;
			border-radius: 50%;
			background-color: #eee;
		}
	}

	.el-footer {
		background-color: #55557f;
		border-radius: 5px 5px 0px 0px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row-reverse;

		>span {
			color: #FFFFFF;
		}
	}

	.home-container {
		height: 100%;
	}

	.main-container {
		height: 80%;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.el-aside {
		.el-menu {
			height: 100%;
		}
	}
</style>
