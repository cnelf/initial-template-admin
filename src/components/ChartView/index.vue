<template>
  <div ref="chart" class="chart-view"></div>
</template>

<script>
  import { throttle } from 'lodash-es';

  export default {
    name: 'ChartView',

    props: {
      option: {
        type: Object,
        default: () => {}
      }
    },

    watch: {
      option: {
        deep: true,
        handler(newVal) {
          this.setOption(newVal);
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
        // eslint-disable-next-line no-invalid-this
        this.chart && this.chart.resize();
      }, 200),

      initChart() {
        this.$nextTick(() => {
          const chartEl = this.$refs.chart;
          this.chart = this.$echarts.init(chartEl);
          this.setOption(this.option);
          this.chart.on('click', this.handleClick);
        });
      },

      handleClick(params) {
        this.$emit('click', params);
      },

      setOption(option) {
        this.clearChart();
        this.chart && this.chart.setOption(option);
      },

      clearChart() {
        this.chart && this.chart.clear();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .chart-view {
    height: 100%;
  }
</style>
