<template>
	<el-container class="home-container">
		<el-header>
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
	}

	.el-footer {
		background-color: #55557f;
	}
	
	.home-container{
		height: 100%;
	}
</style>
