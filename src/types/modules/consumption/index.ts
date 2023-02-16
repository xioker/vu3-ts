import { IPage } from '@/types/common';
// 消费机页面
export type IMachine = IMachineSearch & IPage
export interface IMachineSearch {
  sn: string,
  name: string,
  ip: string,
  status: string,
  type: string,
}

// 消费卡页面
export type ICard = ICardSearch & IPage
export interface ICardSearch {
  code: string,
  personName: string,
  personCode: string,
  personGender: string,
  deptId: null | number,
  personTypeId: null | number,
  status: string,
}

// 消费时段 消费模式 页面
export type ITime = ITimeSearch & IPage
export interface ITimeSearch {
  name: string,
  status: string,
}

