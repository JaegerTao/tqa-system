<template>
	<div>
		<el-card>
			<span> 修改密码 </span>
			<el-form label-position="right">
				<el-form-item label="原密码">
					<el-input placeholder="请输入原密码" v-model="oldpwd" show-password></el-input>
				</el-form-item>
				
				<el-form-item label="新密码">
					<el-input placeholder="请输入新密码" v-model="newpwd" show-password></el-input>
				</el-form-item>
				
				<el-form-item label="确认密码">
					<el-input placeholder="确认密码" v-model="configpwd" show-password></el-input>
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
