<template>
	<el-container>
		<el-header height="30px">
			<div class="header-title" @click="sendIndex">
				<span v-html="title"></span>
			</div>
		</el-header>
		<el-main>
			<div class="main-content">
				<div v-html="content"></div>
			</div>
			<div class="main-date">
				{{date}}
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default{
		data(){
			return{
				title:'' //匹配的标题
			}
		},
		props:{
			content:{
				type: String,
				default: ''
			},
			date:{
				type: String,
				default: ''
			}
		},
		created() {
			this.setTitle()
		},
		updated() {
			this.setTitle()
		},
		methods:{
			//设置标题
			setTitle(){
				let istart = 0
				let iend = 0
				istart = this.content.indexOf('<span') - 10
				iend = this.content.indexOf('</span>') + 35
				console.log(istart + ' ' + iend)
				if(istart < 0) istart = 0
				if(iend >= this.content.length) iend = this.content.length
				console.log(istart + ' ' + iend)
				this.title = this.content.substring(istart, iend)
			},
			
			//点击事件，向父组件传参
			sendIndex(){
				this.$emit('titleclick')
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-container{
		// border: 1px solid #000000;
		
		.el-header{
			// border: 1px solid #000000;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.header-title{
				
				span{
					font-size: 20px;
					text-decoration: underline;
					cursor: pointer;
					
					/deep/ span{
						color: #ff0000;
					}
				}
			}
		}
		
		.el-main{
			padding: 5px;
			
			.main-content{
				margin-left: 15px;
				font-size: 13px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
				
				/deep/ span{
					color: #ff0000;
				}
			}
			
			.main-date{
				margin-left: 15px;
				margin-top: 5px;
				font-size: 10px;
			}
		}
	}
	
</style>
