<template>
  <el-header>
    <div>admin</div>
    <div class="cursor-default" @click="handleLogout">退出</div>
  </el-header>
</template>

<script>
  export default {
    methods: {
      handleLogout() {
        this.$router.replace('/login');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #c0c0c0;
  }
</style>
