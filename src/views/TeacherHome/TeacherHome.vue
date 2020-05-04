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
				<span>您好，{{ name }}老师</span>
				<el-button type="info" @click="logout">退出登录</el-button>
			</div>
		</el-header>
		<el-container class="main-container">
			<!-- 侧边栏 -->
			<el-aside>
				<!-- 侧边栏菜单 -->
				<el-menu router="true" default-active="/filemanager">
					<el-menu-item index="/filemanager">
						<i class="el-icon-menu"></i>
						<span slot="title">档案管理</span>
					</el-menu-item>
					<el-menu-item index="/teachercourse">
						<i class="el-icon-view"></i>
						<span slot="title">我的课程</span>
					</el-menu-item>
					<el-menu-item index="/appraise">
						<i class="el-icon-edit-outline"></i>
						<span slot="title">教师互评</span>
					</el-menu-item>
					<el-menu-item index="/changepwd">
						<i class="el-icon-unlock"></i>
						<span slot="title">修改密码</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<!-- 路由占位符 -->
				<router-view></router-view>
			</el-main>
		</el-container>
		<el-footer height="10%">Footer</el-footer>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				name: "蒋滔",
			}
		},
		methods: {
			logout() {
				window.sessionStorage.clear();
				this.$router.push('/login');
			}
		}
	};
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
	}

	.home-container {
		height: 100%;
	}

	.main-container {
		height: 80%;
		margin-top: 10px;
		margin-bottom: 10px;

		>el-aside {
			border-right: 1px solid #d6d6d6;
			width: 15%;
		}
	}
</style>
