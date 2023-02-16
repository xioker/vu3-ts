<template>
  <el-row>
    <SearchForm v-show="radioGroupValue==='系统日志'" :model="searchForm" :forms="searchForms" @btnClick="onBtnSearchForm" />
    <SearchForm v-show="radioGroupValue==='操作日志'" :model="searchFormOper" :forms="searchForms" @btnClick="onBtnSearchForm" />
    <el-form-item>
      <el-radio-group v-model="radioGroupValue">
        <el-radio-button label="系统日志" /><el-radio-button label="操作日志" />
      </el-radio-group>
    </el-form-item>
  </el-row>
  <!-- 表格数据内容 布局 -->
  <Table v-show="radioGroupValue==='系统日志'" :data="pageData.tableData" :columns="columns" />
  <Table v-show="radioGroupValue==='操作日志'" :data="pageData.tableDataOper" :columns="columnsOper" />

</template>

<script setup lang="ts">
import { IOperation, IOperationSearch } from '@/types/modules/systems'
let searchForm = reactive<IOperationSearch>({name: '', ip: '', startTime: null, endTime: null })
let searchFormOper = reactive<IOperationSearch>({name: '', ip: '', startTime: null, endTime: null })
let pageData = reactive({
  tableData: [],
  tableDataOper: []
})

let radioGroupValue = ref<string>('系统日志')
const onBtnSearchForm = (name: string) => {
  console.log(name)
  if(name === '重置'){
    onReset()
  }
}
// 重置方法
const onReset = () => {
  if(radioGroupValue.value === '系统日志'){
    searchForm.name = ''
    searchForm.ip = ''
    searchForm.startTime = ''
    searchForm.endTime = ''
    return
  }
  searchFormOper.name = ''
  searchFormOper.ip = ''
  searchFormOper.startTime = ''
  searchFormOper.endTime = ''
}

// 监听按钮变化 改变label名称
watch(radioGroupValue,(n, o) => searchForms[2].label = n === '系统日志' ? '登录时间' : '操作时间')
let searchForms: any[] = [
  {el: 'input',  prop: 'name', label: '账号名', placeholder: '请输入账号名'},
  {el: 'input',  prop: 'ip', label: 'IP地址', placeholder: '请输入IP地址'},
  {el: 'timeRange', propStart: 'startTime', propEnd: 'endTime', label: `登录时间` },
  {el: 'button',options: [
    {name: '搜索',type:'primary', icon:'search'},
    {name: '重置',color: '#6d7889', icon:'close'}]},
]

let columns: any[] = [
  {columnType:'index', label: '序号', prop: 'index'},
  {label: '账号名', prop: 'name'},
  {label: '登录时间', prop: 'gender'},
  {label: '登录状态', prop: 'tel'},
  {label: '操作系统', prop: 'tel'},
  {label: 'IP地址', prop: 'tel'},
  {label: '浏览器', prop: 'tel'},
]
let columnsOper: any[] = [
  {columnType:'index', label: '序号', prop: 'index'},
  {label: '账号名', prop: 'name'},
  {label: '系统模块', prop: 'gender'},
  {label: '操作类型', prop: 'tel'},
  {label: '主机地址', prop: 'tel'},
  {label: '操作描述', prop: 'tel'},
  {label: '操作时间', prop: 'tel'},
]
</script>

<style scoped>

</style>