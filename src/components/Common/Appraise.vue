<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>可评价列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card class="box-card">
			<el-table :data="tableData" style="width: 100%" stripe :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
				<el-table-column prop="plan" label="执行计划" width="100">
				</el-table-column>
				<el-table-column prop="college" label="学院" width="120">
				</el-table-column>
				<el-table-column prop="classType" label="课程类型">
				</el-table-column>
				<el-table-column prop="classCategory" label="课程类别" width="120">
				</el-table-column>
				<el-table-column prop="classCode" label="课程代码" width="120">
				</el-table-column>
				<el-table-column prop="className" label="课程名称" width="120">
				</el-table-column>
				<el-table-column prop="teacher" label="任课教师" >
				</el-table-column>
				<el-table-column prop="classNum" label="教学班号" >
				</el-table-column>
				<el-table-column prop="campus" label="行课校区" >
				</el-table-column>
				<el-table-column fixed="right" label="评价" width="120">
					<template slot-scope="scope">
						<el-button type="warning" size="mini" @click="comments"> 评价 </el-button>
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
		props:['pathheader'],
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
					campus: '成龙校区'
				}, {
					plan: '201902',
					college: '计算机科学学院',
					classType: '理论课',
					classCategory: '实践教学环节',
					classCode: '191059',
					className: 'c语言',
					teacher: '001-李四',
					classNum: '20171104',
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
			comments() {
				this.$router.push( this.pathheader + '/appraiseedit')
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
		}
	}
</script>

<style>
	.el-pagination {
		margin-top: 15px;
		margin-left: 15px;
	}
</style>
