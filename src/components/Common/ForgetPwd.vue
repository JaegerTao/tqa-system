<template>
	<el-container class="home-container">
		<el-header height="10%">
			<div class="header-title">
				<div class="avatar_box">
					<img src="../../assets/image/logoITElite.jpg" alt="" />
				</div>
				<span> 教学质量评估系统-初始化密码 </span>
			</div>
		</el-header>
		<el-container class="main-container">
			<el-card>
				<span class="title"> 初始化密码 </span>
				<el-form label-position="right" label-width="80px">
					<el-form-item label="学/工号">
						<el-input placeholder="请输入学/工号" v-model="initForm.username"></el-input>
					</el-form-item>
					
					<el-form-item label="身份证号">
						<el-input placeholder="请输入身份证号" v-model="initForm.idnumber"></el-input>
					</el-form-item>
					
					<el-form-item label="新密码">
						<el-input placeholder="请输入新密码" v-model="initForm.newpwd" type="password" show-password></el-input>
					</el-form-item>
					
					<el-form-item label="确认密码">
						<el-input placeholder="确认密码" v-model="initForm.comfirmpwd" type="password" show-password></el-input>
					</el-form-item>
				</el-form>
				<div class="btns">
					<el-button type="primary" @click='saveButton()'>保存</el-button>
					<el-button type="info" @click='goLogin()'>返回登录页</el-button>
				</div>
			</el-card>
		</el-container>
		<el-footer height="5%">
			<span>Made by Team 4 : JaegerTao</span>
			<span>初始化密码</span>
		</el-footer>
	</el-container>
</template>

<script>
export default {
  data () {
    return {
		initForm: {
			username: '',
			idnumber: '',
			newpwd: '',
			comfirmpwd: ''
		}
    }
  },
  created () {
    
  },
  methods: {
	  saveButton(){
		  const idnumber = this.$md5(this.initForm.idnumber)
		  const newpwd = this.$md5(this.initForm.newpwd)
		  const comfirmpwd = this.$md5(this.initForm.comfirmpwd)
		  this.$http.post('/user/findPWD',{
		  	params:{
				username: this.initForm.username,
		  		idnumber: idnumber,
		  		newpwd: newpwd,
		  		comfirmpwd: comfirmpwd
		  	}
		  }).then(res =>{
		  	console.log(res)
		  }).catch(err => {
		  	console.log(err)
		  })
	  },
	  goLogin(){
		  this.$router.push('/login')
	  }
  }
}
</script>

<style lang="less" scoped>
	.el-header {
		background-color: #55557f;
		border-radius: 0px 0px 10px 10px;
		box-shadow: 10px 10px 5px #e2e2e2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.header-title {
			display: flex;
			align-items: center;
			
			span {
				margin-left: 20px;
				font-size: 25px;
				color: #ffffff;
				height: 30px;
				overflow: hidden;
			}
		}

		
	}

	.avatar_box {
		height: 30px;
		width: 30px;
		border: 1px solid #eee;
		border-radius: 50%;
		padding: 10px;
		box-shadow: 0 0 10px #ddd;
		background-color: #FFFFFF;

		img {
			height: 100%;
			width: 100%;
			border-radius: 50%;
			background-color: #eee;
		}
	}

	.el-footer {
		background-color: #55557f;
		border-radius: 5px 5px 0px 0px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row-reverse;
		> span{
			color: #FFFFFF;
		}
	}

	.home-container {
		height: 100%;
	}

	.main-container {
		height: 80%;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	
	.el-card{
		width: 100%;
	}
	
	.title {
		display: -moz-inline-box;
		display: inline-block;
		margin-left: 50%;
		transform: translate(-50%);
		font-size: 30px;
	}
	
	.el-input {
		width: 90%;
	}
	
	.el-form{
		// border: 1px solid black;
		margin-top: 50px;
		margin-left: 50%;
		transform: translate(-50%);
	}
	
	.btns{
		// border: 1px solid black;
		margin-top: 50px;
		width: 200px;
		margin-left: 50%;
		transform: translate(-50%);
	}
</style>
