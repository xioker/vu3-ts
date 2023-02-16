<!--
 * @Description: 表格二次封装
 * @Auth: xsl
 * @Date: 2022-10-13 17:16:46
 * @LastEditors: xsl
 * @LastEditTime: 2022-10-27 17:34:23
-->
<template>
  <el-table :data="data" :stripe="stripe" :border="border" @selection-change="selectionChange">
    <template v-for="col in columns">
      <el-table-column v-if="col.columnType === 'index'" type="index" :key="col.label"
        :label="col.label" 
        :prop="col.prop" 
        :width="col.width || '100px'"
        :align="col.align || 'center'"
      />
      <el-table-column v-else-if="col.columnType === 'selection'" type="selection" :key="col.columnType"
        :label="col.label" 
        :prop="col.prop" 
        :width="col.width || '55px'"
        :align="col.align || 'center'"
      />
      <el-table-column 
        v-else-if="col.columnType === 'slot'" 
        :label="col.label" 
        :prop="col.prop" 
        :width="col.width"
        :align="col.align || 'center'"
        :key="col.slotName"
        :show-overflow-tooltip="col.showTooltip"
      >
        <template #default="{row}">
          <slot :name="col.slotName" :data="row"></slot>
        </template>
      </el-table-column>
      <el-table-column 
        v-else 
        :label="col.label" 
        :prop="col.prop" 
        :width="col.width"
        :align="col.align || 'center'"
        :key="col.prop"
        :show-overflow-tooltip="col.showTooltip"
      />
    </template>
  </el-table>
</template>

<script setup lang="ts" name="Table">
withDefaults(defineProps<{
  data?: any[],   // 表格遍历的数据源
  columns?: any[],    // 表格遍历的列 表头数据源
  stripe?: boolean,    // 是否斑马纹格式 
  border?: boolean,    // 是否展示带边框 表格格式
}>(),{
  data: () => [],
  // columns: [{columnType: '',label:'',prop:'',slotName:'',width:'',align:'',showTooltip:''}]
  columns: () => [],
  stripe: false,
  border: false
})

const emits = defineEmits<{ (e: 'selectChange', data: any[]):void}>()
/**
 * @description: 表格复选框选择事件派发
 * @param {*} data: 选中的数据源
 */
const selectionChange = (data: any[]) => emits("selectChange", data);
</script>

<style scoped>

</style>