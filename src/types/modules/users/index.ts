import { IPage } from "@/types/common"
// 用户页面
export type IUser = IUserSearch & IPage
export interface IUserSearch {
  name:string,
  code:string,
  personTypeId:string,
  personTypeTypeId: string,
  money: string,
  walletTypeId: string,
  judge: string,
  deptId: null | number
}
export interface IPutPersonDisable {
  id: number,
  status: number
}
 



// 部门页面
export type IDept  =  IDeptSearch & IPage
export interface IDeptSearch {
  name:string,
  status: string | number,
  [key:string]: any
}


