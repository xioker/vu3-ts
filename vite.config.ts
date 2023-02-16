import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from "vite-plugin-html";     // 动态设置网站标题
import vueSetupExtend from 'vite-plugin-vue-setup-extend'; // setup的name语法插件
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: '/',
    publicDir: 'static',
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    css: {
      modules: {},
      postcss: {},
      preprocessorOptions: {
        css: { charset: true, addtionalData: '' },
        scss: { charset: true, addtionalData: '' } ,
        less: { charset: true, addtionalData: `@import '@/src/assets/styles/index.less';`},
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      // 移除console
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    server: {
      // host: '0.0.0.0',
      // port: 10000,
      strictPort: true,
      open: true,
      cors: true,
      https: false,
      hmr: {},
      // proxy: {
      //   '/api': {
      //       target: '',
      //       changeOrigin: true,
      //       rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    plugins: [
      vue(),
      vueSetupExtend(),
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.ts',
        template: '/index.html',
        inject: {
          data: {
            title: 'xxx-new'
          },
        },
      }),
      // 配置自动导入elementPlus
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router', 'pinia']
      }),
      Components({ resolvers: [ElementPlusResolver()]}),
    ]
  }
})
