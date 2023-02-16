import { ComponentPublicInstance, createApp } from 'vue'
// 初始化样式 全局样式
import 'normalize.css'
import '@/assets/styles/index.less'
import 'element-plus/dist/index.css'

// 使用路由以及状态存储
import { createPinia } from 'pinia'
import router from '@/router'

// 其它
import '@/permission'
import { ElMessage, ElMessageBox } from 'element-plus'

// 引入主文件app
import App from '@/App.vue'
const app = createApp(App)


app.config.globalProperties.$message = ElMessage;
app.config.globalProperties.$messageBox = ElMessageBox;
app.config.errorHandler = (err:unknown, vm: ComponentPublicInstance | null, info: string): void => {
  console.log(err, info)
}

// 引入elmentplus icons图标
import * as ElIcons from '@element-plus/icons-vue'
for (const name in ElIcons){
  app.component(name,(ElIcons as any)[name])
}
app.use(createPinia())
app.use(router)
app.mount('#app')
