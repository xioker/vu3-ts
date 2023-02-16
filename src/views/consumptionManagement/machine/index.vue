<template>
  <!-- 用户搜索表单 按钮 布局 -->
  <SearchForm :model="searchForm" :forms="searchForms" @btnClick="onBtnSearchForm"/>
  <!-- 表格内容数据 布局-->
  <Table :data="pageData.tableData" :columns="columns">
    <template v-slot:action="{data}">
      <el-link type="warning">禁用</el-link>
      <el-link type="primary">编辑</el-link>
      <el-link type="danger">查看</el-link>
      <el-link type="primary">删除</el-link>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { IMachine, IMachineSearch } from '@/types/modules/consumption'
let searchForm = reactive<IMachineSearch>({sn:'', name: '', ip: '', status: '', type: ''})
let pageData = reactive({
  tableData: []
})
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
let searchForms: any[] = [
  {el: 'input', prop: 'sn', label: '消费机编号', placeholder: '请输入消费机编号'},
  {el: 'input',  prop: 'name', label: '消费机名称', placeholder: '请输入消费机名称'},
  {el: 'input',  prop: 'ip', label: '消费机ip地址', placeholder: '请输入消费机ip地址'},
  {el: 'select',  prop: 'status', label: '状态', placeholder: '请选择状态',
    options: [{label: '固定用户',value: '1'},{label: '不是',value: '2'},{label: '发生的',value: '3'}]},
  {el: 'select',  prop: 'type', label: '消费机类型', placeholder: '请选择消费机类型',options: [
    {label: '固定用户',value: '1'},{label: '不是',value: '2'},{label: '发生的',value: '3'}]},
  {el: 'button',options: [
    {name: '搜索',color: '#0081ff', icon:'search'},
    {name: '重置',color: '#6d7889', icon:'close'},
    {name: '新增',color: '#07b86c', icon:'plus'}]},
]

const onBtnSearchForm = (name: string) => {
  console.log(name)
}
</script>

<style scoped>

</style>