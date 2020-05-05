<template>
	<div>
		<center> 
			<span> 修改密码 </span>
			<div class="id">
				<span> 身份证号： </span>
				<el-input placeholder="请输入身份证号码" v-model="id"></el-input>
			</div>
			<div class="oldPwd">
				<span> 原密码： </span>
				<el-input placeholder="请输入旧密码" v-model="oldpwd" show-password></el-input>
			</div>
			<div class="newPwd">
				<span> 新密码： </span>
				<el-input placeholder="请输入新密码" v-model="newpwd" show-password></el-input>
			</div>
			<div class="configPwd">
				<span> 确认密码： </span>
				<el-input placeholder="确认密码" v-model="configpwd" show-password></el-input>
			</div>
			<el-button class="saveButton"> 保存密码 </el-button>
		</center>
	</div>
</template>

<script>
	export default {
		methods: {
			saveButton() {
				
			}
		},
		data() {
			return {
				id: '',
				oldpwd: '',
				newpwd: '',
				configpwd: ''
			}
		}
	};
</script>

<style lang="less" scoped>
	center {
		> div {
			margin-top: 50px;
		}
	}
	
	span {
		display: -moz-inline-box;
		display: inline-block;
		width: 150px;
	}
	
	.el-input {
		width: 200px;
	}
	
	.saveButton {
		margin-top: 60px;
	}
</style>
