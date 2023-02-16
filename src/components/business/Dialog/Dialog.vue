<!--
 * @Description: 弹框封装
 * @Auth: xsl
 * @Date: 2022-10-13 17:17:05
 * @LastEditors: xsl
 * @LastEditTime: 2022-12-29 14:23:58
-->
<template>
  <el-dialog
    ref="dialog"
    :title="title"
    v-model="isVisible"
    :draggable="draggable"
    :append-to-body="appendBody"
    :destroyOnclose="false"
    :close-on-press-escape="closeOnPressEscape"
    :close-on-click-modal="closeOnClickModal"
    :top="top"
    :width="width"
    @close="onClosed"
  >
    <slot>内容...</slot>
    <!-- 底部布局插槽 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button v-show="showSure" @click="onBtnHandel(1)" type="primary" >确定</el-button>
        <el-button v-show="showCancel" @click="onBtnHandel(0)" type="info" >取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="Dialog">
withDefaults(defineProps<{
  top?: string,             // 距离页面顶部距离
  width?: string | number,  // 默认宽度
  title?: string,           // 标题
  showSure?: boolean,       // 展示确定按钮
  showCancel?: boolean,     // 展示取消按钮
  isVisible?: boolean,      // 展示弹框
  draggable?: boolean,      // 支持拖动
  appendBody?: boolean,     // 追加弹框到body
  destroyOnclose?: boolean,       // 关闭是销毁弹框
  closeOnPressEscape?: boolean,   // 按键esc关闭弹框
  closeOnClickModal?: boolean,    // 按弹出遮罩层关闭弹窗
}>(),{
  top: '15vh',
  width: '50%',
  title: '标题',
  showSure: true,
  showCancel: true,
  isVisible: false,
  draggable: true,
  appendBody: false,
  destroyOnclose: false,
  closeOnPressEscape: false,
  closeOnClickModal: false,
})

const emits = defineEmits(['update:isVisible','onBtn', 'onClose'])

// 右上角关闭弹框事件
const onClosed = (): void => {
  emits('update:isVisible', false)
  emits('onClose')
}

/**
 * @description: 弹框按钮事件
 * @param {*} index: 对应按钮的标志index 1确定  0取消
 */
const onBtnHandel = (index: number): void => emits('onBtn', index)
</script>

<style scoped lang="less">
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>