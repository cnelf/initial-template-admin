<template>
  <div class="page-container">
    <div class="text-primary">主题色文本</div>
    <div class="flex items-center">
      <div>切换主题色：</div>
      <ThemePicker />
    </div>
    <div>富文本编辑器：</div>
    <RichTextEditor :content.sync="content" />
    <div>上传图片：</div>
    <UploadImage :img-url.sync="imgUrl" :img-list.sync="imgList" :limit="1" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: '',
        imgUrl: '',
        imgList: []
      };
    }
  };
</script>

<style lang="scss" scoped></style>
