<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="backpath">可评价列表</el-breadcrumb-item>
			<el-breadcrumb-item>课程评价</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-table class="table-classinfo" :data="appraiseItem" border style="width: 90%" size="mini" :header-cell-style="{'text-align':'center'}"
			 :cell-style="{'text-align':'center'}">
				<el-table-column prop="number" label="课程号" width="100">
				</el-table-column>
				<el-table-column prop="courseDep" label="学院" width="150">
				</el-table-column>
				<el-table-column prop="courseType" label="课程类别" width="220">
				</el-table-column>
				<el-table-column prop="courseClass" label="课程类型">
				</el-table-column>
				<el-table-column prop="name" label="课程名称" width="150">
				</el-table-column>
				<el-table-column prop="time" label="学时">
				</el-table-column>
				<el-table-column prop="score" label="学分">
				</el-table-column>
				<el-table-column prop="teacher.name" label="任课教师">
				</el-table-column>
			</el-table>

			<el-form :model="optionForm" ref="optionFormRef" :rules="rules">
				<el-table class="table-appraise" :data="commentData" border style="width: 700px" :header-cell-style="{'text-align':'center'}"
				 :cell-style="{'text-align':'center'}" size='small'>
					<el-table-column type="index" width="60">
					</el-table-column>
					<el-table-column prop="content" label="评价内容" width="200">
					</el-table-column>
					<el-table-column label="选项" width="500">
						<el-table-column>
							<template slot="header" slot-scope="scope">
								<span class="options-title">A.完全符合</span>
								<span class="options-title">B.很符合</span>
								<span class="options-title">C.基本符合</span>
								<span class="options-title">D.不符合</span>
							</template>
							<template slot-scope="scope">
								<el-form-item prop="scores" size="mini">
									<el-radio-group v-model="optionForm.scores[scope.$index]">
										<el-radio :label="5">A</el-radio>
										<el-radio :label="4">B</el-radio>
										<el-radio :label="3">C</el-radio>
										<el-radio :label="2">D</el-radio>
									</el-radio-group>
								</el-form-item>
							</template>
						</el-table-column>
					</el-table-column>
				</el-table>
				<div class="advice-textarea">
					<el-row>
						<el-col :span="12">
							<div class="advice-title">
								留下您宝贵的课程建议:
							</div>
						</el-col>
						<el-col :span="12">
							<el-form-item prop="textarea">
								<el-input type="textarea" rows="3" placeholder="请输入您对课程的建议(选填)" v-model="optionForm.advicetxt"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-form>
			<div class="btn-submit">
				<el-button type="primary" @click='submitAdvice' :disabled="btnDiabled()">提交评价</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		props: ['pathheader'],
		data() {
			return {
				courseid: null,
				toid: null,

				backpath: {
					path: this.pathheader + '/appraise'
				},
				//显示当前评价课程的内容
				appraiseItem: [],

				//评价内容列表
				commentData: [],

				optionForm: {
					scores: [],
					advicetxt: ''
				},

				rules: {
					scores: [{
						required: true,
						message: '请选择所有选项',
						trigger: 'change'
					}]
				}
			}
		},
		created() {
			this.getRouteData()
			this.getAppraiseList()
		},
		methods: {
			//接收被评价课程id和被评价教师id
			getRouteData() {
				this.courseid = this.$route.params.courseid
				this.toid = this.$route.params.toid
				let rowstr = window.sessionStorage.getItem('appraiseItem')
				this.appraiseItem = []
				this.appraiseItem.push(JSON.parse(rowstr))
				console.log(this.appraiseItem)
				if (this.courseid == '' || this.toid == '') {
					this.courseid = this.appraiseItem.id
					this.toid = this.appraiseItem.teacher.id
				}
			},

			//提交评价
			submitAdvice() {
				this.$refs.optionFormRef.validate(valid => {
					if (!valid) return // 验证不通过
					if (this.optionForm.scores.length < this.commentData.length) {
						this.$message.error('请选完选项哦')
						return
					}

					let evajson = this.madeEvajson()
					let apistr = null
					if (this.pathheader == '/stu') {
						apistr = '/studentIndividualEvaluation'
					} else if (this.pathheader == '/teacher') {
						apistr = '/teacherIndividualEvaluation'
					} else if (this.pathheader == '/spv') {
						apistr = '/superIndividualEvaluation'
					}
					this.$http.post('/evaluation' + apistr, evajson)
						.then(res => {
							console.log(res)
							this.$message.success('提交成功')
							this.$router.go(-1);
						}).catch(err => {
							console.log(err)
						})
				})
			},
			getAppraiseList() {
				let rid = 0
				if (this.pathheader == '/stu') {
					rid = 3
				} else if (this.pathheader == '/teacher') {
					rid = 2
				} else if (this.pathheader == '/spv') {
					rid = 4
				}
				this.$http.get('/evaluationItem/list?rid=' + rid)
					.then(res => {
						this.commentData = res.data.data
					})
					.catch(err => {
						console.log(err)
					})
			},
			btnDiabled() {
				if (!this.courseid || !this.toid) return true
				if (this.optionForm.scores.length < this.commentData.length) {
					return true
				} else
					return false
			},
			//构造提交表单
			madeEvajson() {
				let evajson = {}
				evajson.advice = this.optionForm.advicetxt //建议
				evajson.courseId = this.courseid //被评价课程id
				evajson.fromId = null //评价人id
				evajson.individualId = null //互评id
				let rid = 0
				if (this.pathheader == '/stu') {
					rid = 3
				} else if (this.pathheader == '/teacher') {
					rid = 2
				} else if (this.pathheader == '/spv') {
					rid = 4
				}
				evajson.roleId = null //评价人角色id
				evajson.teacherId = this.toid //被评价老师id

				// let totalScore = 0
				// for (let score of this.optionForm.scores) {
				// 	totalScore = totalScore + score
				// }
				evajson.totalScore = null // totalScore/6 //评价总分
				//各评价选项
				evajson.score1 = this.optionForm.scores[0]
				evajson.score2 = this.optionForm.scores[1]
				evajson.score3 = this.optionForm.scores[2]
				evajson.score4 = this.optionForm.scores[3]
				evajson.score5 = this.optionForm.scores[4]
				evajson.score6 = this.optionForm.scores[5]

				console.log(evajson)
				return evajson
			}
		}

	}
</script>

<style lang="less" scoped>
	.el-breadcrumb{
		margin-bottom: 15px;
	}
	.table-classinfo {
		margin-left: 50%;
		margin-bottom: 15px;
		transform: translate(-50%);
	}

	.table-appraise {
		margin-left: 50%;
		transform: translate(-50%);
	}

	.options-title {
		margin-right: 20px;
	}

	.el-radio {
		margin-right: 40px;
	}

	.el-radio-group {
		position: relative;
		top: 10px;
	}

	.advice-textarea {
		// border: 1px solid black;
		width: 50%;
		margin-left: 50%;
		transform: translate(-50%);
		font-size: 14px;

		>.el-row {
			margin-top: 15px;
		}

		.advice-title {
			margin-top: 15px;
		}
	}

	.btn-submit {
		margin-left: 50%;

		>.el-button {
			transform: translate(-50%);
		}
	}
</style>
