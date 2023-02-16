<!--
 * @Description: Description
 * @Auth: xsl
 * @Date: 2022-10-13 10:16:42
 * @LastEditors: xsl
 * @LastEditTime: 2022-12-29 18:01:12
-->
<template>
  <SearchForm :model="searchForm" :forms="searchForms" @btnClick="onBtnClick" />
  <!-- 部门树 -->
  <el-table
    v-if="!pageData.tableData.length"
    :data="pageData.treeData"
    style="width: 100%"
    row-key="id"
    lazy
    :load="load"
    :tree-props="{ children: 'children' }"
  >
    <el-table-column align="left" prop="name" label="部门名称" />
    <el-table-column align="center" prop="sort" label="排序" />
    <el-table-column align="center" prop="status" label="状态">
      <template #default="{ row }">
        <el-tag :type="row.status ? 'danger' : 'success'">{{ row.status ? '已禁用' : '已启用' }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="createTime" label="创建时间" />
    <el-table-column align="center" prop="action" label="操作">
      <template #default="{ row }">
        <el-link @click="onActions(0, row)" :underline="false" style="color: #0081ff">新增</el-link>
        <el-link @click="onActions(1, row)" :underline="false" style="color: #258510">编辑</el-link>
        <el-link @click="onActions(2, row)" :underline="false" style="color: #0081ff">查看</el-link>
        <el-link @click="onActions(3, row)" :underline="false" style="color: #f43131">删除</el-link>
      </template>
    </el-table-column>
  </el-table>
  <!-- 部门列表 -->
  <Table v-if="pageData.tableData.length" :data="pageData.tableData" :columns="columns">
    <template #status="{ data }">{{ data.status ? '禁用' : '启用' }}</template>
    <template v-slot:action="{ data }">
      <el-link @click="onActions(0, data)" :underline="false" style="color: #0081ff">新增</el-link>
      <el-link @click="onActions(1, data)" :underline="false" style="color: #258510">编辑</el-link>
      <el-link @click="onActions(2, data)" :underline="false" style="color: #0081ff">查看</el-link>
      <el-link @click="onActions(3, data)" :underline="false" style="color: #f43131">删除</el-link>
    </template>
  </Table>
  <!-- 分页 -->
  <Pagination
    v-if="pageData.tableData.length"
    :current-page="searchForm.current"
    :page-size="searchForm.size"
    :total="pageData.total"
    @pageChange="onPageChange"
  />
  <!-- dialog -->
  <Dialog
    v-model:isVisible="pageData.isVisible"
    :title="pageData.title"
    :show-sure="pageData.showSure"
    width="500px"
    @onBtn="onDialogBtn"
    @onClose="onDialogClose"
  >
    <el-form ref="addFormRef" label-width="80px" label-position="left" :model="addForm">
      <el-form-item
        label="部门名称"
        prop="name"
        :rules="[{ required: true, message: '部门名称不能为空', trigger: 'blur' }]"
      >
        <el-input placeholder="请输入部门名称" v-model="addForm.name" :disabled="pageData.disabled" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input placeholder="请输入排序" v-model.number="addForm.sort" :disabled="pageData.disabled" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="addForm.status" :disabled="pageData.disabled">
          <el-radio :label="0">启用</el-radio><el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup lang="ts">
import { treeLists, deptLists } from '@/api/apiUser';
import { IDept, IDeptSearch } from '@/types/modules/users';
let addFormRef = ref();
let addForm = reactive<IDeptSearch>({ name: '', status: 0, sort: '' });
let searchForm = reactive<IDept>({ name: '', status: '', size: 14, current: 1 });
let searchForms = reactive([
  { el: 'input', prop: 'name', label: '部门名称', placeholder: '请输入部门名称' },
  {
    el: 'select',
    prop: 'status',
    label: '状态',
    placeholder: '请选择状态',
    options: [
      { name: '启用', id: '0' },
      { name: '禁用', id: '1' }
    ]
  },
  {
    el: 'button',
    options: [
      { name: '搜索', color: '#0081ff', icon: 'search' },
      { name: '重置', color: '#6d7889', icon: 'close' },
      { name: '新增', color: '#07b86c', icon: 'plus' }
    ]
  }
]);
// 表格列数据
let columns: any[] = [
  { columnType: 'index', label: '序号', prop: 'index' },
  { label: '部门名称', prop: 'name' },
  { label: '排序', prop: 'sort' },
  { columnType: 'slot', slotName: 'status', label: '状态', prop: 'status' },
  { label: '创建时间', prop: 'createTime', showTooltip: true },
  {
    columnType: 'slot',
    slotName: 'action',
    label: '操作',
    prop: 'action',
    width: '200px'
  }
];
let pageData = reactive({
  treeData: [],
  tableData: [],
  total: 0,
  isVisible: false,
  title: '新增',
  disabled: false,
  showSure: true
});
interface IDepts {
  id: number;
  createTime: string;
  name: string;
  status: number;
  children: IDepts[];
  sort?: string;
}
const load = (row: IDepts, treeNode: unknown, resolve: (data: IDepts[]) => void) => {
  row.children.length ? resolve(row.children) : resolve([row]);
};

onMounted(() => {
  apiTreeLists();
});
// 获取所有部门树列表数据
const apiTreeLists = (): void => {
  treeLists()
    .then((res: any) => {
      if (res) pageData.treeData = res.data;
    })
    .catch((err: unknown) => {});
};

// 获取部门列表数据
const apiDeptLists = (): void => {
  let { name, status, size, current } = searchForm;
  deptLists({ name, status, size, current }).then((res: any) => {
    if (res) {
      pageData.tableData = res.data.records;
      pageData.total = res.data.total;
    }
  });
};

const onDialogClose = (): boolean => pageData.isVisible = false;
/**
 * @description: 弹窗按钮方法
 * @param {*} index: 1确定  0取消
 */
const onDialogBtn = (index: number): void => {
  if(pageData.title === '新增') {
    if (!index) {
      pageData.isVisible = false;
      return 
    }
    addFormRef.value.validate((valid: boolean) => {
      if (valid) {
      }
    });
  }else if(pageData.title === '编辑') {
    if (!index) {
      pageData.isVisible = false;
      return 
    }
  }else{
    pageData.isVisible = false;
  }
};
// 搜索表单操作按钮方法
const onBtnClick = (index: number) => {
  console.log(index);
  switch (index) {
    case 1:
      apiDeptLists();
      break;
    case 1:
      searchForm.name = '';
      searchForm.status = '';
      if (searchForm.current > 1) searchForm.current = 1;
      pageData.tableData = [];
      pageData.total = 0;
      apiTreeLists();
      break;
    case 2:
      pageData.title = '新增';
      resetDialogConfig()
      break;
  }
};
const resetDialogConfig = ():void => {
  if(pageData.title === '新增') {
    addForm.name = ''
    addForm.status = 0
    addForm.sort = ''
  }
  if(pageData.disabled) pageData.disabled = false
  if(!pageData.showSure) pageData.showSure = true
  pageData.isVisible = true
}
/**
 * @description: 表格按钮操作方法
 * @param {*} index:  对应下标 index
 * @param {*} row: 对应行数据
 */
const onActions = (index: number, row: any): void => {
  let { id, name, sort, status } = row
  addForm.id = id
  switch (index) {
    case 0:
      pageData.title = '新增'
      resetDialogConfig()
      break;
    case 1:
      addForm.name = name
      addForm.sort = sort
      addForm.status = status
      pageData.title = '编辑'
      resetDialogConfig()
      break;
    case 2:
      addForm.name = name
      addForm.sort = sort
      addForm.status = status
      pageData.title = '查看'
      pageData.showSure = false
      pageData.disabled = true
      pageData.isVisible = true
      break;
    case 3:
      break;
    default:
      break;
  }
};
// 页码变化方法
const onPageChange = (e: { currentPage: number; pageSize: number }): void => {
  searchForm.current = e.currentPage;
  searchForm.size = e.pageSize;
  apiDeptLists();
};
</script>

<style scoped></style>
