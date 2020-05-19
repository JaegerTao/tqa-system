<template>
	<el-container class="home-container">
		<el-header>
			<div class="header-title">
				<div class="avatar_box">
					<img src="../../assets/image/logoITElite.jpg" alt="" />
				</div>
				<span> 教学质量评估-教学督导 </span>
			</div>
			<div class="header-name">
				<span>您好，{{ name }}老师</span>
				<el-button type="info" @click="changePage">{{btnTxt}}</el-button>
				<el-button type="info" @click="logout">退出登录</el-button>
			</div>
		</el-header>

		<el-main>
			<!-- 路由占位符 -->
			<router-view :pathheader="pathheader"></router-view>
		</el-main>

		<el-footer height="5%">
			<span>Made by Team 4 : JaegerTao</span>
			<span>督导端</span>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				pathheader: '/spv',
				name : "",
				btnTxt: '修改密码',
				currentPage: 0,
			}
		},
		created() {
			this.getUserinfo()
		},
		methods: {
			//获取用户信息
			getUserinfo() {
				this.name = window.sessionStorage.getItem('username')
			},
			//切换页面
			changePage() {
				switch(this.currentPage){
					case 0:
						this.$router.push('/spv/changepwd')
						this.currentPage = 1
						this.btnTxt = '评价列表'
						break
					case 1:
						this.$router.push('/spv/appraise')
						this.currentPage = 0
						this.btnTxt = '修改密码'
						break
					default:
						break
				}
			},
			logout() {
				window.sessionStorage.clear();
				this.$router.push('/login');
			},
			appraise() {
				this.$router.push('/spv/appraise');
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
			button {
				margin-left: 20px;
			}
		}
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
			> span {
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

	.el-main {

		> div {

			center {
				font-size: 20px;
			}
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

	.home-container{
		height: 100%;
	}
</style>
