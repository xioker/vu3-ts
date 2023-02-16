<template>
  <div class="header">
    <!-- 是否折叠菜单 -->
    <Humburger />
    <!-- 右侧头像 -->
    <Avator />
  </div>
</template>

<script setup lang="ts">
import Humburger from './Humburger.vue'
import Avator from './Avator.vue'

</script>

<style lang="less" scoped>
  .header{
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>