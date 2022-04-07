<template>
  <el-container class="flex-col h-full">
    <Header></Header>
    <el-container class="flex-1">
      <Aside></Aside>
      <Main></Main>
    </el-container>
  </el-container>
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
