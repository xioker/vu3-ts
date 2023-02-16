import { IPage } from "@/types/common"
// 通知配置页面
export type IConfig = IConfigSearch & IPage
export interface IConfigSearch {
  name?: string,
  acct?: string,
  type?: string,
  read?: string,
  startTime?: string | null,
  endTime?: string | null
}
 
// 短信通知页面
export type IMessage  =  IConfigSearch & IPage

// 通知列表页面
export type IList  =  IConfigSearch & IPage



