<template>
  <!-- 搜索表单 按钮 布局 -->
  <SearchForm :model="searchForm" :forms="searchForms" @btnClick="onBtnSearchForm" />
  <!-- 表格数据内容 布局 -->
  <Table :data="pageData.tableData" :columns="columns">
    <template v-slot:action="{data}">
      <el-link :underline="false" style="color:#F43131">禁用</el-link>
      <el-link :underline="false" style="color:#258510">编辑</el-link>
      <el-link :underline="false" style="color:#0081FF">查看</el-link>
      <el-link :underline="false" style="color:#F43131">删除</el-link>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { IRoleSearch, IAccount } from '@/types/modules/systems'
import { ElLink } from 'element-plus';
let searchForm = reactive<IRoleSearch>({name: '', status: ''})
let searchForms = reactive([
  {el: 'input',  prop: 'name', label: '角色名称', placeholder: '请输入角色名称'},
  {el: 'select',  prop: 'status', label: '状态', placeholder: '请选择状态',
    options: [{label: '固定用户',value: '1'},{label: '不是',value: '2'},{label: '发生的',value: '3'}]},
  {el: 'button',options: [
    {name: '搜索',color: '#0081ff', icon:'search'},
    {name: '重置',color: '#6d7889', icon:'close'},
    {name: '新增',color: '#07b86c', icon:'plus'}]
  },
])
let columns: any[] = [
  {columnType:'index', label: '序号', prop: 'index'},
  {label: '角色名称', prop: 'name'},
  {label: '权限字符', prop: 'gender'},
  {label: '状态', prop: 'tel'},
  {columnType: 'slot', slotName: 'action', label: '操作', prop: 'action', showTooltip: true },
]
let pageData = reactive({
  tableData: []
})

const onBtnSearchForm = (name: string) => {
  console.log(name,)
}
</script>

<style scoped>

</style>