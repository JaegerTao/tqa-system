<template>
	<div class="login-container">
		<div class="login-box">
			<!-- logo头像 -->
			<div class="avatar_box">
				<img src="../assets/image/logoITElite.jpg" alt="">
			</div>
			<div class="title">
				教学质量评价系统
			</div>
			<!-- 登录表单 -->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
				<!-- 学号 -->
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" placeholder="请输入学号/教师号/督导号" prefix-icon="el-icon-user-solid"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" placeholder="请输入密码" type="password" prefix-icon="el-icon-lock" show-password></el-input>
				</el-form-item>
				<!-- 按钮 -->
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
					<el-button size="small" type="info" @click="forgetPwd">忘记密码</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- <div class="goSearchPage">
			<span @click="goSearchPage">搜索页</span>
		</div> -->
	</div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单数据绑定
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 5, max: 12, message: '请输入正确的账号', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最少6位', trigger: 'blur' }
        ]
      },
	  //构建需要提交的登录对象
	  subForm: {
	    id: 0,
	    idNumber: "string",
	    name: "",
	    password: "",
	    role: {
	      id: 0,
	      name: "string",
	      permissions: [
	        {
	          id: 0,
	          name: "string",
	          perms: "string",
	          type: "string",
	          url: "string"
	        }
	      ]
	    },
	    roleId: 0
	  }

    }
  },
  created() {
  	window.sessionStorage.clear()
  },
  methods: {
    // 重置表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },

    // 执行登录
    login () {
      // 表单预验证
      this.$refs.loginFormRef.validate(valid => {
        // console.log(valid)
        if (!valid) return // 验证不通过
        // 发起登陆请求
        const pwdmd5 = this.$md5(this.loginForm.password)// md5加密密码
        // console.log(this.$md5('510603199802201510'))
		this.subForm.name = this.loginForm.username
		this.subForm.password = pwdmd5
		this.$http.post('/login', this.subForm).then(res => {
			if(res.data.status == '200'){
				let role_id = res.data.role_id
				const username = res.data.username
				// console.log(role_id, username)
				window.sessionStorage.setItem('username', res.data.username)
				window.sessionStorage.setItem('role_id', this.$md5(res.data.role_id))
				// console.log(2, this.$md5('2'))
				// console.log(3, this.$md5('3'))
				// console.log(4, this.$md5('4'))
				this.$message.success('登录成功')
				// 服务器传回token，保存到sessionStorage(会话期间存储),只在当前网站打开期间生效
				window.sessionStorage.setItem('token', this.$md5(role_id+username))
				
				if (role_id == '2') {
				  this.$router.push('/teacherhome')
				} else if (role_id == '3'){
				  this.$router.push('/stuhome')
				} else if (role_id == '4'){
				  this.$router.push('/spvhome')
				} else if (role_id == '1'){
					this.$message.warning('管理员请移步管理员登录入口')
				}
			}else if(res.data.status == '401'){
				this.$message.warning('密码错误')
			}else if(res.data.status == '-1'){
				this.$message.warning('用户名或密码错误')
			}
		}).catch(err => {
			console.log(err)
		})
      })
    },
	
	//忘记密码
	forgetPwd(){
		this.$router.push('/initpwd')
	},
	
	//goSearchPage跳转到搜索页
	goSearchPage(){
		this.$router.push('/search')
	}
  }
}
</script>

<style lang="less" scoped>
	.login-container {
		background-color: #2b4b6b;
		background-image: url(../assets/image/seasun.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		height: 100%;
	}

	.login-box {
		width: 50%;
		height: 375px;
		background-color: #FFFFFF;
		border: 3px;
		border-radius: 25px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background:  rgba(255, 255, 255, 0.8);
		.avatar_box {
			height: 130px;
			width: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 10px;
			box-shadow: 0 0 10px #ddd;
			position: absolute;
			left: 50%;
			background-color: #FFFFFF;
			background:  rgba(255, 255, 255, 0.8);
			transform: translate(-50%, -50%);

			img {
				height: 100%;
				width: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}

		.title {
			// border: 1px solid black;
			position: absolute;
			font-size: 30px;
			font-family: 'Courier New', Courier, monospace;
			font-weight: 1000;
			left: 50%;
			top: 100px;
			transform: translate(-50%);
		}
	}

	.login_form {
		position: absolute;
		left: 10%;
		bottom: 0;
		width: 80%;
		padding: 0 20px;
		box-sizing: border-box;
	}

	.btns {
		display: flex;
		justify-content: flex-end;
	}
	
	.goSearchPage{
		// border: 1px solid white;
		position: absolute;
		left: 95%;
		top: 2%;
		
		span{
			color: #bcbcbc;
			text-decoration: underline;
			cursor: pointer;
		}
	}
</style>
