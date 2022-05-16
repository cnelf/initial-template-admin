<template>
  <div class="screen-adapter" :style="style">
    <slot />
  </div>
</template>

<script>
  import { throttle } from 'lodash-es';

  export default {
    name: 'ScreenAdapter',

    // 参数注入
    props: {
      width: {
        type: [Number, String],
        default: '1920'
      },
      height: {
        type: [Number, String],
        default: '1080'
      }
    },

    data() {
      return {
        style: {
          width: this.width + 'px',
          height: this.height + 'px',
          transform: 'scale(1) translate(-50%, -50%)'
        }
      };
    },

    mounted() {
      this.setScale();
      window.addEventListener('resize', this.setScale);
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.setScale);
      });
    },

    methods: {
      // 获取放大缩小比例
      getScale() {
        const w = window.innerWidth / this.width;
        const h = window.innerHeight / this.height;
        return w < h ? w : h;
      },

      // 设置比例
      setScale: throttle(function () {
        // eslint-disable-next-line no-invalid-this
        this.style.transform = 'scale(' + this.getScale() + ') translate(-50%, -50%)';
      }, 500)
    }
  };
</script>

<style lang="scss" scoped>
  .screen-adapter {
    position: absolute;
    top: 50%;
    left: 50%;
    transition: 0.3s;
    transform-origin: 0 0;
  }
</style>
