<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>我的档案</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<div id="printMe">
			<el-card v-loading='loading' class="box-card">
				<el-table  :data='fileList' border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column label="姓名" prop="name"></el-table-column>
					<el-table-column label="职称" prop="jobTitle"></el-table-column>
					<el-table-column label="性别" prop="gender"></el-table-column>
					<el-table-column label="所在地" prop="region"></el-table-column>
					<!-- <el-table-column label="身份ID" prop="idNumber"></el-table-column> -->
				</el-table>
				<el-table  :data='fileList' border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column label="学历" prop="degree"></el-table-column>
					<el-table-column label="毕业学校" prop="graduateSchool"></el-table-column>
					<el-table-column label="政治面貌" prop="politicalStatus"></el-table-column>
					
				</el-table>
				<el-table  :data='fileList' border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column label="出生日期" prop="birth"></el-table-column>
					<el-table-column label="参加工作时间" prop="entranceDate"></el-table-column>
					<el-table-column label="职称授予时间" prop="grantDate"></el-table-column>
				</el-table>
				<el-table  :data='fileList' border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column label="现属学院" prop="department.name"></el-table-column>
					<el-table-column label="累计授课课时" prop="totalClass"></el-table-column>
				</el-table>
			</el-card>
		</div>
		<el-button class="printButton" v-print='printObj'> 打印 </el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//教师档案列表
				fileList: [],
				//打印参数
				printObj: {
					id: 'printMe',
					popTitle: '教师档案',
					extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
				},
				loading: true,
			}
		},
		created() {
			this.getTeacherFile()
		},
		methods: {
			//获取教师档案
			getTeacherFile() {
				this.$http.get('/teacher/getTeacher')
					.then(res => {
						// console.log(res.data)
						this.fileList = []
						this.fileList.push(res.data)
						this.transFormat()
						this.loading = false
					}).catch(err => {
						console.log(err)
					})
			},
			//格式转换
			transFormat(){
				let gender = this.fileList[0].gender == 0 ? '男':'女' 
				this.fileList[0].gender = gender
				this.fileList[0].birth = this.fileList[0].birth.slice(0, 10)
				this.fileList[0].entranceDate = this.fileList[0].birth.slice(0, 10)
				this.fileList[0].grantDate = this.fileList[0].birth.slice(0, 10)
			}
		}
	}
</script>

<style lang="less" scoped>
	.body {
		margin: 0;
	}
	.el-breadcrumb {
		margin-bottom: 15px;
	}

	#printMe {
		width: 100%;
	}

	.el-card {
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
	}

	.el-table {
		margin-bottom: 15px;
		border: 1px solid #dedede;
		border-radius: 5px;
	}

	.printButton {
		margin-top: 15px;
		margin-left: 50%;
		transform: translate(-50%);
	}
	
	
</style>
