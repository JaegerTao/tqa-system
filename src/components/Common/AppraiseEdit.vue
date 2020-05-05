<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{path: '/teacher/appraise' }">可评价列表</el-breadcrumb-item>
			<el-breadcrumb-item>课程评价</el-breadcrumb-item>
		</el-breadcrumb>
		<el-table class="table-classinfo" :data="tableData" border style="width: 90%" size="mini" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
			<el-table-column prop="plan" label="执行计划">
			</el-table-column>
			<el-table-column prop="college" label="学院">
			</el-table-column>
			<el-table-column prop="classType" label="课程类型">
			</el-table-column>
			<el-table-column prop="classCategory" label="课程类别">
			</el-table-column>
			<el-table-column prop="classCode" label="课程代码">
			</el-table-column>
			<el-table-column prop="className" label="课程名称">
			</el-table-column>
			<el-table-column prop="teacher" label="任课教师">
			</el-table-column>
			<el-table-column prop="classNum" label="教学班号">
			</el-table-column>
			<el-table-column prop="campus" label="行课校区">
			</el-table-column>
		</el-table>

		<el-card>
			<el-table class="table-appraise" :data="commentData" border style="width: 55%" :span-method="objectSpanMethod" :header-cell-style="{'text-align':'center'}"
			 :cell-style="{'text-align':'center'}" size='mini'>
				<el-table-column prop="num" label="序号" width="60">
				</el-table-column>
				<el-table-column prop="content" label="评价内容" width="200">
				</el-table-column>
				<el-table-column prop="A" label="A.非常符合">
				</el-table-column>
				<el-table-column prop="B" label="B.比较符合">
				</el-table-column>
				<el-table-column prop="C" label="C.不符合">
				</el-table-column>
				<el-table-column prop="D" label="D.完全不符">
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	export default {
		methods: {
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (columnIndex === 1) {
					if (rowIndex === 7) {
						return {
							rowspan: 1,
							colspan: 1
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
				}, {
					num: '2',
					content: '教师上课认真，课堂纪律好'
				}, {
					num: '3',
					content: '使用现代化的教学手段'
				}, {
					num: '4',
					content: '批改作业认真，辅导答疑热情'
				}, {
					num: '5',
					content: '上课不迟到，不提前下课，不随便停课'
				}, {
					num: '6',
					content: '教材和辅导材料适用'
				}]
			}
		},

	}
</script>

<style lang="less" scoped>
	.table-classinfo{
		margin-left: 50%;
		transform: translate(-50%);
	}
	.table-appraise{
		margin-left: 50%;
		transform: translate(-50%);
	}
</style>
