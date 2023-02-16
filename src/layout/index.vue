<template>
  <el-container>
    <!-- 左侧菜单栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'" :class="{ 'has-logo': showLogo }"><Menu /></el-aside>
    <el-container>
      <!-- 头部内容 -->
      <el-header><Header /></el-header>
      <!-- 主题内容区域 -->
      <el-main>
        <router-view />
      </el-main>
      <!-- 底部内容区域 -->
      <el-footer v-if="showFooter"><Footer /></el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="Layout">
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { settingStore } from '@/store'
const { isCollapse, showFooter, showLogo } = storeToRefs(settingStore())

</script>

<style scoped>

</style>