<template>
	<el-container class="home-container">
		<el-header>
			<div class="header-title">
				<div class="avatar_box">
					<img src="../../assets/image/logoITElite.jpg" alt="" />
				</div>
				<span> 教学质量评估-学生端 </span>
			</div>
			<div class="header-name">
				<span>同学您好，ID:{{ name + ' '}}</span>
				<el-button type="info" @click="changePage">{{ btnTxt }}</el-button>
				<el-button type="info" @click="logout">退出登录</el-button>
			</div>
		</el-header>

		<el-main>
			<!-- 路由占位符 -->
			<router-view :pathheader="pathheader"></router-view>
		</el-main>

		<el-footer height="5%">
			<span>Made by Team 4 : Xixi & JaegerTao <span class="goSearchPage" @click="goSearchPage"> 搜索页</span></span>
			<span>学生端</span>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				pathheader: '/stu',
				name: "",
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
						this.$router.push('/stu/changepwd')
						this.currentPage = 1
						this.btnTxt = '评价列表'
						break
					case 1:
						this.$router.push('/stu/appraise')
						this.currentPage = 0
						this.btnTxt = '修改密码'
						break
					default:
						break
				}
			},
			logout() {
				window.sessionStorage.clear()
				this.$router.push('/login')
			},
			appraise() {
				this.$router.push('/stu/appraise')
			},
			
			//goSearchPage跳转到搜索页
			goSearchPage(){
				// console.log('goSearchPage')
				this.$router.push('/search')
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

		>div {
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
				font-family: 'Courier New', Courier, monospace;
				color: #ffffff;
				height: 30px;
				overflow: hidden;
			}
		}

		.header-name {
			align-items: center;

			>span {
				font-size: 17px;
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
		>div {
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

	.home-container {
		height: 100%;
	}
	
	.goSearchPage{
		font-size: 15px;
		color: #bcbcbc;
		text-decoration: underline;
		cursor: pointer;
	}
</style>
