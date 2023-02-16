<!--
 * @Description: 登录页面
 * @Auth: xsl
 * @Date: 2022-10-13 10:05:31
 * @LastEditors: xsl
 * @LastEditTime: 2023-02-16 11:13:29
-->

<template>
  <!-- <canvas id="cvs" style="background-color:#237da3"></canvas> -->
  <canvas id="cvs"></canvas>
  <!-- 登录表单 -->
  <div class="login">
    <el-card class="loginBox">
      <el-form
        ref="loginForm"
        :model="loginForms"
        :rules="loginRules"
        class="loginForm"
        auto-complete="on"
        label-position="left"
        >
          <div class="title-container"><h3 class="title">{{ setting.title }}</h3></div>
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForms.username"
              placeholder="请输入用户名称"
              :prefix-icon="User"
              name="username"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="loginForms.password"
              type="password"
              placeholder="请输入用户密码"
              :prefix-icon="Unlock"
              name="password"
              show-password
              @keyup.enter.native="onLogin"
            />
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click.native.prevent.stop="onLogin"
            >{{ btn }}</el-button
          >
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="Login">
import type { ElForm } from 'element-plus'
import { ILogin } from '@/types/modules/login'
import { useRender, useRraw } from '@/hooks'
import setting from '@/setting'
import { User, Unlock } from '@element-plus/icons-vue'
import { login } from '@/api/apiUser'
import { setToken } from '@/utils/token'
import { userStore } from '@/store'
const router = useRouter()
const useUser = userStore()

const canvasRender = () => {
  const { render } = useRender('#cvs')
  render()
}

window.addEventListener('resize',canvasRender)
onMounted(() => canvasRender())
onUnmounted(() => window.removeEventListener('resize',canvasRender))
let loginRules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "change" }],
  password: [{ required: true, message: "密码不能为空", trigger: "change" }]
}
let loginForms = reactive<ILogin>({ username: '', password: ''})

// 登录按钮事件方法
let btn = ref<string>('登录')
let loading = ref<boolean>(false)
const loginForm = ref()
const onLogin =  (): void => {
  loginForm.value?.validate( async (valid: boolean) => {
    if(valid) {
      loading.value = true
      btn.value = '正在登录'
      try {
        let res = await login(loginForms)
        useUser.setUserToken(res.data.token)
        setToken(res.data.token)
        router.push('/home')
      } catch (error) {
        btn.value = '登录'
        loading.value = false
      }
      // todo... api
      
    }
    useUser.setUserToken('res.data.token')
    setToken('res.data.token')
    router.push('/home')
  })
}
// type FormInstance = InstanceType<typeof ElForm>;
// const loginFormRef = ref<FormInstance>();
// const onLogin = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   await formEl.validate((valid: boolean) => {
//     if(valid) {
//       loading.value = true
//       console.log("登录")
//     }
//   })
// }
</script>

<style scoped lang="less">
.arrow-button {
    position: relative;
    width: 180px;
    height: 64px;
    background: #f49714;

    &::after {
        content: "";
        position: absolute;
        width: 32px;
        height: 64px;
        top: 0;
        right: -32px;
        background: 
            linear-gradient(-45deg, transparent 0, transparent 22px, #f49714 22px, #f49714 100%),
            linear-gradient(-135deg, transparent 0, transparent 22px, #f49714 22px, #f49714 100%);
        background-size: 32px 32px;
        background-repeat: no-repeat;
        background-position: 0 bottom, 0 top;
    }
}

#cvs{
  overflow: hidden;
  background-image: url('@/assets/images/background2.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  user-select: none;
}
.login{
  overflow: hidden;
  // background-image: linear-gradient(-225deg, #473B7B 0%, #237da3 51%, #30D2BE 100%);
  .loginBox{
    width: 500px;
    height: 400px;
    box-shadow: 0 0px 8px #f4d7dc;
    margin:  200px auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .loginForm{
      .el-form-item{
        margin-bottom: 40px;
        .el-input{
          height: 45px;
        }
      }
      .el-button{
        height: 45px;
      }
      .title-container{
        font-size: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    
  }
}
</style>