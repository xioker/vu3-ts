import { getToken } from '@/utils/token';
import router from '@/router'
import { userStore } from '@/store'
// import NProgress from 'ngprogress' 
// import 'nprogress/nprogress.css'

// NProgress.configure({ showSpinner: false })
// 白名单列表 不需要token
const whiteList = ['/login'] 

router.beforeEach((to, from, next) => {
  console.log(to,from,next)
  // NProgress.start()
  const token = getToken()
  console.log(token,"tkoen")
  if(token){
    if (to.path === '/login') {
      next({ path: '/' })
      // NProgress.done()
    }else{
      next()
    }
  }else{
    if(whiteList.indexOf(to.path) !== -1){
      next()
    }else{
      next(`/login`)
      // NProgress.done()
    }
  }
})

// router.afterEach(() => NProgress.done())