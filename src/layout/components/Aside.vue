<template>
  <div class="aside">
    <el-aside>
      <el-scrollbar>
        <el-menu :default-active="activeMenu" :router="true" :collapse="false" :collapse-transition="false">
          <template v-for="route in adminRoutes">
            <template v-if="!route.hidden">
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
          </template>
        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>

<script>
  import { adminRoutes } from '@/router/router.config.js';

  export default {
    name: 'Aside',

    data() {
      return {
        adminRoutes
      };
    },

    computed: {
      activeMenu() {
        const route = this.$route;
        const { meta, path } = route;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .aside {
    width: 300px;
    height: 100%;

    .el-aside {
      position: fixed;
      border-right: 1px solid #ccc;
      height: 100%;

      ::v-deep .el-scrollbar {
        height: 100%;

        .el-scrollbar__wrap {
          overflow-x: hidden;
        }

        .el-menu {
          border: none;
        }
      }
    }
  }
</style>
