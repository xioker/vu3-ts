<template>
  <!-- 下拉菜单 -->
  <el-dropdown trigger="click">
    <el-avatar shape="square" :src="squareUrl" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click.native="isVisible = true">个人信息</el-dropdown-item>
        <el-dropdown-item divided @click.native="onLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 个人信息弹窗 -->
  <Dialog v-model:isVisible="isVisible" draggable title="个人信息">
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  </Dialog>
</template>

<script setup lang="ts" name="Avator">
import { logout } from '@/api/apiUser'
import { removeToken } from '@/utils/token'
const router = useRouter()
let isVisible = ref<boolean>(false)
// 头像地址
let squareUrl:string = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
// 退出登录事件
const onLogout = async () => {
  let res = await logout()
  if(res) {
    removeToken()
    router.push('/login')
  }
}
</script>

<style scoped>

</style>