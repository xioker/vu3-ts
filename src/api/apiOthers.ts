import http from './http'
// 获取钱包所有列表数据
export const walletAllList = ( data: {size: number}) => http.get({url: '/wallet/type/listAll', data })