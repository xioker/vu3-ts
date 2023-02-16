<template>
  <!-- 折叠状态菜单 -->
  <el-icon v-if="useSetting.isCollapse" :size="22" @click.native="onCollapse(1)"><Fold /></el-icon>
  <!-- 非折叠状态 -->
  <el-icon v-else :size="22" @click.native="onCollapse(0)"><Expand /></el-icon>
</template>

<script setup lang="ts">
import { settingStore } from '@/store'
const useSetting = settingStore()

// 是否折叠菜单事件函数
const onCollapse = (index: number) => {
  index ? useSetting.changeCollapse(false) : useSetting.changeCollapse(true)
}
</script>

<style lang="less" scoped>
</style>