<!--
 * @Description: 默认的首页
 * @Auth: xsl
 * @Date: 2022-10-13 17:09:37
 * @LastEditors: xsl
 * @LastEditTime: 2022-10-18 14:10:17
-->

<template>
  <div class="home">
    <span >登录成功！欢迎【xxx】登录 {{ setting.title }}</span>
  </div>
</template>

<script setup lang="ts" name="Home">
import setting from '@/setting'
</script>

<style lang="less" scoped>
.home{
  span{
    color: green; font-weight: bold
  }
}
</style>