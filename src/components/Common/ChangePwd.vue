<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>修改密码</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<span class="title"> 修改密码 </span>
			<el-form label-position="right" label-width="80px">
				<el-form-item label="原密码:">
					<el-input placeholder="请输入原密码" v-model="oldpwd" show-password></el-input>
				</el-form-item>
				
				<el-form-item label="新密码:">
					<el-input placeholder="请输入新密码" v-model="newpwd" show-password></el-input>
				</el-form-item>
				
				<el-form-item label="确认密码:">
					<el-input placeholder="确认密码" v-model="confirmpwd" show-password></el-input>
				</el-form-item>
			</el-form>
			<el-button class="saveButton"> 保存 </el-button>
		</el-card>
	</div>
</template>

<script>
	export default {
		methods: {
			saveButton() {

			}
		},
		data() {s
			return {
				updataPwdForm:{
					oldpwd: '',
					newpwd: '',
					comfirmpwd: ''
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.el-breadcrumb{
		margin-bottom: 15px;
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

	.saveButton {
		margin-top: 50px;
		margin-left: 50%;
		transform: translate(-50%);
	}
	
	.el-form{
		// border: 1px solid black;
		margin-top: 50px;
		margin-left: 50%;
		transform: translate(-50%);
	}
</style>
