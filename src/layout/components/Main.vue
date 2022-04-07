<template>
  <el-main id="globalScrollWrapper">
    <el-breadcrumb v-show="matched && matched.length > 1">
      <el-breadcrumb-item v-for="(route, i) in matched" :key="route.path" :to="routeTo(i, route.path)">{{
        route.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <router-view :key="$route.path"></router-view>
    </el-container>
  </el-main>
</template>

<script>
  export default {
    name: 'Main',

    computed: {
      matched() {
        const matched = this.$route.matched;
        return matched.filter((route) => route.meta?.title);
      }
    },

    methods: {
      routeTo(i, path) {
        if (i === 0 || i === this.matched.length - 1) return;
        return { path };
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-main {
    display: flex;
    flex-direction: column;
    padding: 0;
    background-color: #f5f6fa;

    .el-breadcrumb {
      padding: 10px;
      background-color: #fff;
    }

    .el-container {
      flex: 1;
      padding: 24px;
    }
  }
</style>
