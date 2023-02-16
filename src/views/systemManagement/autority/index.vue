<template>
  <!-- 搜索表单 按钮 布局 -->
  <SearchForm :model="searchForm" :forms="searchForms" @btnClick="onBtnSearchForm"/>
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
import { IAuthority, IAuthoritySearch } from '@/types/modules/systems'
let searchForm = reactive<IAuthoritySearch>({name: '', key: ''})
let searchForms = reactive([
  {el: 'input',  prop: 'name', label: '名称', placeholder: '请输入名称'},
  {el: 'input',  prop: 'key', label: '标识', placeholder: '请输入标识'},
  {el: 'button',options: [
    {name: '搜索',color: '#0081ff', icon:'search'},
    {name: '重置',color: '#6d7889', icon:'close'},
    {name: '新增',color: '#07b86c', icon:'plus'}]
  },
])
let columns: any[] = [
  {columnType:'index', label: '序号', prop: 'index'},
  {label: '名称', prop: 'name'},
  {label: '标识', prop: 'gender'},
  {label: '描述', prop: 'tel'},
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