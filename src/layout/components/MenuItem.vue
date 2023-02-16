<template>
  <!-- 存在子集菜单 -->
  <template v-if="comHasChild">
    <el-sub-menu :index="props.menus.path">
      <template #title>
        <el-icon><component :is="props.menus.meta.icon" /></el-icon>
        <span>{{ props.menus.meta.title}}</span>
      </template>
      <menu-item
        v-for="child in menus.children"
        :key="child.path"
        :menus="child"
      />
  </el-sub-menu>
  </template>
  <!-- 不存在子集菜单 -->
  <el-menu-item v-else :index="props.menus.path">
    <el-icon><HelpFilled /></el-icon>
    <span>{{props.menus.meta.title}}</span>
  </el-menu-item>
</template>

<script setup lang="ts" name="MenuItem">
const props = withDefaults(defineProps<{
  menus: any
}>(),{
  menus: () => {}
})

// 是否存在子集菜单
let comHasChild = computed(() => {
  return props.menus?.children?.length
})
</script>

<style scoped>

</style>