<template>
	<div>
		<el-button @click="returnHome"> 返回首页 </el-button>
		<center>
			<span> 修改密码 </span>
			<div class="oldPwd">
				<span> 原密码： </span>
				<input type="password" class="oldpwd" />
			</div>
			<div class="newPwd">
				<span> 新密码： </span>
				<input type="password" class="newpwd" />
			</div>
			<div class="configPwd">
				<span> 确认密码： </span>
				<input type="password" class="configpwd" />
			</div>
			<el-button class="saveButton"> 保存 </el-button>
		</center>
	</div>
</template>

<script>
export default {
  methods: {
    returnHome () {
      this.$router.push('/stuhome')
    },
    saveButton () {

    }
  }
}
</script>

<style lang="less" scoped>
	center {
		> div {
			margin-top: 30px;
		}
	}

	.saveButton {
		margin-top: 30px;
	}
</style>
