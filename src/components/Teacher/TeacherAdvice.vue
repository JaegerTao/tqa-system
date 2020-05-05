<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>我的课程</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/teacher/teachercourse' }">课程列表</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path: '/teacher/teachercoursecheck' }">评价详情</el-breadcrumb-item>
			<el-breadcrumb-item>查看建议</el-breadcrumb-item>
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

		<el-card>
			<el-table :data="adviceList" border stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column prop="advicecontent" label="建议内容">
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
				},],
				//分页数据
				pageinfo: {
					pageSum: 1, // 数据总数
					pageindex: 1, // 当前页码
					pagesize: 5 // 当前每页多少条
				}
			}
		},
		methods:{
			// 监听pageSize改变的时间
			handleSizeChange(newSize) {
				// console.log(newSize)
				this.pageinfo.pagesize = newSize
			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				// console.log(newPage)
				this.pageinfo.pageindex = newPage
			}
		}
	}
</script>

<style>
	.table-classinfo {
		margin-left: 50%;
		transform: translate(-50%);
	}
</style>
