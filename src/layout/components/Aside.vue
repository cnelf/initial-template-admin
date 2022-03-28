<template>
  <el-aside style="height: 100%">
    <el-scrollbar style="height: 100%">
      <el-menu :router="true">
        <template v-for="route in adminRoutes">
          <el-menu-item v-if="!route.meta" :key="route.name" :index="route.path">
            <i :class="route.children[0].meta.icon"></i>
            <span slot="title">{{ route.children[0].meta.title }}</span>
          </el-menu-item>

          <el-submenu v-else :key="route.name" :index="route.path">
            <template slot="title">
              <i :class="route.meta.icon"></i>
              <span slot="title">{{ route.meta.title }}</span>
            </template>
            <el-menu-item
              v-for="childRoute in route.children"
              :key="childRoute.name"
              :index="`${route.path}/${childRoute.path}`"
            >
              {{ childRoute.meta.title }}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
  import { adminRoutes } from '@/router/router.config.js';
  export default {
    data() {
      return {
        adminRoutes
      };
    }
  };
</script>

<style lang="scss" scoped>
  .el-aside {
    border-right: 1px solid #ccc;

    .el-scrollbar ::v-deep {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .el-menu {
        border: none;
      }
    }
  }
</style>
