<template>
	<el-container>
		<el-header>
			<div class="header-title">
				<span v-html="title"></span>
			</div>
		</el-header>
		<el-main>
			<div class="main-content">
				<div v-html="contenthtml"></div>
				<span v-show="false">{{index}}</span>
			</div>
		</el-main>
		<el-footer>
			<div class="footer-date">
				<span>获取时间: {{date}}</span>
			</div>
		</el-footer>
	</el-container>
</template>

<script>
	export default{
		data(){
			return{
				title:'世界无烟日',//标题
				contenthtml:'', //
			}
		},
		props:{
			index:{
				type: Number,
				default: 0
			},
			content:{
				type: String,
				default: '在1987年11月，世界卫生组织（WHO）在日本东京举行的第6届吸烟与健康国际会议上建议把每年的4月7日定为世界无烟日（World No Tobacco Day），并从1988年开始执行，但从1989年开...'
			},
			date:{
				type: String,
				default: '2020-05-31'
			}
		},
		created() {
			console.log(this.content.length)
			this.setTitle()
			this.setContent()
		},
		updated() {
			this.setTitle()
			this.setContent()
		},
		methods:{
			//设置content
			setContent(){
				this.contenthtml = '<p>' + this.content + '</p>'
			},
			
			//设置标题
			setTitle(){
				let istart = 0
				let iend = 0
				istart = this.content.indexOf('<span') - 10
				iend = this.content.indexOf('</span>') + 35
				if(istart < 0) istart = 0
				if(iend > this.content.length) iend = this.content.length
				this.title = this.content.substring(istart, iend)
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-container{
		// border: 1px solid #000000;
		
		.el-header{
			// border: 1px solid #000000;
			// display: flex;
			// justify-content: space-between;
			// align-items: center;
			
			
			.header-title{
				// border: 1px solid #000000;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 17px;
				
				span{
					
					font-size: 16px;
					font-family: 'Courier New', Courier, monospace;
					// font-weight: 1000;
					
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
				font-size: 15px;
				
				div{
					width: 100%;
					// border: 1px solid #000000;
					font-size: 17px;
					
					/deep/ p{
						// border: 1px solid #000000;
						width: 100%;
					}
				}
				
				/deep/ span{
					color: #ff0000;
				}
			}
		}
		
		.el-footer{
			display: flex;
			// justify-content: center;
			align-items: center;
			
			.footer-date{
				
				span{
					font-size: 14px;
					font-family: 'Courier New', Courier, monospace;
				}
			}
		}
	}
</style>
