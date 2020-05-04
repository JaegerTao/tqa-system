<template>
	<el-container class="home-container">
		<el-header>
			<div>
				<div class="avatar_box">
					<img src="../../assets/image/logoITElite.jpg" alt="" />
				</div>
				<span> 教学质量评估管理系统教师端 </span>
			</div>
			<el-button type="info" @click="logout">退出</el-button>
		</el-header>
		<el-main>Main</el-main>
		<el-footer>Footer</el-footer>
	</el-container>
</template>

<script>
	export default {
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
		> div{
			display: flex;
			align-items: center;
			span{
				margin-left: 20px;
				font-size: 28px;
				color: #ffffff;
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
	
	.home-container{
		height: 100%;
	}
</style>
