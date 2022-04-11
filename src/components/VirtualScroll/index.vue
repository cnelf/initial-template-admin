<template>
  <div ref="wrapElRef" :class="prefixCls" :style="getWrapStyle">
    <div :class="`${prefixCls}__container`" :style="getContainerStyle">
      <template v-for="(item, index) in getItems">
        <div :key="index" :class="`${prefixCls}__item`" :style="{ top: getItemTop(index) }">
          <slot :item="item" :index="index" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  function convertToUnit(str, unit = 'px') {
    if (str === undefined || str === null || str === '') {
      return undefined;
    } else if (isNaN(Number(str))) {
      return String(str);
    } else {
      return `${Number(str)}${unit}`;
    }
  }

  export default {
    name: 'VirtualScroll',

    props: {
      width: {
        type: [Number, String],
        default: 300
      },
      height: {
        type: [Number, String],
        default: 300
      },
      minWidth: {
        type: [Number, String],
        default: ''
      },
      minHeight: {
        type: [Number, String],
        default: ''
      },
      maxWidth: {
        type: [Number, String],
        default: ''
      },
      maxHeight: {
        type: [Number, String],
        default: ''
      },
      // 预加载条数
      bench: {
        type: [Number, String],
        default: 0
      },
      itemHeight: {
        type: [Number, String],
        required: true
      },
      items: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        prefixCls: 'virtual-scroll',
        state: {
          first: 0,
          last: 0,
          scrollTop: 0
        }
      };
    },

    computed: {
      getBench() {
        return parseInt(this.bench, 10);
      },
      getItemHeight() {
        return parseInt(this.itemHeight, 10);
      },
      getFirstToRender() {
        return Math.max(0, this.state.first - this.getBench);
      },
      getLastToRender() {
        return Math.min((this.items || []).length, this.state.last + this.getBench);
      },
      getContainerStyle() {
        return {
          height: convertToUnit((this.items || []).length * this.getItemHeight)
        };
      },
      getWrapStyle() {
        const style = {};
        const width = convertToUnit(this.width);
        const height = convertToUnit(this.height);
        const minWidth = convertToUnit(this.minWidth);
        const minHeight = convertToUnit(this.minHeight);
        const maxWidth = convertToUnit(this.maxWidth);
        const maxHeight = convertToUnit(this.maxHeight);

        width && (style.width = width);
        height && (style.height = height);
        minWidth && (style.minWidth = minWidth);
        minHeight && (style.minHeight = minHeight);
        maxWidth && (style.maxWidth = maxWidth);
        maxHeight && (style.maxHeight = maxHeight);

        return style;
      },
      getItems() {
        const items = this.items || [];
        return items.slice(this.getFirstToRender, this.getLastToRender);
      }
    },

    mounted() {
      this.state.last = this.getLast(0);
      this.$nextTick(() => {
        const wrapEl = this.$refs.wrapElRef;
        if (!wrapEl) {
          return;
        }
        wrapEl.addEventListener('scroll', this.onScroll);
      });
    },

    beforeDestroy() {
      const wrapEl = this.$refs.wrapElRef;
      wrapEl && wrapEl.removeEventListener('scroll', this.onScroll);
    },

    methods: {
      getFirst() {
        return Math.floor(this.state.scrollTop / this.getItemHeight);
      },

      getLast(first) {
        const wrapEl = this.$refs.wrapElRef;
        if (!wrapEl) {
          return 0;
        }
        const height = parseInt(this.height || 0, 10) || wrapEl.clientHeight;
        return first + Math.ceil(height / this.getItemHeight);
      },

      getItemTop(index) {
        const top = convertToUnit((this.getFirstToRender + index) * this.getItemHeight);
        return top;
      },

      onScroll() {
        const wrapEl = this.$refs.wrapElRef;
        if (!wrapEl) {
          return;
        }
        this.state.scrollTop = wrapEl.scrollTop;
        this.state.first = this.getFirst();
        this.state.last = this.getLast(this.state.first);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .virtual-scroll {
    position: relative;
    display: block;
    flex: 1 1 auto;
    overflow: auto;
    width: 100%;
    max-width: 100%;

    &__container {
      display: block;
    }

    &__item {
      position: absolute;
      right: 0;
      left: 0;
    }
  }
</style>
