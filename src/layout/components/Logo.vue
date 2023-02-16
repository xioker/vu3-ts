<template>
  <div class="logo-container" v-if="showLogo">
    <transition name="logoFade">
      <router-link class="link" to="/">
        <!-- logo图片 -->
        <img :src="logoSrc" class="logo" alt="logo" />
        <!-- 名称标题 -->
        <h3 v-show="!isCollapse">{{ setting.title }}</h3>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import { settingStore } from '@/store'
const { isCollapse, showFooter, showLogo, logoSrc } = storeToRefs(settingStore())
</script>

<style scoped lang="less">
.logoFade-enter-active {
  transition: opacity 1.5s;
}
.logoFade-enter,.logoFade-leave-to {
  opacity: 0;
}
.logo-container{
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #2b2f3a;
  text-align: center;
  overflow: hidden;
  .link{
    text-decoration: none;
    color: #fff;
    font-weight: 600;
  }
  .logo{
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
  h3{
    margin-left: 10px;
    font-size: 14px;
    display: inline;
    vertical-align: middle;
  }
}
</style>