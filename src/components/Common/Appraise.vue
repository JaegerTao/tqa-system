<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>可评价列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<el-table :v-loading="loading" :data="appraiseList" style="width: 100%" stripe :header-cell-style="{'text-align':'center'}"
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
				<el-table-column fixed="right" label="评价" width="120">
					<template slot-scope="scope">
						<el-button type="warning" size="mini" @click="goComments(scope.row.id, scope.row.teacher.id)"> 评价 </el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageinfo.pageindex"
			 :page-sizes="[5, 10, 15]" :page-size="pageinfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageinfo.pageSum">
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
	export default {
		props: ['pathheader'],
		data() {
			return {
				appraiseList: [],
				loading: true,
				pageSum: 1, // 数据总数
				pageinfo: {
					pageindex: 1, // 当前页码
					pagesize: 5 // 当前每页多少条
				}
			}
		},
		created() {
			this.getAppraiseList()
		},
		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex === 1) {
					return 'warning-row'
				} else if (rowIndex === 3) {
					return 'success-row'
				}
				return ''
			},
			goComments(courseid, toid) {
				// console.log(courseid, toid)
				window.sessionStorage.setItem('courseid', courseid)
				window.sessionStorage.setItem('toid', toid)
				switch (this.pathheader) {
					case '/stu':
						this.$router.push({
							name: 'StuAppraiseEdit',
							params: {
								courseid: courseid,
								toid: toid
							}
						})
						break
					case '/teacher':
						this.$router.push({
							name: 'TeacherAppraiseEdit',
							params: {
								courseid: courseid,
								toid: toid
							}
						})
						break
					case '/spv':
						this.$router.push({
							name: 'SpvAppraiseEdit',
							params: {
								courseid: courseid,
								toid: toid
							}
						})
						break
					default:
						break
				}
				this.$router.push(this.pathheader + '/appraiseedit')
			},
			// 监听pageSize改变的时间
			handleSizeChange(newSize) {
				// console.log(newSize)
				this.pageinfo.pagesize = newSize
			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				// console.log(newPage)
				this.pageinfo.pageindex = newPage
			},

			//获取可评价课程列表
			getAppraiseList() {
				this.$http.get('/evaluation/courses/byTeacherId', {
						params: {
							id: 2
						}
					}).then(res => {
						// console.log(res)
						this.appraiseList = res.data.data
						// this.loading = false
					})
					.catch(err => {
						console.log(err)
						this.$message({
							message: '请求失败，请检查网络',
							type: 'warning'
						})
					})
			},
		}
	}
</script>

<style>
	.el-breadcrumb {
		margin-bottom: 15px;
	}

	.el-pagination {
		margin-top: 15px;
		margin-left: 15px;
	}
</style>
