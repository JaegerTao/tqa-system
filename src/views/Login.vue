<template>
	<div class="login-container">
		<div class="login-box">
			<!-- logo头像 -->
			<div class="avatar_box">
				<img src="../assets/image/logoITElite.jpg" alt="">
			</div>
			<div class="title">
				教学质量评估管理系统
			</div>
			<!-- 登录表单 -->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
				<!-- 学号 -->
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" placeholder="请输入学号/教师号/督导号" prefix-icon="el-icon-user-solid"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" placeholder="请输入密码" type="password" prefix-icon="el-icon-lock"></el-input>
				</el-form-item>
				<!-- 按钮 -->
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单数据绑定
      loginForm: {
        username: '2017110414',
        password: '1234567'
      },
      // 表单验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入正确的账号', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最少6位', trigger: 'blur' }
        ]
      }

    }
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
        console.log(pwdmd5)
		this.$http.post('/login', this.loginForm).then(function(res){
			console.log(res)
		}).catch(function(err){
			console.log(err)
		})
		
        // 暂默认登录成功
        this.$message.success('登录成功')
        // 服务器传回token，保存到sessionStorage(会话期间存储),只在当前网站打开期间生效
        window.sessionStorage.setItem('token', this.loginForm.username)
        if (this.loginForm.username == '2017110414') {
          this.$router.push('/teacherhome')
        } else if (this.loginForm.username == '201711041'){
          this.$router.push('/stuhome')
        } else if (this.loginForm.username == '20171104'){
          this.$router.push('/spvhome')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
	.login-container {
		background-color: #2b4b6b;
		height: 100%;
	}

	.login-box {
		width: 50%;
		height: 350px;
		background-color: #FFFFFF;
		border: 3px;
		border-radius: 25px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

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
			transform: translate(-50%, -50%);

			img {
				height: 100%;
				width: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}

		.title {
			position: absolute;
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
</style>
