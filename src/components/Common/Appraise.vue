<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>可评价列表</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card class="box-card">
			<!-- 搜索框 -->
			<el-row>
				<el-col :span="10">
					<el-input placeholder="搜索老师名" v-model="searchKeyTxt" clearable @clear="getAppraiseList()">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</el-col>
			</el-row>

			<!-- 可评价课程列表区 -->
			<el-table v-loading="loading" :data="appraiseList" style="width: 100%" stripe :header-cell-style="{'text-align':'center'}"
			 :cell-style="{'text-align':'center'}" ref="filterTable">
				<el-table-column prop="number" label="课程号" width="100" sortable>
				</el-table-column>
				<el-table-column prop="courseDep" label="学院" width="150" column-key="courseDep" :filters="courseDepFilter" :filter-method="filterHandler">
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
						<el-button type="warning" size="mini" @click="goComments(scope.row)"> 评价 </el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageinfo.pageindex"
			 :page-sizes="[5, 10]" :page-size="pageinfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="pageSum">
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
				},
				searchKeyTxt: '', //搜索关键词
				courseDepFilter:[{
					text: '计算机科学学院',
					value: '计算机科学学院'
				}, {
					text: '美术学院',
					value: '美术学院'
				}],
				
			}
		},
		created() {
			this.getAppraiseList()
		},
		methods: {
			filterHandler(value, row, column) {
			        const property = column['property'];
			        return row[property] === value;
			},
			//跳转到评价编辑页面
			goComments(row) {
				console.log(row)
				let rowstr = JSON.stringify(row)
				window.sessionStorage.setItem('appraiseItem', rowstr)
				// window.sessionStorage.setItem('courseid', courseid)
				// window.sessionStorage.setItem('toid', toid)
				const courseid = row.id
				const toid = row.teacher.id
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
				this.getAppraiseList()
			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				// console.log(newPage)
				this.pageinfo.pageindex = newPage
				this.getAppraiseList()
			},

			//获取可评价课程列表
			getAppraiseList() {
				this.loading = true
				let apistr = null
				switch (this.pathheader) {
					case '/stu':
						apistr = '/student/courses'
						break
					case '/teacher':
						apistr = '/teacher/courses'
						break
					case '/spv':
						apistr = '/supervisor/courses'
						break
					default:
						break
				}
				this.$http.get('/evaluation' + apistr, {
						params: {
							pageSize: this.pageinfo.pagesize,
							startPage: this.pageinfo.pageindex
						}
					}).then(res => {
						// console.log(res.data)
						this.appraiseList = res.data.data.records
						this.pageSum = res.data.data.total
						let that = this
						setTimeout(function() {
							that.loading = false
						}, 500)
						// this.loading = false
					})
					.catch(err => {
						console.log(err)
						this.$message({
							message: '请求失败，请检查网络',
							type: 'warning'
						})
						setTimeout(function() {
							that.loading = false
						}, 500)
					})
			},

		}
	}
</script>

<style lang="less" scoped>
	.body {
		margin: 0;
	}

	.el-breadcrumb {
		margin-bottom: 15px;
	}

	.el-pagination {
		margin-top: 15px;
		margin-left: 15px;
	}



	.box-card {
		.el-row {
			margin-left: 12px;
		}
	}
</style>
