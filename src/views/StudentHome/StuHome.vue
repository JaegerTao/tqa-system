<template>
	<el-container class="home-container">
		<el-header>
			<div>
				<div class="avatar_box">
					<img src="../../assets/image/logoITElite.jpg" alt="" />
				</div>
				<span> 教学质量评估管理系统-学生端 </span>
				<center>
					<el-button type="info" @click="returnHome">返回学生端首页</el-button>
				</center>
			</div>
			<div class="header-name">
				<span>您好，{{ name }}同学</span>
				<el-button type="info" @click="changePwd">修改密码</el-button>
				<el-button type="info" @click="logout">退出登录</el-button>
			</div>
		</el-header>

		<el-main>
			<!-- 路由占位符 -->
			<router-view></router-view>
		</el-main>

		<el-footer>
			<center> 软件工程 </center>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		methods: {
			returnHome() {
				this.$router.push('/stuhome');
			},
			changePwd() {
				this.$router.push('/changepwd');
			},
			logout() {
				window.sessionStorage.clear();
				this.$router.push('/login');
			},
			appraise() {
				this.$router.push('/appraise');
			}
		},
		data() {
			return {
				name : "蒋滔",
			}
		},
		
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
		> div{
			display: flex;
			align-items: center;
			span{
				margin-left: 20px;
				font-size: 28px;
				color: #ffffff;
			}
			button {
				margin-left: 20px;
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

	.el-main {

		> div {

			center {
				font-size: 20px;
			}
		}
	}

	.el-footer {
		background-color: #55557f;
	}

	.home-container{
		height: 100%;
	}
</style>
