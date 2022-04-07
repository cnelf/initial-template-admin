<template>
  <div class="header">
    <el-header>
      <div>admin</div>
      <div class="cursor-default" @click="handleLogout">退出</div>
    </el-header>
  </div>
</template>

<script>
  export default {
    name: 'Header',

    methods: {
      handleLogout() {
        this.$router.replace('/login');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .header {
    height: 60px;

    .el-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #c0c0c0;
      width: 100%;
      background: #fff;
    }
  }
</style>
