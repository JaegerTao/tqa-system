<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>我的课程</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/teachercourse' }">课程列表</el-breadcrumb-item>
			<el-breadcrumb-item>评价详情</el-breadcrumb-item>
		</el-breadcrumb>

		<el-tabs v-model="activeName" type="border-card">
			<el-tab-pane label="学生评价" name="stuappraise">
				<el-table :data="appraiseList" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column type="index" fixed="left"></el-table-column>
					<el-table-column prop="content" label="评价内容" width="600">
					</el-table-column>
					<el-table-column label="评价选项人数">
						<el-table-column prop="numA" label="A">
						</el-table-column>
						<el-table-column prop="numB" label="B">
						</el-table-column>
						<el-table-column prop="numC" label="C">
						</el-table-column>
						<el-table-column prop="numD" label="D">
						</el-table-column>
					</el-table-column>
				</el-table>
				<el-row>
					<el-col :span="14">
						<el-button type="info">查看建议</el-button>
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
						<el-table-column prop="numA" label="A">
						</el-table-column>
						<el-table-column prop="numB" label="B">
						</el-table-column>
						<el-table-column prop="numC" label="C">
						</el-table-column>
						<el-table-column prop="numD" label="D">
						</el-table-column>
					</el-table-column>
				</el-table>
				<el-row>
					<el-col :span="14">
						<el-button type="info">查看建议</el-button>
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
						<el-table-column prop="numA" label="A">
						</el-table-column>
						<el-table-column prop="numB" label="B">
						</el-table-column>
						<el-table-column prop="numC" label="C">
						</el-table-column>
						<el-table-column prop="numD" label="D">
						</el-table-column>
					</el-table-column>
				</el-table>
				<el-row>
					<el-col :span="14">
						<el-button type="info">查看建议</el-button>
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
				totalScore: 100
			}
		}
	}
</script>

<style>
	.el-col {
		margin-top: 10px;
		text-align: center;
	}
	.sumscore{
		margin-top: 10px;
	}
</style>
