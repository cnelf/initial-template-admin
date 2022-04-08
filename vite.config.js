import path from 'path';
import windiCSS from 'vite-plugin-windicss';
import visualizer from 'rollup-plugin-visualizer';
import svgIconsPlugin from 'vite-plugin-svg-icons';
import compressPlugin from 'vite-plugin-compression';
import Components from 'unplugin-vue-components/vite';
import { loadEnv } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { createHtmlPlugin } from 'vite-plugin-html';
import { ElementUiResolver } from 'unplugin-vue-components/resolvers';

export default (mode) => {
  return {
    server: {
      host: true,
      port: loadEnv(mode, process.cwd()).VITE_PORT
      // proxy: {
      //   '/': {
      //     target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
      //     changeOrigin: true,
      //     ws: true
      //   }
      // }
    },
    resolve: {
      // 配置别名
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        },
        {
          find: '@img',
          replacement: path.resolve(__dirname, 'src/assets/images')
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
          `
        }
      }
    },
    plugins: [
      createVuePlugin({ jsx: true }),
      windiCSS(),
      process.env.NODE_ENV === 'production' &&
        visualizer({
          open: false,
          gzipSize: true,
          brotliSize: true
        }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: loadEnv(mode, process.cwd()).VITE_APP_TITLE
          }
        }
      }),
      svgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[name]'
      }),
      compressPlugin({
        ext: '.gz'
      }),
      Components({
        resolvers: [ElementUiResolver()]
      })
    ]
  };
};
