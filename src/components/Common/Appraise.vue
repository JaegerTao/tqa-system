<template>
	<div>
		<center>可评价列表</center>
		<el-table
			:data="tableData"
			style="width: 90%"
			:row-class-name="tableRowClassName" >
			<el-table-column
			  prop="plan"
			  label="执行计划"
			  width="100">
			</el-table-column>
			<el-table-column
			  prop="college"
			  label="学院"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="classType"
			  label="课程类型"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="classCategory"
			  label="课程类别"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="classCode"
			  label="课程代码"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="className"
			  label="课程名称"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="teacher"
			  label="任课教师"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="classNum"
			  label="教学班号"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="campus"
			  label="行课校区"
			  width="120">
			</el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				width="180">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="comments"> 评价 </el-button>
				</template>
			</el-table-column>
		</el-table>
	
	</div>
</template>

<script>
	export default {
		methods: {
			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 1) {
				  return 'warning-row';
				} else if (rowIndex === 3) {
				  return 'success-row';
				}
				return '';
			},
			comments() {
				this.$router.push('/appraiseedit');
			}
		},
		data() {
			return {
				tableData: [{
					plan: '201901',
					college: '计算机科学学院',
					classType: '理论课',
					classCategory: '实践教学环节',
					classCode: '191049',
					className: '软件工程',
					teacher: '001-李四',
					classNum: '20171104',
					campus: '成龙校区',
				}, {
				  plan: '201902',
				  college: '计算机科学学院',
				  classType: '理论课',
				  classCategory: '实践教学环节',
				  classCode: '191059',
				  className: 'c语言',
				  teacher: '001-李四',
				  classNum: '20171104',
				  campus: '成龙校区',
				}]
			}
		},
		
	};
</script>

<style>
	center {
		font-size: 20px;
		padding: 20px;
	}
	
	.el-table .warning-row {
		background: oldlace;
	}
	
	.el-table .success-row {
		background: #f0f9eb;
	}
</style>
