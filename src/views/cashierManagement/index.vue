<template>
  <!-- 搜索表单布局 -->
  <SearchForm :model="searchForm" :forms="searchForms" @btnClick="onBtnSearchForm"/>
  <!-- 表格数据 -->
  <el-row>
    <el-col :span="18">
      <el-table :data="pageData.tableData" width="100%">
        <el-table-column label="商品名"/>
        <el-table-column label="商品编码"/>
        <el-table-column label="商品条形码"/>
        <el-table-column label="单价"/>
        <el-table-column label="数量">
          <template #default="{row}">
            <el-input-number v-model="row.count" :min="1"/>
          </template>
        </el-table-column>
        <el-table-column label="合计"/>
      </el-table>
      <div class="btns">
        <el-button color="#22cce2" icon="close" @click="pageData.tableData = []">清空</el-button>
        <el-button color="#09b66d" icon="ShoppingTrolley" @click="onToPay" :loading="pageData.isPay">
        {{ pageData.payBtn }}</el-button>
      </div>
    </el-col>
    <!-- 背景图 输入框布局 -->
    <el-col :span="6" class="bg">
      <div class="bg_form">
        <div class="money">实收：<span>100</span></div>
        <el-input placeholder="请扫描商品条形码" v-model="pageData.inputForm.bar">
          <template #suffix>
            <el-button size="small" color="#09b66d" icon="close" @click.native.stop.prevent="pageData.inputForm.bar = ''">
            清空</el-button>
          </template>
        </el-input>
        <el-input placeholder="请输入商品编码" v-model="pageData.inputForm.code">
          <template #suffix>
            <el-button size="small" color="#22cce2" icon="close" @click.native.stop.prevent="pageData.inputForm.code = ''">
            清空</el-button>
          </template>
        </el-input>
      </div>
    </el-col>
  </el-row>
  
</template>

<script setup lang="ts">
import { ICashierSearch } from '@/types/modules/cashier'
import { stringify } from 'querystring';
let searchForm = reactive<ICashierSearch>({fingerprintId: '', faceId: ''})
let searchForms = reactive([
  {el: 'select',  prop: 'fingerprintId', label: '指纹设备', placeholder: '请选择指纹设备',
    options: [{label: '固定用户',value: '1'},{label: '不是',value: '2'},{label: '发生的',value: '3'}]},
  {el: 'select',  prop: 'faceId', label: '人脸设备', placeholder: '请选择人脸设备',
    options: [{label: '固定用户',value: '1'},{label: '不是',value: '2'},{label: '发生的',value: '3'}]},
  {el: 'button',options: [{name: '重置',color: '#6d7889', icon:'close'}]},
])
let pageData = reactive({
  payBtn: '结账',
  isPay: false,
  tableData: [],
  inputForm: { bar: '', code: '' }
})

// 结账按钮方法
const onToPay = (): void => {
  pageData.isPay = true
  pageData.payBtn = '正在结账'
  console.log("pay")
}

// 重置按钮方法
const onBtnSearchForm = (): void => {
  searchForm.fingerprintId = ''
  searchForm.faceId = ''
}

</script>

<style scoped lang="less">
  .btns{
    margin-top:20px;display:flex;justify-content:space-between
  }
  .bg{
    width: 350px;
    height: 590px;
    right: 0;
    position: absolute;
    background-image: url("@/assets/images/pay.png");
    background-size: cover;
    .bg_form{
      position: absolute;
      margin: auto;
      left: 10%;
      top: 35%;
      transform: translate(-5%,-35%);
      .money{
        margin: 0 0 40px 0;
        text-align: center;
        color: #fff;
        font-size: 20px;
        span{
          font-size: 25px;
          font-weight: 600;
        }
      }
      .el-input{
        margin-bottom: 40px;
      }
    }
  }
</style>