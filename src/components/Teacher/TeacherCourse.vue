<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>我的课程</el-breadcrumb-item>
			<el-breadcrumb-item>课程列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<!-- 列表区 -->
			<el-table :data="courseList" stripe style="width: 100%" max-height="80%" :default-sort="{prop:'plan', order: 'descending'}"
			 :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
				<el-table-column prop="plan" label="执行计划" width="120" sortable>
				</el-table-column>
				<el-table-column prop="college" label="学院" width="120">
				</el-table-column>
				<el-table-column prop="courseType" label="课程类型">
				</el-table-column>
				<el-table-column prop="courseCategory" label="课程类别">
				</el-table-column>
				<el-table-column prop="courseCode" label="课程代码">
				</el-table-column>
				<el-table-column prop="courseName" label="课程名称">
				</el-table-column>
				<el-table-column prop="teacher" label="任课教师">
				</el-table-column>
				<el-table-column prop="classid" label="教学班号">
				</el-table-column>
				<el-table-column prop="campus" label="行课校区">
				</el-table-column>
				<el-table-column label="查看评价" fixed="right">
					<template slot-scope='scope'>
						<el-button type="primary" size="mini" @click="checkAppraise">查看评价</el-button>
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
		data() {
			return {
				courseList: [{
					plan: '201901',
					college: '计算机科学学院',
					courseType: '理论课',
					courseCategory: '实践教学环节',
					courseCode: '191049',
					courseName: '软件工程',
					teacher: '张三',
					classid: '20171104',
					campus: '成龙校区'
				}, {
					plan: '201902',
					college: '计算机科学学院',
					courseType: '理论课',
					courseCategory: '实践教学环节',
					courseCode: '191049',
					courseName: '软件工程',
					teacher: '张三',
					classid: '20171104',
					campus: '成龙校区'
				}, {
					plan: '201902',
					college: '计算机科学学院',
					courseType: '理论课',
					courseCategory: '实践教学环节',
					courseCode: '191049',
					courseName: '软件工程',
					teacher: '张三',
					classid: '20171104',
					campus: '成龙校区'
				}],

				pageinfo: {
					pageSum: 1, // 数据总数
					pageindex: 1, // 当前页码
					pagesize: 5 // 当前每页多少条
				}

			}
		},
		created() {
			this.pageinfo.pageSum = this.courseList.length
			this.getCourseList()
		},
		methods: {
			// 请求课程数据列表，按页码
			getCourseList() {
				this.$http.get('/evaluation/courses/byTeacherId', {
						params:{
							id: 2
						}
					}).then(res => {
						console.log(res)
					})
					.catch(err => {
						console.log(err)
					})
			},

			// 监听pageSize改变的时间
			handleSizeChange(newSize) {
				console.log(newSize)
				this.pageinfo.pagesize = newSize
			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				console.log(newPage)
				this.pageinfo.pageindex = newPage
			},
			// 跳转到评价详情
			checkAppraise() {
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
