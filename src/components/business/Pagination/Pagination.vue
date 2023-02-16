<!--
 * @Description: 分页组件
 * @Auth: xsl
 * @Date: 2022-10-13 17:16:59
 * @LastEditors: xsl
 * @LastEditTime: 2022-11-04 17:21:03
-->

<template>
  <el-pagination
    :total="total"
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="pageSizes"
    :hide-on-single-page="hideSingel"
    :pager-count="pagerCount"
    :small="small"
    :disabled="disabled"
    :background="background"
    :layout="layout"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts" name="Pagination">
let props = withDefaults(
  defineProps<{
    // 当前页码
    currentPage?: number;
    // 页码容量
    pageSize?: number;
    // 总数
    total?: number;
    // 页码容量设置
    pageSizes?: number[];
    // 大于等于 5 且小于等于 21 的奇数 显示省略
    pagerCount?: number;
    // 分页大小
    small?: boolean;
    // 是否禁用
    disabled?: boolean;
    // 是否启用背景
    background?: boolean;
    // 只有一页数据是否隐藏
    hideSingel?: boolean;
    // 布局模式
    layout?: string;
  }>(),
  {
    currentPage: 1,
    pageSize: 100,
    total: 0,
    pageSizes: () => [9, 12, 13, 14],
    pagerCount: 7,
    small: false,
    disabled: false,
    background: true,
    hideSingel: true,
    layout: 'total, sizes, prev, pager, next, jumper'
  }
);
interface IPages {
  currentPage: number;
  pageSize: number;
}

const emits = defineEmits<{ (e: 'pageChange', obj: IPages): void }>();
// 当前页码量改变了
const handleSizeChange = (e: number) => emits('pageChange', { currentPage: props.currentPage, pageSize: e });

// 当前页码改变了
const handleCurrentChange = (e: number) => emits('pageChange', { currentPage: e, pageSize: props.pageSize });
</script>

<style scoped lang="less">
.el-pagination {
  float: right;
  padding-top: 10px;
}
</style>
