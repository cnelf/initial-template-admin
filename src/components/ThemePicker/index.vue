<template>
  <el-color-picker
    :value="theme"
    :predefine="['#409eff', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959cd', '#f5222d']"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
    @change="handleChangeTheme"
  />
</template>

<script>
  import { changeTheme } from '@/utils';

  export default {
    name: 'ThemePicker',

    computed: {
      theme() {
        return getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
      }
    },

    methods: {
      async handleChangeTheme(color) {
        changeTheme(color);
        this.$emit('change', color);
      }
    }
  };
</script>

<style lang="scss">
  .theme-message,
  .theme-picker-dropdown {
    z-index: 99999 !important;
  }

  .theme-picker-dropdown .el-color-dropdown__link-btn {
    display: none;
  }
</style>
