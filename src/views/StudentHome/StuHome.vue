<template>
	<div>
		<el-button type="info" @click="logout">退出</el-button>
		
	</div>
	
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

<el-container>
		<el-header>Header</el-header>
		<el-main>Main</el-main>
		<el-footer>Footer</el-footer>
	</el-container>

<style lang="less" scoped>
	.el-header, .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
	
	body > .el-container {
		margin-bottom: 40px;
	}
	  
</style>
