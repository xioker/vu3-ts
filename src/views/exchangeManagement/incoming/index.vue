<template>
  <SearchForm :model="searchForm" :forms="searchForms" @btnClick="onBtnSearchForm"/>
  <!-- 表格内容数据 布局-->
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
import { IGoods, IGoodsSearch } from '@/types/modules/exchange'
let searchForm = reactive<IGoodsSearch>({name: '', code: '', source: ''})
let searchForms: any[] = [
  {el: 'input', prop: 'name', label: '商品名', placeholder: '请输入商品名'},
  {el: 'input', prop: 'code', label: '商品编码', placeholder: '请输入商品编码'},
  {el: 'timeRange', propStart: 'startTime', propEnd: 'endTime', label: '入库时间'},
  {el: 'button',options: [
    {name: '搜索',color: '#0081ff', icon:'search'},
    {name: '重置',color: '#6d7889', icon:'close'},
    {name: '入库',color: '#4dd3d4', icon:'download'}]},
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