// pinia配置setting相关的数据类型
export interface ISetting {
  // 是否折叠菜单
  isCollapse: boolean,
  // 是否展示底部footer
  showFooter: boolean,
  // 是否显示菜单栏logo
  showLogo: boolean,
  [key:string]:any
}