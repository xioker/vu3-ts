import { IUser, IPutPersonDisable, IUserSearch } from '@/types/modules/users';
import { ILogin } from '@/types/modules/login';
import http from './http'

// 用户登录接口 
export const login = (data:ILogin) => http.post({url: '/login', data});
// 用户退出登录
export const logout = () => http.post({url: '/login/exit'})
// 登录用户的个人信息
export const userSelf = () => http.get({url: '/sys/user/self'})
// 获取菜单树
export const menus = () => http.get({url: '/sys/menu/getMeunuForLogin'})
// 获取权限菜单树
export const roleMenus = () => http.get({url: '/sys/menu/getAllMenuAndMehods'})

// 获取消费用户列表全部为正常的
export const personOptionList = () => http.get({url: '/person/list/option'})
// 获取消费用户列表接口
export const personList = (data:IUser) => http.get({url: '/person/list', data})
// 获取消费用户详情
export const personDetail = (data:any) => http.get({url: '/person', data})
// 新增消费用户
export const addPerson = (data:any) => http.post({url: '/person', data})
// 删除消费用户
export const deletePerson = (data: {ids: number}) => http.delete({url: '/person', data})
// 上传用户文件
export const putPersonFiles = (data:any) => http.post({url: '/person/files/stream', data})
// 上传用户照片
export const putPersonPhoto = (data:any) => http.put({url: '/person/photo/stream', data})
// 修改消费用户
export const putPerson = (data:any) => http.put({url: '/person', data, headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }})
// 禁用启用消费用户
export const putPersonDisable = (data:IPutPersonDisable) => http.put({url:'/person/disable', data, headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }})
// 删除用户文件
export const deletePersonFile = (data:any) => http.delete({url: '/person/file', data})
// 导出excel文件
export const exportExcel = (data:IUserSearch) => http.get({url: '/person/exportPerson', data, responseType: "blob"})
// 导入excel文件
export const importExcel = (data:any) => http.post({url: '/person/importTest', data, responseType: "blob", headers: {'Content-Type': 'mutipart/form-data'}})
// 导出excel模板文件
export const exportExcelTemplate = () => http.get({url: '/person/getExportTemplate',responseType: "blob"})
// 编辑获取文件列表
export const getFilesData = (data:any) => http.get({url: 'person/files/display', data})

// 用户分类接口
export const personListType = () => http.get({url: '/person/type/listType'})
// 获取消费用户类型列表
export const personTypeList = () => http.get({url: '/person/type/list'})
// 获取用户类型详情
export const personTypeDetail = (data:any) => http.get({url: '/person/type', data})
// 新增用户类型
export const addPersonType = (data:any) => http.post({url: '/person/type', data})
// 修改用户类型
export const putPersonType = (data:any) => http.put({url: '/person/type', data})
// 删除用户类型
export const deletePersonType = (data:any) => http.delete({url: '/person/type', data})

// 获取部门信息
export const deptLists = (data:any) => http.get({url: '/dept/list', data})
// 获取单个部门信息
export const deptList = (data:any) => http.get({url: '/dept', data})
// 获取所有部门树信息
export const treeLists = () => http.get({url: '/dept/tree/list'})
// 获取单个树部门信息
export const treeList = (data:any) => http.get({url: '/dept/tree', data})
// 获取为禁用部门树
export const treeNormalList = (data:any) => http.get({url: '/dept/tree/getNormalTree', data})
// 新增部门
export const addDept = (data:any) => http.post({url: '/dept', data})
// 修改部门
export const putDept = (data:any) => http.put({url: '/dept', data})
// 删除部门
export const deleteDept = (data:any) => http.delete({ url: '/dept', data})