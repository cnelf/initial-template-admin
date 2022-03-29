<template>
  <div>
    <div class="flex items-center">
      <div>切换主题色：</div>
      <ThemePicker />
    </div>
    <div>富文本编辑器：</div>
    <RichTextEditor :content.sync="content" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: ''
      };
    }
  };
</script>

<style></style>
