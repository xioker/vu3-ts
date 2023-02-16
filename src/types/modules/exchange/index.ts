import { IPage } from "@/types/common"
// 商品管理页面
export type IGoods = IGoodsSearch & IPage
export interface IGoodsSearch {
  name?: string,
  code?: string,
  source?: string,
  startTime?: string | null,
  endTime?: string | null
}
 
// 入库管理页面
export type IIcoming  =  IGoodsSearch & IPage

// 退货管理页面
export type IDelivery  =  IGoodsSearch & IPage

// 库存管理页面
export type IStock  =  IGoodsSearch & IPage

// 数据统计页面
export type IProfit  =  IGoodsSearch & IPage



