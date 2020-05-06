<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="backpath">可评价列表</el-breadcrumb-item>
			<el-breadcrumb-item>课程评价</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
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
				<el-button type="primary" @click='submitAdvice' :disabled="optionForm.scores.length < commentData.length">提交评价</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		props: ['pathheader'],
		data() {
			return {
				backpath: {
					path: this.pathheader + '/appraise'
				},
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
			this.getAppraiseList()
		},
		methods: {
			//提交评价
			submitAdvice() {
				this.$refs.optionFormRef.validate(valid => {
					if (!valid) return // 验证不通过
					if (this.optionForm.scores.length < 6) {
						this.$message.error('请选完选项哦')
						return
					}
					this.$message.success('提交成功')
					this.$router.go(-1);
				})
			},
			getAppraiseList() {
				let rid = 0
				if (this.pathheader == '/stu') {
					rid = 3
				} else if (this.pathheader == '/teacher') {
					rid = 2
				} else if (this.pathheader == '/spv'){
					rid = 4
				}
				this.$http.get('/evaluationItem/list?rid=' + rid)
					.then(res => {
						this.commentData = res.data.data
					})
					.catch(err => {
						console.log(err)
					})
			}
		}

	}
</script>

<style lang="less" scoped>
	.table-classinfo {
		margin-left: 50%;
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
		width: 60%;
		margin-left: 50%;
		transform: translate(-50%);
		font-size: 14px;

		>.el-row {
			margin-top: -10px;
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
