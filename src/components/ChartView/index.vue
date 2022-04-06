<template>
  <div ref="chart"></div>
</template>

<script>
  import { throttle } from 'lodash-es';

  export default {
    name: 'ChartView',

    props: {
      chartOption: {
        type: Object,
        default: () => {}
      }
    },

    watch: {
      chartOption: {
        deep: true,
        handler(newVal) {
          this.setOptions(newVal);
        }
      }
    },

    mounted() {
      this.initChart();
      window.addEventListener('resize', this.resizeHandler);
    },

    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      window.removeEventListener('resize', this.resizeHandler);
      this.chart.dispose();
      this.chart = null;
    },

    methods: {
      resizeHandler: throttle(function () {
        // eslint-disable-next-line
        this.chart && this.chart.resize();
      }, 200),

      initChart() {
        this.$nextTick(() => {
          const chartEl = this.$refs.chart;
          this.chart = this.$echarts.init(chartEl);
          this.chart.setOption(this.chartOption);
          this.chart.on('click', this.handleClick);
        });
      },

      handleClick(params) {
        this.$emit('click', params);
      },

      setOptions(option) {
        this.clearChart();
        this.chart && this.chart.setOption(option);
      },

      clearChart() {
        this.chart && this.chart.clear();
      }
    }
  };
</script>

<style lang="scss" scoped></style>
