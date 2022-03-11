const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV !== 'development' ? process.env.VUE_APP_SOURCE_DOMAIN : '',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: process.env.VUE_APP_PORT,
    open: false,
    https: false,
    proxy: {
      '/': {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        ws: true
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @use "sass:math";
        `
      }
    }
  },
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      // 开启预加载
      config.plugin('preload').tap(() => [
        {
          rel: 'preload',
          fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
          include: 'initial'
        }
      ]);

      // 移除prefetch
      config.plugins.delete('prefetch');

      // 打包文件加hash
      config.output.filename('assets/js/[name].[hash:8].js').chunkFilename('assets/js/[name].[hash:8].js').end();

      // 分包优化
      config.optimization.splitChunks({
        chunks: 'all',
        maxInitialRequests: Infinity, // 默认为3，调整为允许无限入口资源
        minSize: 20000, // 20K以下的依赖不做拆分
        cacheGroups: {
          vendors: {
            // 拆分依赖，避免单文件过大拖慢页面展示
            name(module) {
              // 拆包
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`; // 部分服务器不允许URL带@
            },
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          }
        }
      });
      config.optimization.runtimeChunk('single');

      // 图片压缩
      config.module
        .rule('image')
        .test(/\.(jpe?g|png|gif|svg)$/i)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: {
            progressive: true
          },
          optipng: {
            enabled: false
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4
          },
          gifsicle: {
            interlaced: false
          },
          webp: {
            quality: 75
          },
          svgo: {
            plugins: [
              {
                name: 'removeViewBox'
              },
              {
                name: 'removeEmptyAttrs',
                active: false
              }
            ]
          }
        })
        .end();

      // gzip压缩
      config.plugin('gzip').use(CompressionWebpackPlugin, [
        {
          algorithm: 'gzip',
          test: /(\.js|\.css)$/,
          threshold: 10240,
          minRatio: 0.6
        }
      ]);
    });

    // 配置别名
    config.resolve.alias.set('@', resolve('src')).set('@img', resolve('src/assets/images'));

    // svg-sprite-loader
    config.module.rule('svg').uses.clear(); // 清除默认的file-loader
    config.module
      .rule('svg')
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });

    // html-webpack-plugin
    config.plugin('html').tap((args) => {
      args[0].title = '花儿绽放后台基础模板';
      args[0].meta = {
        viewport:
          'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no',
        'X-UA-Compatible': {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge'
        },
        'Cache-Control': {
          'http-equiv': 'Cache-Control',
          content: 'no-cache, no-store, must-revalidate'
        },
        Pragma: {
          'http-equiv': 'Pragma',
          content: 'no-cache'
        },
        Expires: {
          'http-equiv': 'Expires',
          content: '0'
        },
        'utf-8': {
          charset: 'utf-8'
        }
      };
      return args;
    });
  }
};
