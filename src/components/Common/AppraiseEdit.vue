<template>
	<center>
		<div class="topTable">
			<el-table
				:data="tableData"
				border
				style="width: 71%"
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
				  label="行课校区">
				</el-table-column>
			</el-table>
		</div>
		
		<div class="bottomTable">
			<el-table
				:data="commentData"
				border
				style="width: 532px"
				:span-method="objectSpanMethod" >
				<el-table-column
				  prop="num"
				  label="序号"
				  width="100">
				</el-table-column>
				<el-table-column
				  prop="content"
				  label="评价内容"
				  width="270">
				</el-table-column>
				<el-table-column
				  prop="A"
				  label="A"
				  width="40">
				</el-table-column>
				<el-table-column
				  prop="B"
				  label="B"
				  width="40">
				</el-table-column>
				<el-table-column
				  prop="C"
				  label="C"
				  width="40">
				</el-table-column>
				<el-table-column
				  prop="D"
				  label="D"
				  width="40">
				</el-table-column>
			</el-table>
		</div>
	</center>
</template>

<script>
	export default {
		methods: {
			objectSpanMethod({ row, column, rowIndex, columnIndex }) {
				if (columnIndex === 2) {
					if (rowIndex  === 6) {
						return {
							rowspan: 1,
							colspan: 4
						};
					}
				}
				if (columnIndex === 1) {
					if (rowIndex  === 7) {
						return {
							rowspan: 1,
							colspan: 5
						};
					}
				}
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
				}],
				
				commentData: [{
					num: '1',
					content: '讲课思路和概念清楚，容易听懂',
				},{
					num: '2',
					content: '教师上课认真，课堂纪律好'
				},{
					num: '3',
					content: '使用现代化的教学手段'
				},{
					num: '4',
					content: '批改作业认真，辅导答疑热情'
				},{
					num: '5',
					content: '上课不迟到，不提前下课，不随便停课'
				},{
					num: '6',
					content: '教材和辅导材料适用'
				},{
					num: '7',
					content: '总评'
				},{
					num: '建议'
				}]
			}
		},
		
	}
</script>

<style lang="less" scoped>
	.bottomTable {
		margin-top: 20px;
	}
</style>
