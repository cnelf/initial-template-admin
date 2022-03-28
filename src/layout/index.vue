<template>
  <el-container style=" flex-direction: column;height: 100%">
    <Header></Header>
    <el-container style="flex: 1; height: 0">
      <Aside></Aside>
      <Main></Main>
    </el-container>
  </el-container>
</template>

<script>
  import Header from './components/Header';
  import Aside from './components/Aside';
  import Main from './components/Main';
  export default {
    name: 'Layout',

    components: {
      Header,
      Aside,
      Main
    }
  };
</script>
