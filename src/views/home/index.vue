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
    <div>Echarts图表</div>
    <Chart-View class="h-400px" :chart-option="chartOption" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: '',
        imgUrl: '',
        imgList: [],
        chartOption: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar'
            }
          ]
        }
      };
    }
  };
</script>

<style lang="scss" scoped></style>
