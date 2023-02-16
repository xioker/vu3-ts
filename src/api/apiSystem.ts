/*
 * @Description: 系统管理接口
 * @Auth: xsl
 * @Date: 2022-09-02 09:37:26
 * @LastEditors: xsl
 * @LastEditTime: 2022-12-29 16:09:39
 */

import http from './http'

// 获取用户账号列表
export const userLists = (data: any) => http.get({url:'/sys/user/list', data})
// 获取单个用户信息
export const userList = (data: any) => http.get({url:'/sys/user', data})
// 获取登录用户个人信息
export const userSelf = () => http.get({url: '/sys/user/self' })
// 新增用户账号
export const addUser = (data: any) => http.post({url: '/sys/user', data})
// 删除用户
export const deleteUser = (data: any) => http.delete({url: '/sys/user', data})
// 修改用户信息
export const putUser = (data: any) => http.post({url:'/sys/user/update', data})
// 重置密码
export const resetPassword = (data: any) => http.get({url:'/sys/user/rebuildPasswrod', data})


// 获取角色列表接口
export const roleList = (data) => http.get('/sys/role/list', data)
// 获取角色信息
export const roleDetail = (data) => http.get('/sys/role', data)
// 新增角色
export const addRole = (data) => http.post('/sys/role', data)
// 删除角色
export const deleteRole = (data) => http.delete('/sys/role', data)
// 修改角色信息
export const putRole = (data) => http.put('/sys/role', data)
// 给角色设置权限
export const giveRole = (data) => http.post('/sys/role/givePressionToRole', data)

// 获取权限管理列表接口
export const menuList = (data) => http.get('/sys/menu/list', data)
// 获取权限管理详情
export const menuDetail = (data) => http.get('/sys/menu', data)
// 新增权限管理
export const addMenu = (data) => http.post('/sys/menu', data)
// 删除权限管理
export const deleteMenu = (data) => http.delete('/sys/menu', data)
// 修改权限管理
export const putMenu = (data) => http.put('/sys/menu', data)

// 获取系统登录记录列表数据
export const loginList = (data) => http.post('/log/login/list', data)
// 获取操作记录列表数据
export const operList = (data) => http.post('/log/oper/list', data)