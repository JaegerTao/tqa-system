<template>
	<el-container class="container">
		<!-- 搜索框和导航 -->
		<el-header>
			<!-- logo和搜索框 -->
			<div class="header-title">
				<div class="avatar_box">
					<img src="../../assets/image/logoITElite.jpg" alt="" />
				</div>
				<div class="search-input">
					<!-- <el-input placeholder="输入搜索关键词" v-model="searchKeyTxt" clearable @clear="getResultList()" maxlength="40">
						<el-button slot="append" icon="el-icon-search">小度一下</el-button>
					</el-input> -->
					<el-autocomplete class="inline-input" v-model="searchKeyTxt" :fetch-suggestions="querySearchAsync" placeholder="请输入搜索内容"
					 @select="handleSelect" @keyup.enter.native="handleEnter" :maxlength="60" :debounce="0">
						<el-button slot="append" icon="el-icon-search" @click="doSearch">小度一下</el-button>
						<template slot-scope="{ item }">
							<div class="shItemName">
								<span>{{ item.value }} </span>
								<span class="el-icon-circle-close" @click.stop="deleteShItem(item.value)"></span>
								<!-- <el-button slot="append" icon="el-icon-circle-close" @click="doSearch"></el-button> -->
							</div>
						</template>
					</el-autocomplete>
				</div>
			</div>
			<!-- 导航按钮 -->
			<div class="header-btns">
				<span @click="goBack()">返回</span>
			</div>
		</el-header>
		<!-- 搜索结果主界面 -->
		<el-container class="search-container">
			<!-- 搜索结果 -->
			<el-main>
				<el-card class="opacity" v-loading="loadingSearchList">
					<!-- 筛选器 -->
					<div class="search-keydate">
						<el-date-picker type="dates" v-model="searchKeyDate" @change="handleDataChange" placeholder="选择一个或多个日期" size="mini"
						 clearable>
						</el-date-picker>
						<!-- {{searchKeyDate}} -->
					</div>
					<!-- 单个搜索结果 -->
					<div class="result-item" v-for="(item, index) in resultList" :key="index">
						<result-item @titleclick="titleClick(index)" :content="item.message" :date="item['@timestamp']"></result-item>
					</div>
					<!-- 分页器 -->
					<el-pagination v-show="resultList.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange"
					 :current-page="pageinfo.pageindex" :page-sizes="[5, 10]" :page-size="pageinfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
					 :total="pageSum">
					</el-pagination>
					<div class="Tips" v-show="resultList.length == 0">
						<span>
							暂无检索信息
						</span>
					</div>
				</el-card>
			</el-main>

			<!-- 详情 -->
			<el-aside width="40%">
				<el-card class="opacity">
					<el-tabs type="border-card" v-model="tabsActiveName">
						<el-tab-pane class="newsList" label="新闻" name="newsList">
							<!-- 新闻列表 -->
							<div v-show="!isSeeNewsDetail" class="newsItem" @click="seeNewsDetails(index)" v-for="(newsItem, index) in newsList" :key="index">
								<div class="newsItem-avatar">
									<el-avatar shape="square" :size="50" :src="newsItem.author_avatar"></el-avatar>
								</div>
								<div class="newsItem-content">
									<span class="newsItem-content-title">{{newsItem.title}}</span>
									<span class="newsItem-content-time">{{newsItem.created_at}}</span>
								</div>
							</div>
							<!-- 新闻详情 -->
							<div v-if="isSeeNewsDetail" class="newsDetail">
								<el-button class="btn-backNewsList" icon="el-icon-back" size="mini" @click="backNewsList()">返回</el-button>
								<div class="newsItem-content">
									<span class="newsItem-content-title">{{newsList[currentNewsIndex].title}}</span>
									<span class="newsItem-content-time">{{newsList[currentNewsIndex].created_at}}</span>
								</div>
								<div class="newsItem-content-html" v-html="$xss(newsList[currentNewsIndex].content)"></div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="日志详情" name="resultDetail">
							<span v-show="!isSeeDetail">暂无详情</span>
							<result-detail v-if="isSeeDetail" :index="currentindex" :content="resultList[currentindex].message" :date="resultList[currentindex]['@timestamp']"></result-detail>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-aside>

		</el-container>
		<!-- 底栏 -->
		<el-footer class="footer" height="3%">
			<span>Made by Team 4 : JaegerTao</span>
		</el-footer>
	</el-container>
</template>

<script>
	import resultItem from '../../components/Search/ResultItem.vue' //搜索结果组件
	import resultDetail from '../../components/Search/ResultDetail.vue' //结果详情组件
	
	export default {
		data() {
			return {
				searchKeyTxt: '', //搜索关键词
				searchHistory: [], //搜索历史
				timeout: null,
				searchKeyDate: [], //筛选日期
				searchKeyDateTxt: '', //筛选日期文本

				loadingSearchList: false, //列表加载中
				loadingSearchDetail: true, //详情加载中

				resultList: [], //搜索结果列表

				pageSum: 1, // 数据总数
				pageinfo: {
					pageindex: 1, // 当前页码
					pagesize: 5 // 当前每页多少条
				},

				isSeeDetail: false, //是否查看详情
				currentindex: 0, //当前查看搜索结果详情的index
				
				tabsActiveName: 'newsList',//tab显示名
				newsList:[],//新闻列表
				isSeeNewsDetail: false,//是否查看新闻详情
				currentNewsIndex: 0 //正在查看的新闻索引
			}
		},
		components: {
			resultItem,
			resultDetail
		},
		mounted() {
			this.searchHistory = JSON.parse(window.localStorage.getItem('searchHistory') || '[]') //this.loadAll()
			this.getNewsList()
		},
		methods: {
			//执行搜索
			doSearch() {
				this.saveHistory()
				if (this.searchKeyTxt.trim() == "") return
				this.getResultList()
			},

			//获取搜索结果
			async getResultList() {
				this.loadingSearchList = true
				await this.$http.get('/search/fuzzySearch', {
					params: {
						key: this.searchKeyTxt + this.searchKeyDateTxt,
						pageSize: this.pageinfo.pagesize,
						startPage: this.pageinfo.pageindex
					}
				}).then(res => {
					// console.log(res)
					this.pageSum = res.data.resultSum
					this.resultList = res.data.resultList
				}).catch(err => {
					console.log(err)
					this.$message.error("请求超时，请重新尝试")
				})
				this.loadingSearchList = false
				this.isSeeDetail = false
			},

			//返回登录页
			goBack() {
				this.$router.back(-1)
			},

			//搜索框历史异步查询
			querySearchAsync(queryString, cb) {
				let searchHistory = this.searchHistory;
				let results = queryString ? searchHistory.filter(this.createStateFilter(queryString)) : searchHistory;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					// 调用 callback 返回建议列表的数据
					cb(results);
				}, 500 * Math.random());
			},
			createStateFilter(queryString) { //过滤器
				if (queryString == "") return
				return (searchKeyTxt) => {
					// console.log(searchKeyTxt.value)
					return (searchKeyTxt.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) { //选中搜索
				// console.log(item)
				// console.log(this.searchKeyTxt)
				this.doSearch()
			},
			handleEnter() {
				console.log("handleEnter")
				this.doSearch()
			},

			//日期选择
			handleDataChange(date) {
				console.log(date)
				this.dateToString()
				this.doSearch()
			},

			//日期转字符
			dateToString() {
				if (this.searchKeyDate.length < 1) {
					this.searchKeyDateTxt = ''
					return
				}
				for (let date of this.searchKeyDate) {
					console.log(typeof(date))
					//const resDate = date.getFullYear() + '-' + this.p((date.getMonth() + 1)) + '-' + this.p(date.getDate())
					this.searchKeyDateTxt = this.searchKeyDateTxt + date.toString().substr(0, 15)
				}
				console.log(this.searchKeyDateTxt)
			},
			//p为不够10添加0的函数
			p(s) {
				return s < 10 ? '0' + s : s
			},

			//搜索历史存浏览器缓存
			saveHistory() {
				// console.log("dosearch",this.searchHistory)
				if (this.searchKeyTxt.trim() != '') {
					let isExist = 0
					for (let item of this.searchHistory) {
						if (item.value == this.searchKeyTxt) isExist = 1
					}
					if (isExist == 0) {
						let sh = {
							'value': this.searchKeyTxt
						}
						this.searchHistory.push(sh)
						window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
					}
				}
				if (this.searchHistory.length > 15) { //存15条，先进先出
					this.searchHistory.shift()
				}
			},
			//删除对应缓存
			deleteShItem(value) {
				console.log("delete " + value)
				for (let i = 0; i <= this.searchHistory.length; i++) {
					if (this.searchHistory[i].value == value) {
						this.searchHistory.splice(i, 1)
						window.localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
					}
				}
				this.searchKeyTxt = ""
				console.log(this.searchHistory)
			},

			// 监听pageSize改变的时间
			handleSizeChange(newSize) {
				// console.log(newSize)
				this.pageinfo.pagesize = newSize
				this.doSearch()
			},
			// 监听页码值改变的事件
			handleCurrentChange(newPage) {
				// console.log(newPage)
				this.pageinfo.pageindex = newPage
				this.doSearch()
			},
			//点击item标题显示详情
			titleClick(index) {
				// console.log(index)
				this.isSeeDetail = true
				this.currentindex = index
				this.tabsActiveName = 'resultDetail'
			},
			
			//获取新闻列表
			getNewsList(){
				const instance = this.$http.create({
					baseURL: 'https://unidemo.dcloud.net.cn/api'
				})
				instance.get('/news')
				.then(res =>{
					console.log(res)
					this.newsList = res.data
				}).catch(err => {
					console.log(err)
					this.$message.error("新闻列表请求超时，请刷新页面")
				})
			},
			//查看新闻详情
			seeNewsDetails(index){
				this.currentNewsIndex = index
				this.isSeeNewsDetail = true
			},
			//返回新闻列表
			backNewsList(){
				this.isSeeNewsDetail = false
			}
		}
	}
</script>
<style lang="less" scoped>
	.container {
		height: 100%;
		background-image: url(../../assets/image/seasun.jpg);
		background-repeat: no-repeat;
		background-size: cover;
	}

	.el-header {
		background-color: #ffffff;
		border-radius: 0px 0px 10px 10px;
		box-shadow: 5px 5px 5px #e2e2e2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.header-title {
			display: flex;
			align-items: center;
			width: 60%;

			.avatar_box {
				// height: 30px;
				width: 30px;
				border: 1px solid #eee;
				border-radius: 50%;
				padding: 10px;
				box-shadow: 0 0 10px #ddd;
				background-color: #FFFFFF;
				margin-left: 20px;

				img {
					// height: 100%;
					width: 100%;
					border-radius: 50%;
					background-color: #eee;
				}
			}

			.search-input {
				margin-left: 5%;
				width: 100%;

				// border: 1px solid #eee;
				.el-autocomplete {
					width: 100%;
				}

				.el-button {
					background-color: #33ACFE;
					color: #FFFFFF;
				}
			}
		}

		.header-btns {

			// border: 1px solid #eee;
			span {
				font-size: 15px;
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}

	.search-container {
		height: 100%;

		.opacity {
			background: rgba(255, 255, 255, 0.9);
			// height: 100%;
		}

		.el-main {
			// height: 100%;
			// border: 1px solid #eee;
			// width: 50%;

			.el-card {
				box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;

				// height: 95%;
				.search-keydate {
					margin-left: 7%;
				}

				.result-item {
					width: 90%;
					margin-left: 5%;
					margin-top: 10px;
				}

				.el-pagination {
					margin-top: 10px;
					margin-left: 6%;
				}

				.Tips {
					margin-top: 20px;

					span {
						margin-left: 45%;
						transform: translate(-50%);
						font-size: 15px;
						color: #c1c1c1;
					}
				}
			}
		}

		.el-aside {
			padding: 20px;

			.el-card {
				box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
				// height: 100%;
			}
		}
	}


	.footer {
		background-color: #c3c3c3;
		border-radius: 5px 5px 0px 0px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row-reverse;

		>span {
			color: #FFFFFF;
		}
	}

	.shItemName {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.newsList{
		height: 100%;
		
		.newsItem{
			margin-top: 5px;
			display: flex;
			border: 1px solid #e3e3e3;
			border-radius: 10px;
			
			.newsItem-avatar{
				padding: 5px;
			}
			
			.newsItem-content{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				
				.newsItem-content-title{
					
				}
				
				.newsItem-content-time{
					font-size: 13px;
					font-family: 'Courier New', Courier, monospace;
					font-weight: 800;
				}
			}
		}
		.newsItem:hover{
			background-color: #e3e3e3;
		}
		
		.newsDetail{
			.btn-backNewsList{
				margin-bottom: 10px;
			}
			
			.newsItem-content{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				text-align: center;
				
				.newsItem-content-title{
					
				}
				
				.newsItem-content-time{
					margin-top: 10px;
					font-size: 13px;
					font-family: 'Courier New', Courier, monospace;
					font-weight: 800;
				}
			}
		}
		
		.newsItem-content-html{
			/deep/ img{
				width: 100%;
			}
		}
	}
</style>
