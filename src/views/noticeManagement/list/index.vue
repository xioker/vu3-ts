<template>
  <SearchForm :model="searchForm" :forms="searchForms" @btnClick="onBtnSearchForm"/>
  <!-- 表格内容数据 布局-->
  <Table :data="pageData.tableData" :columns="columns">
    <template v-slot:action="{data}">
      <el-link type="warning">启用</el-link>
      <el-link type="primary">编辑</el-link>
      <el-link type="danger">查看</el-link>
      <el-link type="primary">删除</el-link>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { IConfig, IConfigSearch } from '@/types/modules/notice'
let searchForm = reactive<IConfigSearch>({name: '', read: '', type: '', startTime: null, endTime: null })
let searchForms: any[] = [
  {el: 'input', prop: 'acct', label: '账号名', placeholder: '请输入账号名'},
  {el: 'select', prop: 'acct', label: '通知类型', placeholder: '请选择通知类型', options: [
    { label: '但是', value: '1'}
  ]},
  {el: 'select', prop: 'acct', label: '阅读状态', placeholder: '请选择阅读状态', options: [
    { label: '但是', value: '1'}
  ]},
  {el: 'timeRange', propStart: 'startTime', propEnd: 'endTime', label: '时间'},
  {el: 'button',options: [
    {name: '搜索',color: '#0081ff', icon:'search'},
    {name: '重置',color: '#6d7889', icon:'close'}]},
]
let columns: any[] = [
  {label: '用户', prop: 'name'},
  {label: '性别', prop: 'gender'},
  {label: '用户号', prop: 'code'},
  {label: '所属部门', prop: 'deptName'},
  {label: '联系电话', prop: 'tel'},
  {label: '用户类型', prop: 'personTypeName'},
  {label: '消费模式', prop: 'payTypes'},
  {label: '钱包信息', prop: 'wallets'},
  {columnType: 'slot', slotName: 'action', label: '操作', prop: 'action', showTooltip: true },
]
let pageData = reactive({
  tableData: []
})

const onBtnSearchForm = (name: string) => {
  console.log(name)
}
</script>

<style scoped>

</style>