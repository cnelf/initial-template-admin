<template>
  <div id="globalScrollWrapper" class="main">
    <el-breadcrumb v-show="matched && matched.length > 1">
      <el-breadcrumb-item v-for="(route, i) in matched" :key="route.path" :to="routeTo(i, route.path)">{{
        route.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content-wrapper">
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
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
  .main {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: auto;
    padding: 0;

    .el-breadcrumb {
      padding: 10px;
      background-color: #fff;
    }

    .content-wrapper {
      flex: 1;
      padding: 24px;
      background-color: #f5f6fa;
    }
  }
</style>
