<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>我的档案</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<div id="printMe">
		<el-card class="box-card" >
			<el-table :data='fileList' border>
				<el-table-column label="姓名" prop="name"></el-table-column>
				<el-table-column label="工号" prop="username"></el-table-column>
				<el-table-column label="性别" prop="gender"></el-table-column>
				<el-table-column label="工作时间" prop="worktime"></el-table-column>
			</el-table>
			<el-table :data='fileList' border>
				<el-table-column label="出生日期" prop="birthday"></el-table-column>
				<el-table-column label="身份证号" prop="personid"></el-table-column>
			</el-table>
			<el-table :data='fileList' border>
				<el-table-column label="学历" prop="education"></el-table-column>
				<el-table-column label="毕业学校" prop="graduate"></el-table-column>
				<el-table-column label="政治面貌" prop="political"></el-table-column>
				<el-table-column label="职称" prop="job"></el-table-column>
			</el-table>
			<el-table :data='fileList' border>
				<el-table-column label="职称授予时间" prop="jobtime"></el-table-column>
				<el-table-column label="累计授课时间" prop="teachtime"></el-table-column>
			</el-table>
		</el-card>
		</div>
		<el-button class="printButton" v-print='printObj'> 打印 </el-button>
	</div>
</template>

<script>
export default {
  data () {
    return {
      fileList: [{
        name: '蒋滔',
        username: '2017110414',
        gender: '男',
        worktime: '20171104',
        birthday: '19980220',
        personid: '510603199802201510',
        education: '本科',
        graduate: '四川师范大学',
        political: '党员',
        job: '教授',
        jobtime: '20171104',
        teachtime: '50'
      }],
	  printObj: {
		  id:'printMe',
		  popTitle: '教师档案',
		  extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
	  }
    }
  }
}
</script>

<style lang="less" scoped>
	.el-breadcrumb {
		margin-bottom: 15px;
	}
	
	#printMe{
		width: 100%;
	}
	.el-card {
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
	}
	.el-table{
		margin-bottom: 15px;
		border: 1px solid #dedede;
		border-radius: 5px;
	}
	
	.printButton {
		margin-top: 30px;
		margin-left: 50%;
		transform: translate(-50%);
	}
</style>
