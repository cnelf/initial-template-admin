## 通用后台初始化模板

### 已完成

- 项目初始化
- eslint + stylelint + prettier
- husky + lint-staged
- 引入组件库
- 请求方法的封装
- 全局样式
- 通用过滤器
- 引入 WindiCSS
- Layout 布局
- 打包构建
- 登录页
- 404 错误页
- 通用组件
  - 主题色切换（ThemePicker）
  - 富文本编辑器（RichTextEditor）
  - 图片上传（UploadImage）
  - Echarts 图表（ChartView）
  - 分页器（Pagination）

### 待完成

- 权限路由
- Mock 模块
- 自动化测试
- Excel 上传和下载
- 多语言 i18n
- 通用组件
  - 空状态（EmptyView）
  - 视频播放器（VideoPlayer）
  - 全屏控制按钮（Screenfull）
  - 轮播图（Swiper）
  - 日历组件（Calendar）

### 常见问题

#### 依赖安装失败

项目使用了 `image-webpack-loader` 来进行图片的压缩，该 loader 内部又依赖于 `imagemin`，因为 `imagemin` 在国内安装困难，所以大概率是 `imagemin` 安装失败导致的问题。提供以下几个解决方案：

1. 使用 pnpm 或者 yarn 安装依赖（推荐，项目在 package.json 内置了优化相关的配置）

   ```json
   "resolutions": {
     "bin-wrapper": "npm:bin-wrapper-china"
   }
   ```

2. 使用 npm，在电脑 host 文件加上如下配置

   ```
   199.232.4.133 raw.githubusercontent.com
   ```

#### 安装 imagemin 依赖失败

如果使用 pnpm 和 yarn 还是不能安装依赖，可以将图片压缩功能移除，移除方法如下：

- 在 `package.json` 内删除 `image-webpack-loader` 这个依赖。这会导致图片没有压缩，但是可以手动到在线网站进行压缩。这里推荐[tinypng](https://tinypng.com/)
- 在 `vue.config.js` 内删除与 **图片压缩** 相关的配置信息。
