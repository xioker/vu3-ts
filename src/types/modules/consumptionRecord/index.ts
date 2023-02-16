import { IPage } from "@/types/common";

// 食堂消费记录页面
export type IDining = IPage & IDiningSearch
export interface IDiningSearch {
  personName: string,
  deptId: string,
  personTypeId: number | null | string,
  startTime: string | null,
  endTime: string | null
}

// 消费退补记录页面
export type IReturn = IPage & IReturnSearch
export interface IReturnSearch {
  name: string,
  code: string,
  startTime: string | null,
  endTime: string | null
}

// 账单记录页面
export type IBill = IPage & IBillSearch
export interface IBillSearch {
  personName: string,
  goodName: string,
  orderId: string,
}

// 小超市消费页面
export type IExchange = IPage & IExchangeSearch
export interface IExchangeSearch {
  orderId: string,
  personName: string,
  personCode: string,
  personTypeName: string,
  startTime: string | null,
  endTime: string | null
}

