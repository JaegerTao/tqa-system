<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>我的课程</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/teacher/teachercourse' }">课程列表</el-breadcrumb-item>
			<el-breadcrumb-item>评价详情</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-table class="table-classinfo" :data="tableData" border style="width: 90%" size="mini" :header-cell-style="{'text-align':'center'}"
		 :cell-style="{'text-align':'center'}">
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
		
		<el-tabs v-model="activeName" type="border-card">
			<el-tab-pane label="学生评价" name="stuappraise">
				<el-table :data="appraiseList" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column type="index" fixed="left"></el-table-column>
					<el-table-column prop="content" label="评价内容" width="600">
					</el-table-column>
					<el-table-column label="评价选项人数">
						<el-table-column prop="numA" label="A.完全符合">
						</el-table-column>
						<el-table-column prop="numB" label="B.很符合">
						</el-table-column>
						<el-table-column prop="numC" label="C.基本符合">
						</el-table-column>
						<el-table-column prop="numD" label="D.不符合">
						</el-table-column>
					</el-table-column>
				</el-table>
				<el-row>
					<el-col :span="14">
						<el-button type="info" @click='goAdvice'>查看建议</el-button>
					</el-col>
					<el-col :span="10">
						<div class="sumscore">总分：{{ totalScore }}</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="教师评价" name="tchappraise">
				<el-table :data="appraiseList" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column type="index"></el-table-column>
					<el-table-column prop="content" label="评价内容" width="600">
					</el-table-column>
					<el-table-column label="评价选项人数">
						<el-table-column prop="numA" label="A.完全符合">
						</el-table-column>
						<el-table-column prop="numB" label="B.很符合">
						</el-table-column>
						<el-table-column prop="numC" label="C.基本符合">
						</el-table-column>
						<el-table-column prop="numD" label="D.不符合">
						</el-table-column>
					</el-table-column>
				</el-table>
				<el-row>
					<el-col :span="14">
						<el-button type="info" @click='goAdvice'>查看建议</el-button>
					</el-col>
					<el-col :span="10">
						<div class="sumscore">总分：{{ totalScore }}</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="督导评价" name="svappraise">
				<el-table :data="appraiseList" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column type="index"></el-table-column>
					<el-table-column prop="content" label="评价内容" width="600">
					</el-table-column>
					<el-table-column label="评价选项人数">
						<el-table-column prop="numA" label="A.完全符合">
						</el-table-column>
						<el-table-column prop="numB" label="B.很符合">
						</el-table-column>
						<el-table-column prop="numC" label="C.基本符合">
						</el-table-column>
						<el-table-column prop="numD" label="D.不符合">
						</el-table-column>
					</el-table-column>
				</el-table>
				<el-row>
					<el-col :span="14">
						<el-button type="info" @click='goAdvice'>查看建议</el-button>
					</el-col>
					<el-col :span="10">
						<div class="sumscore">总分：{{ totalScore }}</div>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'stuappraise',
				appraiseList: [{
						content: '讲课思路和概念清楚，容易听懂',
						numA: '60',
						numB: '6',
						numC: '0',
						numD: '0'
					},
					{
						content: '讲课思路和概念清楚，容易听懂',
						numA: '60',
						numB: '6',
						numC: '0',
						numD: '0'
					},
					{
						content: '讲课思路和概念清楚，容易听懂',
						numA: '60',
						numB: '6',
						numC: '0',
						numD: '0'
					},
					{
						content: '讲课思路和概念清楚，容易听懂',
						numA: '60',
						numB: '6',
						numC: '0',
						numD: '0'
					},
					{
						content: '讲课思路和概念清楚，容易听懂',
						numA: '60',
						numB: '6',
						numC: '0',
						numD: '0'
					},
					{
						content: '讲课思路和概念清楚，容易听懂',
						numA: '60',
						numB: '6',
						numC: '0',
						numD: '0'
					}
				],
				totalScore: 100,

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
			}
		},
		methods: {
			goAdvice() {
				this.$router.push('/teacher/teacheradvice')
			},
		}
	}
</script>

<style>
	.el-col {
		margin-top: 10px;
		text-align: center;
	}

	.sumscore {
		margin-top: 10px;
	}
	
	.table-classinfo{
		margin-left: 50%;
		transform: translate(-50%);
	}
</style>
