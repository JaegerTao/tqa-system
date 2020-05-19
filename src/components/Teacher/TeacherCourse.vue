<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>我的课程</el-breadcrumb-item>
			<el-breadcrumb-item>课程列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<!-- 列表区 -->
			<el-table v-loading='loading' :data="courseList" stripe style="width: 100%" max-height="80%" :default-sort="{prop:'plan', order: 'descending'}"
			 :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
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
				<el-table-column label="查看评价" fixed="right">
					<template slot-scope='scope'>
						<el-button type="primary" size="mini" @click="checkAppraise(scope.row)">查看评价</el-button>
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
		data() {
			return {
				courseList: [],//课程列表
				pageSum: 0, // 数据总数
				pageinfo: {
					pageindex: 1, // 当前页码
					pagesize: 5 // 当前每页多少条
				},
				
				loading: true
			}
		},
		created() {
			this.pageinfo.pageSum = this.courseList.length
			this.getCourseList()
		},
		methods: {
			// 请求课程数据列表，按页码
			getCourseList() {
				this.loading = true
				this.$http.get('/evaluation/teacher/courseList', {
						params:{
							pageSize: this.pageinfo.pagesize,
							startPage: this.pageinfo.pageindex
						}
					}).then(res => {
						console.log(res)
						this.courseList = res.data.data.records
						this.pageSum = res.data.data.total
						this.loading = false
					})
					.catch(err => {
						console.log(err)
					})
			},

			// 监听pageSize改变的时间
			handleSizeChange(newSize) {
				console.log(newSize)
				this.pageinfo.pagesize = newSize
				this.getCourseList()
			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				console.log(newPage)
				this.pageinfo.pageindex = newPage
				this.getCourseList()
			},
			// 跳转到评价详情
			checkAppraise(row) {
				let rowstr = JSON.stringify(row)
				window.sessionStorage.setItem('courseCheckItem', rowstr)
				this.$router.push('/teacher/teachercoursecheck')
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-pagination {
		margin-top: 15px;
		margin-left: 15px;
	}

	.el-card {}

	.el-breadcrumb {
		margin-bottom: 15px;
	}
</style>
