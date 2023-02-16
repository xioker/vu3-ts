import { IPage } from "@/types/common";

// 充值管理页面 离职结转页面 策略列表页面 充值策略管理页面 结转策略管理页面 清零策略管理页面
export type IRecharge = IPage & IRechargeSearch
export interface IRechargeSearch {
  name?: string,
  code?: string,
  startTime?: string | null,
  endTime?: string | null,
  personTypeId?: number | null | string,
  status?: number | string
}

// 离职结转页面

// 策略列表页面

// 充值策略管理页面

// 结转策略管理页面

// 清零策略管理页面