<!--
 * @Description: 搜索表单基本封装
 * @Auth: xsl
 * @Date: 2022-10-26 16:05:48
 * @LastEditors: xsl
 * @LastEditTime: 2022-12-29 18:02:01
-->
<template>
  <el-form ref="form" :inline="inline" :model="model" class="custom_form">
    <template v-for="(form, index) in forms">
      <!-- 输入框 -->
      <el-form-item v-if="form.el === 'input'" :label="form.label" :key="form.label" :prop="form.prop">
        <el-input :placeholder="form.placeholder" :clearable="clearable" v-model="model[form.prop]" />
      </el-form-item>
      <!-- 下拉框 -->
      <el-form-item v-else-if="form.el === 'select'" :label="form.label" :key="form.placeholder" :prop="form.prop">
        <el-select :placeholder="form.placeholder" :clearable="clearable" v-model="model[form.prop]">
          <el-option v-for="option in form.options" :label="option.name || option.label" :value="option.id || option.value" :key="option.id" />
        </el-select>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item v-else-if="form.el === 'button'" :key="form.el">
        <el-button v-for="(btn, i) in form.options" :type="btn.type" :color="btn.color" :icon="btn.icon" :key="i"
          @click="onBtnClick(i)">
          {{ btn.name }}
        </el-button>
      </el-form-item>
      <!-- 时间范围选择器 -->
      <el-form-item v-else-if="form.el === 'timeRange'" :label="form.label" :key="index">
        <TimeRange v-model:start-time="model[form.propStart]" v-model:end-time="model[form.propEnd]"
          :split="form.split" />
      </el-form-item>
      <!-- 传递 插槽名字 实现自定义具名插槽 自定义内容 -->
      <el-form-item v-else :label="form.label" :key="form.slotName">
        <slot :name="form.slotName" />
      </el-form-item>
    </template>
    <slot></slot>
  </el-form>
</template>

<script setup lang="ts" name="SearchForm">
interface IModel {
  [key: string]: any;
}
withDefaults(
  defineProps<{
    clearable?: boolean; // 是否支持输入框 清除
    inline?: boolean; // 是否行内表单
    model?: IModel; // 搜索表单的数据
    forms?: any[]; // 表单展示数据源
  }>(),
  {
    clearable: true,
    inline: true,
    model: () => {
      return {};
    },
    forms: () => []
  }
);

const emits = defineEmits<{ (e: 'btnClick', name: number): void }>();

/**
 * @description: 按钮事件方法
 * @param {*} index: 按钮索引
 */
const onBtnClick = (index: number) => emits('btnClick', index);
</script>

<style scoped lang="less">
// 设置输入框大小
.custom_form .el-form-item__content .el-input {
  width: 200px
}
</style>
