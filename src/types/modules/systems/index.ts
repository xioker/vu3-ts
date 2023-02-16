import { IPage } from "@/types/common"
// 账户页面
export type IAccount = IAccountSearch & IPage
export interface IAccountSearch {
  acct: string,
  role: number | null,
  status: number | null | string
}

// 角色页面
export type IRole = IRoleSearch & IPage
export interface IRoleSearch {
  name: string,
  status: number | null | string
}

// 权限页面
export type IAuthority = IAuthoritySearch & IPage
export interface IAuthoritySearch {
  name: string,
  key: string
}

// 操作日志页面
export type IOperation = IOperationSearch & IPage
export interface IOperationSearch {
  name: string,
  ip: string,
  startTime: null | string,
  endTime: null | string,
}