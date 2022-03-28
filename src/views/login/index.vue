<template>
  <el-container style="height: 100%">
    <el-card>
      <div slot="header">登 录</div>
      <el-form label-width="60px" style="width: 360px">
        <el-form-item label="账号："><el-input type="text"></el-input></el-form-item>
        <el-form-item label="密码："><el-input type="passsword"></el-input></el-form-item>
        <el-form-item><el-button @click="handleLogin">登 录</el-button></el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
  export default {
    methods: {
      handleLogin() {
        this.$router.replace('/home');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 100px;

    .el-card ::v-deep {
      width: 600px;

      .el-card__header {
        font-size: 20px;
      }

      .el-form {
        margin: 0 auto;
        padding: 32px 0;
      }
    }
  }
</style>
