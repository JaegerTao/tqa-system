<template>
	<el-button type="info" @click="returnHome"> 返回首页 </el-button>
</template>

<script>
export default {
  methods: {
    changePwd () {
      this.$router.push('/stuhome')
    }
  },
  data () {
    return {

    }
  }

}
</script>

<style lang="less" scoped>

</style>
