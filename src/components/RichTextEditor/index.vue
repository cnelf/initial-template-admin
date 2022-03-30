<template>
  <div id="wangeditor" class="editor">
    <div v-show="false" ref="toolbar" />
    <div ref="editorElem" />
  </div>
</template>

<script>
  import E from 'wangeditor';

  export default {
    name: 'EditorElem',

    props: {
      menus: {
        type: Array,
        default: () => [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'lineHeight',
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'justify', // 对齐方式
          'undo', // 撤销
          'redo' // 重复
        ]
      },
      content: {
        type: String,
        default: ''
      },
      onlyContent: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        temp: '', // 缓存当前的编辑器中的值，用于与父组件传入值进行对比
        editor: null
      };
    },

    watch: {
      content(val) {
        if (this.editor && val !== this.temp) {
          this.editor.txt.html(this.content);
        }
      }
    },

    mounted() {
      this.editor = this.onlyContent ? new E(this.$refs.toolbar, this.$refs.editorElem) : new E(this.$refs.editorElem);

      this.editor.config.onchange = (html) => {
        this.temp = this.editor.txt.html();
        this.$emit('update:content', html);
      };

      // 菜单配置
      this.editor.config.menus = this.menus;
      this.editor.config.styleWithCSS = true;
      this.editor.config.showFullScreen = false;
      this.editor.config.zIndex = 0;
      this.editor.config.focus = false;

      // 字体配置
      this.editor.config.fontNames = [
        '黑体',
        '仿宋',
        '楷体',
        '标楷体',
        '华文仿宋',
        '华文楷体',
        '宋体',
        '微软雅黑',
        'Arial',
        'Times New Roman',
        'Courier New'
      ];

      // 颜色配置
      this.editor.config.colors = [
        '#b12317',
        '#eb3223',
        '#f6c143',
        '#fffd54',
        '#4eab5b',
        '#4bafea',
        '#2b70ba',
        '#05215c',
        '#673799',

        '#ffffff',
        '#000000',
        '#e7e6e6',
        '#475468',
        '#df8244',
        '#a5a5a5',
        '#f6c143',
        '#689ad0',
        '#7eaa55',

        '#bfbfbf',
        '#3f3f3f',
        '#747070',
        '#8796ae',
        '#ebb38a',
        '#c9c9c9',
        '#fad977',
        '#a4c1e2',
        '#b0ce94',

        '#a5a5a5',
        '#262626',
        '#3a3838',
        '#353f4e',
        '#b86029',
        '#7b7b7b',
        '#b99130',
        '#3f75b0',
        '#5d7f3f',

        '#7e7e7e',
        '#0b0b0b',
        '#171616',
        '#242a34',
        '#7b401a',
        '#525252',
        '#7a601c',
        '#2a4e76',
        '#3e5529'
      ];

      // 创建富文本实例
      this.editor.create();
      this.editor.txt.html(this.content || '');
    },

    beforeDestroy() {
      // 销毁编辑器
      this.editor.destroy();
      this.editor = null;
    }
  };
</script>

<style lang="scss" scoped>
  .editor ::v-deep {
    line-height: normal;

    .w-e-droplist {
      width: 246px !important;

      .w-e-item {
        font-size: 16px;
        line-height: 21px;
      }
    }

    .w-e-toolbar {
      border-color: #dcdfe6 !important;
    }

    .w-e-text-container {
      border-color: #dcdfe6 !important;
      height: 240px !important;
    }

    .w-e-toolbar,
    .w-e-text-container,
    .w-e-menu-panel {
      background-color: transparent !important;
    }

    .w-e-text {
      padding: 10px !important;
    }

    .w-e-text-container p {
      margin: 0 !important;
      font-size: 14px !important;
    }
  }
</style>
