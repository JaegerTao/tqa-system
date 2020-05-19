<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>我的课程</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/teacher/teachercourse' }">课程列表</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/teacher/teachercoursecheck' }">评价详情</el-breadcrumb-item>
			<el-breadcrumb-item>查看建议</el-breadcrumb-item>
		</el-breadcrumb>

		<el-table class="table-classinfo" :data="courseCheckItem" border style="width: 90%" size="mini" :header-cell-style="{'text-align':'center'}"
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

		<el-card>
			<el-table v-loading='loading' :data="adviceList" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column prop="advicecontent" label="建议内容">
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
				courseCheckItem: [],
				courseid: '',
				adviceRole: '',
				//建议列表
				adviceList:[{
					advicecontent: '该课程各方面都很良好，希望能够增加更多实践课程'
				},{
					advicecontent: '个人觉得课程进度较快'
				},{
					advicecontent: '课程内容有些晦涩难懂'
				},{
					advicecontent: '该课程各方面都很良好，希望能够增加更多实践课程'
				},{
					advicecontent: '该课程各方面都很良好，希望能够增加更多实践课程'
				}],
				//分页数据
				pageSum: 1, // 数据总数
				pageinfo: {
					pageindex: 1, // 当前页码
					pagesize: 5 // 当前每页多少条
				},
				loading: true
			}
		},
		created() {
			this.getCheckCourseItem()
			this.getAdvices()
		},
		methods:{
			// 监听pageSize改变的时间
			handleSizeChange(newSize) {
				// console.log(newSize)
				this.pageinfo.pagesize = newSize
				this.getAdvices()
			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				// console.log(newPage)
				this.pageinfo.pageindex = newPage
				this.getAdvices()
			},
			//获取当前查看课程
			getCheckCourseItem() {
				let rowstr = window.sessionStorage.getItem('courseCheckItem')
				this.courseCheckItem = []
				this.courseCheckItem.push(JSON.parse(rowstr))
				this.courseid = this.courseCheckItem[0].id
				this.adviceRole = window.sessionStorage.getItem('adviceRole')
			},
			//获取建议
			getAdvices(){
				this.loading = true
				this.$http.get('/evaluation/teacher/advices',{
					params: {
						courseId: this.courseid,
						pageSize: this.pageinfo.pagesize,
						startPage: this.pageinfo.pageindex,
						roleId: this.adviceRole
					}
				}).then(res =>{
					console.log(res.data)
					this.adviceList = []
					this.adviceList = res.data.data.records
					this.pageSum = res.data.data.total
					this.loading = false
				}).catch(err =>{
					console.log(err)
				})
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
</style>
