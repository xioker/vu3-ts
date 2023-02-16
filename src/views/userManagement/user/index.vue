<template>
  <!-- 用户搜索表单 按钮 布局 -->
  <SearchForm :model="searchForm" :forms="searchForms" @btnClick="onBtnSearchForm">
    <template #money>
      <el-input type="number" v-model.number="searchForm.money" placeholder="请输入金额" class="input_with_select">
        <template #prepend>
          <el-select v-model="searchForm.walletTypeId" placeholder="请选择钱包类型">
            <el-option v-for="wa in pageData.walletTypes" :key="wa.id" :label="wa.name" :value="wa.id" />
          </el-select>
          <el-select v-model="searchForm.judge">
            <el-option label=">" value=">" />
            <el-option label="<" value="<" />
            <el-option label=">=" value=">=" />
            <el-option label="<=" value="<=" />
            <el-option label="=" value="=" />
          </el-select>
        </template>
      </el-input>
    </template>
    <template #dept>
      <el-input placeholder="请输入部门"></el-input>
    </template>
  </SearchForm>
  <!-- 表格内容数据 布局-->
  <Table v-loading="pageData.tableLoading" :data="pageData.tableData" :columns="columns" @selectChange="onSelectChange">
    <template v-slot:conMode="{ data }">
      <span v-for="(item, index) in data.payTypes" :key="item.name">
        {{ item.name }}{{ index != data.payTypes.length - 1 ? '/' : '' }}</span>
    </template>
    <template v-slot:walletInfo="{ data }">
      <span v-for="item in data.wallets" :key="item.name">{{ item.name }}:{{ item.money }}元<br /></span>
    </template>
    <template #status="{ data }">
      <el-tag :type="data.status ? 'danger' : 'success'">{{ data.status ? '禁用' : '启用' }}</el-tag>
    </template>
    <template v-slot:action="{ data }">
      <el-link @click="onActions(0, data)" :underline="false" :style="{ color: data.status ? '#0081FF' : '#F43131' }">
        {{ data.status ? '启用' : '禁用' }}
      </el-link>
      <el-link @click="onActions(1, data)" :underline="false" style="color: #258510">编辑</el-link>
      <el-link @click="onActions(2, data)" :underline="false" style="color: #0081ff">查看</el-link>
      <el-link @click="onActions(3, data)" :underline="false" style="color: #f43131">删除</el-link>
    </template>
  </Table>
  <!-- 分页 -->
  <Pagination v-show="!pageData.tableLoading" :current-page="searchForm.current" :page-size="searchForm.size"
    :total="pageData.total" @pageChange="onPageChange" />
  <!-- Dialog -->
  <Dialog v-model:isVisible="pageData.isVisible" draggable> xxxxxxxxxxxxxxxxxxxxxxxxxxxxx </Dialog>
</template>

<script setup lang="ts">
import { IUserSearch, IUser } from '@/types/modules/users/index';
import { personList, putPersonDisable, deletePerson, exportExcelTemplate, exportExcel, personTypeList, personListType } from '@/api/apiUser';
import { Action } from 'element-plus';
import { downloadFile } from '@/utils';
import { Isign } from '@/types/common';
import { walletAllList } from '@/api/apiOthers';
// 搜索表单 列表数据
let searchForm = reactive<IUser>({
  personTypeTypeId: '',
  name: '',
  code: '',
  personTypeId: '',
  deptId: null,
  size: 9,
  current: 1,
  money: '',
  judge: '>',
  walletTypeId: ''
});
// 搜索表单绑定数据
let searchForms: any[] = [
  { el: 'input', prop: 'name', label: '用户', placeholder: '请输入用户' },
  { el: 'input', prop: 'code', label: '用户号', placeholder: '请输入用户号' },
  {
    el: 'select',
    prop: 'personTypeId',
    label: '用户类型',
    placeholder: '请选择用户类型',
    options: [
    ]
  },
  {
    el: 'select',
    prop: 'personTypeTypeId',
    label: '用户分类',
    placeholder: '请选择用户分类',
    options: [
    ]
  },
  { el: 'slot', prop: 'money', label: '金额筛选', slotName: 'money' },
  { el: 'slot', prop: 'deptId', label: '部门', slotName: 'dept' },
  {
    el: 'button',
    options: [
      { name: '搜索', color: '#0081ff', icon: 'search' },
      { name: '重置', color: '#6d7889', icon: 'close' },
      { name: '新增', color: '#07b86c', icon: 'plus' },
      { name: '导入', color: '#01c0c2', icon: 'download' },
      { name: 'excle模板下载', color: '#01c0c2', icon: 'download' },
      { name: '导出', color: '#b7970b', icon: 'upload' },
      { name: '新增结转', color: '#07b86c', icon: 'plus' }
    ]
  },
];
// 表格列数据
let columns: any[] = [
  { columnType: 'selection', prop: 'name' },
  { label: '用户', prop: 'name' },
  { label: '性别', prop: 'gender' },
  { label: '用户号', prop: 'code' },
  // {columnType: 'slot', slotName: 'quit', label: '是否离职', prop: 'quit'},
  { label: '部门', prop: 'deptName', showTooltip: true },
  { label: '联系电话', prop: 'tel' },
  { columnType: 'slot', slotName: 'status', label: '状态', prop: 'status' },
  { label: '用户类型', prop: 'personTypeName' },
  { label: '用户分类', prop: 'typeName' },
  {
    columnType: 'slot',
    slotName: 'conMode',
    label: '消费模式',
    prop: 'payTypes',
    showTooltip: true
  },
  {
    columnType: 'slot',
    slotName: 'walletInfo',
    label: '钱包信息',
    prop: 'wallets',
    showTooltip: true
  },
  {
    columnType: 'slot',
    slotName: 'action',
    label: '操作',
    prop: 'action',
    width: '200px'
  }
];
// 页面数据
interface IpageData {
  tableLoading: boolean,
  tableData: any[],
  selectData: any[],
  walletTypes: any[],
  total: number,
  isVisible: boolean
}
let pageData = reactive<IpageData>({
  tableLoading: true,
  tableData: [],
  selectData: [],
  walletTypes: [],
  total: 0,
  isVisible: false
});
const { proxy } = getCurrentInstance() as any;
onMounted(() => {
  apiPersonList();
  apiPersonTypeList()
  apiPersonListType()
  apiWalletAllList()
});

// 获取用户列表数据
const apiPersonList = (): void => {
  pageData.tableLoading = true
  personList(searchForm)
    .then((res: any) => {
      if (res) {
        pageData.tableData = res.data.records;
        pageData.total = res.data.total;
      }
      setTimeout(() => {
        pageData.tableLoading = false
      }, 500);
    })
    .catch((err: unknown) => { pageData.tableLoading = false });
};
// 获取用户类型数据接口
const apiPersonTypeList = (): void => {
  personTypeList()
    .then((res: any) => {
      if (res) searchForms[2].options = res.data.records;
    })
    .catch((err: unknown) => { });
}
// 获取用户分类数据接口
const apiPersonListType = (): void => {
  personListType()
    .then((res: any) => {
      if (res) searchForms[3].options = res.data.records;
    })
    .catch((err: unknown) => { });
}
// 获取钱包类型数据
const apiWalletAllList = (): void => {
  walletAllList({ size: -1 })
    .then((res: any) => {
      if (res) {
        pageData.walletTypes = res.data.filter((item: any) => item.use === 1);
      }
    })
    .catch((err: unknown) => { });
}
// 禁用用户
const apiPutPersonDisable = (row: any): void => {
  putPersonDisable({ id: row.id, status: row.status ? 0 : -1 })
    .then((res: unknown) => {
      if (res) {
        proxy.$message({
          message: `${row.status ? '启用' : '禁用'}成功`,
          type: 'success'
        });
        apiPersonList();
      }
    })
    .catch((err: unknown) => { });
};
// 删除用户
const apiDeletePerson = (row: any): void => {
  proxy.$messageBox.confirm(`确定删除用户【${row.name}】吗`, `提示`, {
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    buttonSize: 'default',
    callback: (action: Action) => {
      if (action === 'confirm') {
        deletePerson({ ids: row.id })
          .then((res: unknown) => {
            if (res) {
              proxy.$message({ message: `删除成功`, type: 'success' });
              apiPersonList();
            }
          })
          .catch((err: unknown) => { });
      }
    }
  });
};
// 表格按钮操作方法
const onActions = (index: number, row: any): void => {
  let btns: Isign = {
    0: apiPutPersonDisable,
    1: '',
    2: '',
    3: apiDeletePerson,
  }
  if (btns[index]) btns[index](row)
};
// 表格选中方法
const onSelectChange = (e: any): void => (pageData.selectData = e);
// 用户导入模板方法
const apiExportExcleTemplate = (): void => {
  exportExcelTemplate().then((res: unknown) => {
    if (res) downloadFile(res, '用户导入excle模板');
  });
};
// 用户导出excle
const apiExportExcel = (): void => {
  exportExcel(searchForm).then((res: unknown) => {
    if (res) downloadFile(res, '用户导出表');
  });
};
// 搜索表单操作按钮方法
const onBtnSearchForm = (index: number): void => {
  console.log(index);
  switch (index) {
    case 0:
      if (searchForm.current > 1) searchForm.current = 1;
      apiPersonList();
      break;
    case 1:
      searchForm.name = '';
      searchForm.code = '';
      searchForm.personTypeId = '';
      searchForm.personTypeTypeId = '';
      searchForm.deptId = null;
      searchForm.money = '';
      searchForm.judge = '>';
      searchForm.walletTypeId = '';
      searchForm.current = 1;
      apiPersonList();
      break;
    case 2:
      pageData.isVisible = true;
      break;
    case 3:
      break;
    case 4:
      apiExportExcel();
      break;
    case 5:
      apiExportExcleTemplate();
      break;
    case 6:
      if (!pageData.selectData.length) {
        proxy.$messageBox.alert(`请勾选结转的用户`, `提示`, {
          type: 'warning',
          confirmButtonText: '确定',
          buttonSize: 'default',
          callback: (action: Action) => { }
        });
      }

      break;
    default:
      break;
  }
};
// 页码变化方法
const onPageChange = (e: { currentPage: number, pageSize: number }): void => {
  searchForm.current = e.currentPage
  searchForm.size = e.pageSize
  apiPersonList()
};
</script>

<style scoped lang="less">
:deep(.input_with_select) {
  width: auto !important;
}

:deep(.input_with_select .el-input-group__prepend) {
  background-color: var(--el-fill-color-blank);
}

:deep(.input_with_select .el-input-group__prepend) .el-select:first-child .el-input {
  width: 180px !important;
}

:deep(.input_with_select .el-input-group__prepend) .el-select:last-child .el-input {
  width: 80px !important;
  margin-left: 40px;
}
</style>
