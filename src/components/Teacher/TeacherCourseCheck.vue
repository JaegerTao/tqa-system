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
			<el-tab-pane label="总体情况" name="totalappraise">
				<div class="charts">
					<v-chart  :options="totalappraise"></v-chart>
					<div>总体情况</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="学生评价" name="stuappraise">
				<el-table :data="appraiseListStu" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column type="index" fixed="left"></el-table-column>
					<el-table-column prop="content" label="评价内容" width="600">
					</el-table-column>
					<el-table-column label="平均得分">
						<template slot-scope="scope">
							{{ scope.row.score }}
						</template>
					</el-table-column>
				</el-table>
				<el-row>
					<el-col :span="14">
						<el-button type="info" @click='goAdvice'>查看建议</el-button>
					</el-col>
					<el-col :span="10">
						<div class="sumscore">总平均分：{{ totalScoreStu }}</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="教师评价" name="tchappraise">
				<el-table :data="appraiseListTeacher" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column type="index"></el-table-column>
					<el-table-column prop="content" label="评价内容" width="600">
					</el-table-column>
					<el-table-column label="平均得分">
						<template slot-scope="scope">
							{{ scope.row.score }}
						</template>
					</el-table-column>
				</el-table>
				<el-row>
					<el-col :span="14">
						<el-button type="info" @click='goAdvice'>查看建议</el-button>
					</el-col>
					<el-col :span="10">
						<div class="sumscore">总平均分：{{ totalScoreTeacher }}</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="督导评价" name="svappraise">
				<el-table :data="appraiseListSpv" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
					<el-table-column type="index"></el-table-column>
					<el-table-column prop="content" label="评价内容" width="600">
					</el-table-column>
					<el-table-column label="平均得分">
						<template slot-scope="scope">
							{{ scope.row.score }}
						</template>
					</el-table-column>
				</el-table>
				<el-row>
					<el-col :span="14">
						<el-button type="info" @click='goAdvice'>查看建议</el-button>
					</el-col>
					<el-col :span="10">
						<div class="sumscore">总平均分：{{ totalScoreSpv }}</div>
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
				activeName: 'totalappraise',

				commentData: [],
				appraiseListStu: [],
				appraiseListTeacher: [],
				appraiseListSpv: [],
				totalScoreStu: 100,
				totalScoreTeacher: 100,
				totalScoreSpv: 100,

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

				totalappraise: {
					title: {
						text: '评价占比',
						subtext: '各角色评价权重占比',
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						data: ['学生评价', '教师互评', '督导评价']
					},
					series: [{
						name: '评价权重占比',
						type: 'pie',
						radius: '55%',
						center: ['40%', '50%'],
						data: [{
								value: 30,
								name: '学生评价'
							},
							{
								value: 30,
								name: '教师互评'
							},
							{
								value: 40,
								name: '督导评价'
							}
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				}
			}
		},
		created() {
			this.initList()
		},
		methods: {
			goAdvice() {
				this.$router.push('/teacher/teacheradvice')
			},
			async initList() {
				await this.getAppraiseList()
				await this.getSummaryEva()
			},
			getAppraiseList() {
				this.$http.get('/evaluationItem/list?rid=2')
					.then(res => {
						this.appraiseListTeacher = res.data.data
					})
					.catch(err => {
						console.log(err)
					})
				this.$http.get('/evaluationItem/list?rid=3')
					.then(res => {
						this.appraiseListStu = res.data.data
					})
					.catch(err => {
						console.log(err)
					})
				this.$http.get('/evaluationItem/list?rid=4')
					.then(res => {
						this.appraiseListSpv = res.data.data
					})
					.catch(err => {
						console.log(err)
					})

			},
			getSummaryEva() {
				this.$http.get('/evaluation/summaryEvaluation/byTeacherId?id=2')
					.then(res => {
						for (let eva of res.data.data) {
							switch (eva.role_name) {
								case "学生":
									let scorelistStu = []
									// scorelistStu[0] = eva.score_1
									// scorelistStu[1] = eva.score_2
									// scorelistStu[2] = eva.score_3
									// scorelistStu[3] = eva.score_4
									// scorelistStu[4] = eva.score_5
									// scorelistStu[5] = eva.score_6
									this.totalScoreStu = eva.total_score
									scorelistStu = this.initScoreList(eva)
									// console.log(scorelistStu)
									for (let i = 0; i < this.appraiseListStu.length; i++) {
										this.appraiseListStu[i].score = scorelistStu[i]
									}
									break
								case "教师":
									let scorelistTeacher = []
									// scorelistTeacher[0] = eva.score_1
									// scorelistTeacher[1] = eva.score_2
									// scorelistTeacher[2] = eva.score_3
									// scorelistTeacher[3] = eva.score_4
									// scorelistTeacher[4] = eva.score_5
									// scorelistTeacher[5] = eva.score_6
									this.totalScoreTeacher = eva.total_score
									scorelistTeacher = this.initScoreList(eva)
									for (let i = 0; i < this.appraiseListTeacher.length; i++) {
										this.appraiseListTeacher[i].score = scorelistTeacher[i]
									}
									break
								case "督导":
									let scorelistSpv = []
									// scorelistSpv[0] = eva.score_1
									// scorelistSpv[1] = eva.score_2
									// scorelistSpv[2] = eva.score_3
									// scorelistSpv[3] = eva.score_4
									// scorelistSpv[4] = eva.score_5
									// scorelistSpv[5] = eva.score_6
									this.totalScoreSpv = eva.total_score
									scorelistSpv = this.initScoreList(eva)
									for (let i = 0; i < this.appraiseListSpv.length; i++) {
										this.appraiseListSpv[i].score = scorelistSpv[i]
									}
									break
								default:
									break
							}
						}
						// console.log(this.appraiseListStu)
					})
					.catch(err => {
						console.log(err)
					})
			},
			//构建分数数组
			initScoreList(eva) {
				let scorelist = []
				scorelist[0] = eva.score_1
				scorelist[1] = eva.score_2
				scorelist[2] = eva.score_3
				scorelist[3] = eva.score_4
				scorelist[4] = eva.score_5
				scorelist[5] = eva.score_6
				return scorelist
			},
			initScoreById(item, scorelist) {
				let i = Number(item.id)
				return scorelist[i - 1]
			}
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

	.table-classinfo {
		margin-bottom: 10px;
		margin-left: 50%;
		transform: translate(-50%);
	}
	
	.charts{
		width: 50%;
		border: 1px solid black;
	}
</style>
