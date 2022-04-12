import path from 'path';
import windiCSS from 'vite-plugin-windicss';
import visualizer from 'rollup-plugin-visualizer';
import svgIconsPlugin from 'vite-plugin-svg-icons';
import compressPlugin from 'vite-plugin-compression';
import Components from 'unplugin-vue-components/vite';
import autoprefixer from 'autoprefixer';
import { loadEnv } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { createHtmlPlugin } from 'vite-plugin-html';
import { ElementUiResolver } from 'unplugin-vue-components/resolvers';

export default ({ mode, command }) => {
  const root = process.cwd();
  const { VITE_ENV, VITE_PORT, VITE_DROP_CONSOLE, VITE_APP_TITLE } = loadEnv(mode, root);

  return {
    root,
    server: {
      host: true,
      port: VITE_PORT
      // proxy: {
      //   '/': {
      //     target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
      //     changeOrigin: true,
      //     ws: true
      //   }
      // }
    },
    build: {
      minify: 'terser',
      target: 'es2015',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE
        }
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000
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
      },
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
          })
        ]
      }
    },
    plugins: [
      createVuePlugin({ jsx: true }),
      windiCSS(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: VITE_APP_TITLE
          }
        }
      }),
      svgIconsPlugin({
        iconDirs: [path.resolve(root, 'src/icons/svg')],
        symbolId: 'icon-[name]'
      }),
      Components({
        resolvers: [ElementUiResolver()]
      }),
      compressPlugin({
        ext: '.gz'
      }),
      VITE_ENV === 'production' &&
        visualizer({
          open: false,
          gzipSize: true,
          brotliSize: true
        })
    ].filter(Boolean)
  };
};
