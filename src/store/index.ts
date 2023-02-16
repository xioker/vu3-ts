import { defineStore } from 'pinia'
import { ISetting } from '@/types/store'
import setting from '@/setting'
import { getToken } from '@/utils/token'

// 用户相关的状态存储
export const userStore = defineStore('user', {
  state: () => {
    return {
      token: getToken() ?? '',
      userInfo: '',
      menus: [],
      
    }
  },
  getters: {
    
  },
  actions: {
    // 设置用户token
    setUserToken(token:string){
      this.token = token
    },
    // 清除用户token
    removeUserToken(){
      this.token = ''
    }
  }
})

// 设置相关的状态存储
export const settingStore = defineStore('setting', {
  state: ():ISetting => {
    return {
      isCollapse: false,
      showFooter: setting.showFooter,
      showLogo: setting.showLogo,
      logoSrc: setting.logoSrc
    }
  },
  getters: {},
  actions: {
    // 改变菜单折叠的状态
    changeCollapse(paload:boolean){
      this.isCollapse = paload
    },
    // 改变页面底部显示
    changeFooter(paload:boolean){
      this.showFooter = paload
    }
  }
})