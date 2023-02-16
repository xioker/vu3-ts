<!--
 * @Description: 时间范围选择
 * @Auth: xsl
 * @Date: 2022-10-27 11:14:04
 * @LastEditors: xsl
 * @LastEditTime: 2022-10-27 17:34:42
-->
<template>
  <el-date-picker
    v-model="startTime" 
    :type="type" 
    :size="size" 
    :disabled-date="disabledDateStart"
    placeholder="请选择开始时间"
    format="YYYY-MM-DD HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm:ss"
    @change="onChangeStart"
  />{{ split }}
  <el-date-picker 
    v-model="endTime" 
    :size="size"
    :type="type"
    :disabled-date="disabledDateEnd"
    placeholder="请选择结束时间" 
    format="YYYY-MM-DD HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm:ss"
    @change="onChangeEnd"
  />
</template>

<script setup lang="ts">
let props = withDefaults(defineProps<{
  startTime?: string | null,  // 开始时间
  endTime?: string | null,    // 结束时间
  split?: string | null,      // 时间范围分割符
  size?: string,        // 组件大小
  type?: string,        // 组件时间类型
}>(),{
  startTime: null,
  endTime: null,
  split: '至',
  size: 'large',
  type: 'datetime'
})

const emits = defineEmits(['update:startTime','update:endTime'])
// 双向绑定选择时间的值 方法
const onChangeStart = (val: string) => emits('update:startTime',val)
const onChangeEnd = (val: string) => emits('update:endTime',val)

// 禁用开始时间选择
const disabledDateStart = (time: Date) => {
  if (props.endTime) {
    let endTime = new Date(props.endTime).valueOf();
    return time.valueOf() > endTime;
  }
  return false
}

// 禁用结束时间选择
const disabledDateEnd = (time: Date) => {
  if (props.startTime) {
    let startTime = new Date(props.startTime).valueOf() - 8.64e7 + 1; // 用户可以选择同一天
    return time.valueOf() < startTime;
  }
  return false;
}
</script>

<style scoped>

</style>