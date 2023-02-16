<template>
  <!-- 搜索按钮牛 布局 -->
  <SearchForm :model="searchForm" :forms="searchForms" @btnClick="onBtnSearchForm"/>
  <!-- 表格数据内容 布局 -->
  <Table :data="pageData.tableData" :columns="columns">
    <template #status="{ data }">
      <el-tag :type="data.status ? 'danger' : 'success'">{{ data.status ? '禁用' : '启用' }}</el-tag>
    </template>
    <template #role="{ data }">{{ comRoles(data.role) }}</template>
    <template v-slot:action="{ data }">
      <el-link @click="onActions(0,data)" :underline="false" style="color:#F43131">重置密码</el-link>
      <el-link @click="onActions(1,data)" :underline="false" style="color:#258510">编辑</el-link>
      <el-link @click="onActions(2,data)" :underline="false" style="color:#0081FF">查看</el-link>
      <el-link @click="onActions(3,data)" :underline="false" style="color:#F43131">删除</el-link>
    </template>
  </Table>
  <!-- 分页 -->
  <Pagination
    :current-page="searchForm.current"
    :page-size="searchForm.size"
    :total="pageData.total"
    @pageChange="onPageChange"
  />
</template>

<script setup lang="ts">
import { resetPassword, userLists } from '@/api/apiSystem';
import { Isign } from '@/types/common';
import { IAccountSearch, IAccount } from '@/types/modules/systems'
import { Action } from 'element-plus';
let searchForm = reactive<IAccount>({acct: '', role: null, status: null, size: 12, current: 1})
let searchForms = reactive([
  {el: 'input', prop: 'acct', label: '账户名', placeholder: '请输入账户名'},
  {el: 'input',  prop: 'role', label: '角色', placeholder: '请输入角色'},
  {el: 'select',  prop: 'status', label: '状态', placeholder: '请选择状态',
    options: [{label: '启用',value: '0'},{label: '禁用',value: '-1'}]},
  {el: 'button',options: [
    {name: '搜索',color: '#0081ff', icon:'search'},
    {name: '重置',color: '#6d7889', icon:'close'},
    {name: '新增',color: '#07b86c', icon:'plus'}]
  },
])
let columns: any[] = [
  {columnType:'index', label: '序号', prop: 'index'},
  {label: '用户', prop: 'name'},
  {columnType: 'slot', slotName: 'role', label: '角色', prop: 'role', showTooltip: true},
  {label: '账户名', prop: 'acct'},
  {label: '联系电话', prop: 'tel'},
  {columnType: 'slot', slotName: 'status', label: '状态', prop: 'status'},
  {label: '备注', prop: 'desc', showTooltip: true },
  {columnType: 'slot', slotName: 'action', label: '操作', prop: 'action', showTooltip: true },
]
let pageData = reactive({
  tableData: [],
  total: 0,
})
const { proxy } = getCurrentInstance() as any
onMounted(() => {
  apiUserList()
})
// 角色数据处理
const comRoles = computed(() => (row: any) => {
  return row.map((item: any) => item.name).join('/')
})
// 获取账户列表数据
const apiUserList = () => {
  userLists(searchForm).then((res: any) => {
    if(res.code === 200) {
      pageData.tableData = res.data.records
      pageData.total = res.data.total
    }
  })
}
// 搜索表单按钮操作方法
const onBtnSearchForm = (index: number) => {
  console.log(index)
  let btns: Isign = {
    0: function search(){
      if(searchForm.current > 1) searchForm.current = 1
      apiUserList()
    },
    1: function reset(){
      if(searchForm.current > 1) searchForm.current = 1
      searchForm.acct = ''
      searchForm.role = null
      searchForm.status = null
      apiUserList()
    },
    2: function add(){},
  }
  btns[index]()
}
// 表格内容操作的方法
const onActions = (index: number, row: any): void => {
  let actions: Isign = {
    0: handleResetPassword,
    1: handleResetPassword,
    2: handleResetPassword,
    3: handleResetPassword,
  }
  actions[index](row)
}
// 处理重置密码方法
const  handleResetPassword = (row: any): void => {
  proxy.$messageBox.alert(`确定重置【${row.name}】密码吗`, "提示", {
    type: "warning",
    callback: (action: Action) => {
      if (action === "confirm") {
        resetPassword({ id: row.id })
          .then((res: any) => {
            if (res) {
              proxy.$message({
                message: res.msg || "重置成功",
                type: "success",
              });
            }
          })
          .catch((err) => {});
      }
    },
  });
}
// 页码变化方法
const onPageChange = (e: {currentPage: number, pageSize: number}): void => {
  searchForm.current = e.currentPage
  searchForm.size = e.pageSize
  apiUserList()
};
</script>

<style scoped>

</style>