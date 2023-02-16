import qs from 'qs'
import request from "@/utils/request";
import { IHttp } from '@/types/http'

export default {
  post:function({ url = '', data = {}, responseType = 'json', headers = { 'Content-Type': 'application/json;charset=UTF-8' }}: IHttp){
    // 序列化 表单形式
    if(headers['Content-Type'].indexOf('www') != -1 ){
      return request({ url, data: qs.stringify(data), method: 'post', headers, responseType })
    }
    // 非序列化 json格式
    return request({ url, data, method: 'post', headers, responseType })
  },

  get:function({ url = '', data = {}, responseType = 'json',headers = { 'Content-Type': 'application/x-www-form-urlencoded' }}: IHttp){
    return request({ url, params:data, method: 'get', headers, responseType })
  },

  put:function({ url = '', data = {}, responseType = 'json', headers = { 'Content-Type': 'application/json;charset=UTF-8' }}: IHttp){
    // 字符串查询方式
    if(headers['Content-Type'].indexOf('www') != -1 ){
      return request({ url, params: data, method: 'put', headers, responseType })
    }
    // 非序列化 json格式
    return request({ url, data, method: 'put', headers, responseType })
  },
  
  delete:function({ url = '', data = {}, responseType = 'json',headers = { 'Content-Type': 'application/x-www-form-urlencoded' }}: IHttp){
    return request({ url, params:data, method: 'delete', headers, responseType })
  },
}