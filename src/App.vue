<template>
  <el-config-provider size="large" :z-index="3000" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
// 全局设置elemnplus大小 层级
import { ElConfigProvider } from 'element-plus'
// 中英文切换包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped>
</style>
