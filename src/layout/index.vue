<template>
  <div class="layout">
    <Header></Header>
    <div class="main-wrapper">
      <Aside></Aside>
      <Main></Main>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Aside from './components/Aside.vue';
  import Main from './components/Main.vue';

  export default {
    name: 'Layout',

    components: {
      Header,
      Aside,
      Main
    }
  };
</script>

<style lang="scss" scoped>
  .layout {
    height: 100%;

    .main-wrapper {
      display: flex;
      overflow: auto;
      height: calc(100% - 60px);
    }
  }
</style>
