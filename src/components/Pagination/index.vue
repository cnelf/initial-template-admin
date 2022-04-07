<template>
  <el-pagination
    v-if="!hidden"
    :background="background"
    :current-page="pageIndex"
    :page-size="pageSize"
    :layout="layout"
    :page-sizes="pageSizes"
    :total="total"
    v-bind="$attrs"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script>
  import { scrollTo } from '@/utils';

  export default {
    name: 'Pagination',

    props: {
      total: {
        type: Number,
        default: 0
      },
      pageIndex: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 20
      },
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 50];
        }
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      background: {
        type: Boolean,
        default: true
      },
      autoScroll: {
        type: Boolean,
        default: true
      },
      hidden: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      handleSizeChange(val) {
        this.$emit('update:page-size', val);
        this.$emit('update:page-index', 1);
        this.$emit('pagination');
        if (this.autoScroll) {
          scrollTo(0, 600);
        }
      },

      handleCurrentChange(val) {
        this.$emit('update:page-index', val);
        this.$emit('pagination');
        if (this.autoScroll) {
          scrollTo(0, 600);
        }
      }
    }
  };
</script>

<style lang="scss" scoped></style>
