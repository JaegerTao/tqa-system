<template>
	<el-container class="home-container">
		<el-header>
			<div>
				<div class="avatar_box">
					<img src="../../assets/image/logoITElite.jpg" alt="" />
				</div>
				<span> 教学质量评估管理系统学生端 </span>
			</div>
			<el-button type="info" >修改密码</el-button>
			<el-button type="info" @click="logout">退出</el-button>
		</el-header>
		
		<el-main>
			<el-button type="info" @click="returnHome">返回首页</el-button>
			<el-table
				:data="tableData"
				style="width: 20%"
				:row-class-name="tableRowClassName" >
				<el-table-column
				  prop="date"
				  label="日期"
				  width="180">
				</el-table-column>
				<el-table-column
				  prop="name"
				  label="姓名"
				  width="180">
				</el-table-column>
				<el-table-column
				  prop="address"
				  label="地址">
				</el-table-column>
			</el-table>
		</el-main>
		
		<el-footer>
			
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		methods: {
			logout() {
				window.sessionStorage.clear();
				this.$router.push('/login');
			},
			returnHome() {
				this.$router.push('/StuHome');
			},
			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 1) {
				  return 'warning-row';
				} else if (rowIndex === 3) {
				  return 'success-row';
				}
				return '';
			}
		},
		data() {
		  return {
			tableData: [{
			  date: '2016-05-02',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄',
			}, {
			  date: '2016-05-04',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  date: '2016-05-01',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄',
			}, {
			  date: '2016-05-03',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}]
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
	
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
	
	.el-footer {
		background-color: #55557f;
	}
	
	.home-container{
		height: 100%;
	}
</style>
