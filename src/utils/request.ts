import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { BASE_URL } from '@/common'
import { userStore } from '@/store'
import { logout } from '@/api/apiUser'
import { getToken, removeToken } from '@/utils/token'
import { ElMessageBox, ElMessage } from 'element-plus'
const router = useRouter()

const request:AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60
})

request.interceptors.request.use((config: AxiosRequestConfig) => {
  if(userStore().token && config.headers){
    config.headers['Authorization'] = getToken()
  }
  return config
}, (err: any) => {
  console.log(err,"请求错误信息")
  return Promise.reject(err)
})

request.interceptors.response.use((response: AxiosResponse ) => {
  const res = response.data
  if(res?.code === 200 || response.config?.responseType === 'blob'){
    return res
  }else if(res?.code === 532 && response.config.url?.indexOf('exit') === -1){
    ElMessageBox.confirm('当前登录信息已过期，请重新登录', '提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      closeOnPressEscape: false,
      closeOnClickModal: false,
      type: 'warning'
    }).then(async () => {
      await logout()
      removeToken()
      router.push(`/login`);
      ElMessageBox.close()
    }).catch(() => {ElMessageBox.close()});
  }else{
    res.msg && ElMessage.error({message: res.msg})
    // return Promise.reject(res)
  }
}, (err: any) => {
  console.log(err,"响应错误信息")
  return Promise.reject(err)
})

export default request