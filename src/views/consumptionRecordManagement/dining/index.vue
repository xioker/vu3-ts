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
import { IDining, IDiningSearch } from '@/types/modules/consumptionRecord'
let searchForm = reactive<IDiningSearch>({
  personName: '', deptId: '', personTypeId: '', startTime: null, endTime: null })
let searchForms: any[] = [
  {el: 'input', prop: 'personName', label: '用户', placeholder: '请输入用户'},
  {el: 'select',  prop: 'deptId', label: '部门', placeholder: '请选择部门',options: [
    {label: '固定用户',value: '1'},{label: '不是',value: '2'},{label: '发生的',value: '3'}]},
  {el: 'select',  prop: 'personTypeId', label: '用户类型', placeholder: '请选择用户类型',options: [
    {label: '固定用户',value: '1'},{label: '不是',value: '2'},{label: '发生的',value: '3'}]},
  {el: 'timeRange', propStart: 'startTime', propEnd: 'endTime', label: '消费时间'},
  {el: 'button',options: [
    {name: '搜索',color: '#0081ff', icon:'search'},
    {name: '重置',color: '#6d7889', icon:'close'},
    {name: '导出',color: '#b7970b', icon:'upload'}]},
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