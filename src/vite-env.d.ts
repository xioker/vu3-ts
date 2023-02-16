/// <reference types="vite/client" />
declare module '*.ts'
declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'ngprogress'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


