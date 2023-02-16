<template>
  <!-- logo展示区域 -->
  <Logo />
  <!-- 侧边菜单栏 -->
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      router
      unique-opened
      text-color="#bfcbd9"
      active-text-color="#409eff"
      background-color="#1f2d3d"
      :collapse="isCollapse"
      :collapse-transition="true"
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
    >
      <menu-item v-for="item in menus" :key="item.path" :menus="item"/>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts" name="Menu">
import MenuItem from './MenuItem.vue'
import Logo from './Logo.vue'
import { settingStore } from '@/store'
const router = useRouter()
const route = useRoute()
const { isCollapse, showFooter, showLogo } = storeToRefs(settingStore())

const menus = computed(()=> {
  console.log(router)
  return router.options.routes.slice(2)
})
const activeMenu = computed(() => route.path)
</script>

<style scoped lang="less">
</style>