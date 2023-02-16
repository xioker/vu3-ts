<!--
 * @Description: 下拉框搜索 模糊匹配 优化
 * @Auth: xsl
 * @Date: 2022-09-28 12:40:46
 * @LastEditors: xsl
 * @LastEditTime: 2022-10-26 09:43:05
-->
<template>
  <el-select
    v-bind:value="value"
    v-bind="$attrs"
    v-loadmore="loadMore(pageData.maxNum)"
    v-on="$attrs"
    :placeholder="$attrs.placeholder"
    :filter-method="handleFilter"
    @visible-change="visibleChange"
    @focus="clearSelect('focus')"
    @clear="clearSelect('clear')"
    :disabled="isDisabled"
    :multiple="isMultiple"
    :collapse-tags="isCollpseTags"
    filterable
    clearable
  >
    <el-option
      v-for="(item, index) in pageData.optionsList.slice(pageData.firstNum, pageData.maxNum)"
      :key="item[prop.value] + index"
      v-bind="$attrs"
      :label="item[prop.label]"
      :value="item[prop.value]"
      @click.native="optionClick(item)"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts" setup name="SearchSelect">
import { throttle } from "@/utils";
let props = withDefaults(defineProps<{
  value: string | number | any[] | Object,   // 需要绑定的值 等于 v-model
  options: any[],   // 需要循环的数组 必传
  prop: {value:string, label: string },    // el-option参数 必传
  isDisabled: boolean, // 是否禁用
  isCollpseTags: boolean, // 是否多选过多省略
  isMultiple: boolean, // 是否多选
}>(),{
  value: '',
  options: () => [],
  prop: () => {
    return { value: "value",label: "label" }
  },
  isDisabled: false,
  isCollpseTags: false,
  isMultiple: false,
})
let pageData = reactive<{
  optionsList: any[],
  copyOptionsList: any[],
  firstNum: number,
  maxNum: number
}>({
  optionsList: [],
  copyOptionsList: [],
  firstNum: 0,
  maxNum: 50
})
const vLoadmore = {
  created() {}, // 新增
  beforeMount() {},
  mounted(el:any, binding:any, vnode:any, prevVnode:any) {
    const DROPDOWN_DOM = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
    if (DROPDOWN_DOM) {
      DROPDOWN_DOM.addEventListener("scroll",throttle(function (e:any) {
        // this.scrollTop - 1 是为了兼容部分浏览器
        // const condition = this.scrollHeight - this.scrollTop - 1 <= this.clientHeight;
        // if (condition) binding.value();
      }),200);
    }
  },
  beforeUpdate() {}, // 新增
  updated() {},
  beforeUnmount() {}, // 新增
  unmounted() {}
}
watch([()=>props.value,()=>props.options],([],[newOptions,oldOptions]) => {
  if(newOptions){
    pageData.optionsList = newOptions as any[];
    pageData.copyOptionsList = JSON.parse(JSON.stringify(newOptions));
  }
  showValueMethod();
},{immediate: true,deep:true})

onMounted(() => {
  pageData.optionsList = props.options;
  pageData.copyOptionsList = JSON.parse(JSON.stringify(props.options));
  showValueMethod();
}) 

/**
 * @Description: 下拉框支持模糊搜索
 * @param {*} val
 */
const handleFilter = (val?: string | undefined | null) => {
  try {
    if (val) {
      pageData.firstNum = 0;
      pageData.maxNum = 50;
      pageData.optionsList = pageData.copyOptionsList;
      pageData.optionsList = pageData.optionsList.filter((item) =>
        // 使用拼音搜索 PinyinMatch
        // PinyinMatch.match(item[this.props.label], val)
        item[props.prop.label].indexOf(val) != -1
      );
    } else {
      pageData.optionsList = pageData.copyOptionsList;
    }
  } catch (error) {console.error("下拉框：", error);}
}

/**
 * @Description: 解决数据回显问题
 * @param {*}
 */
 const showValueMethod = () => {
  if (props.value && pageData.optionsList && pageData.optionsList.length > pageData.maxNum) {
    for (let i = 0; i < pageData.optionsList.length; i++) {
      if (pageData.optionsList[i][props.prop.value] === props.value) {
        if (i > pageData.maxNum) {
          // 如果value位于数组后面部分，就截取前面的值，增加体验感
          if (pageData.optionsList.length < i + pageData.maxNum) {
            pageData.firstNum = i - pageData.maxNum;
          } else {
            pageData.firstNum = i - 5;
          }
          pageData.maxNum = i + pageData.maxNum;
        }
        break;
      }
    }
  }
}

/**
 * @Description: clear、focus事件还原数组
 * @param {*}
 */
const clearSelect = (type: string) => {
  if (type === "clear") {
    pageData.firstNum = 0;
    pageData.maxNum = 50;
  }
  pageData.optionsList = pageData.copyOptionsList;
}

// 滚动增加最大条数
const loadMore = (n: number) => () => (pageData.maxNum += 5)

// 触发下拉框展示
const visibleChange = (flag: boolean) => flag && handleFilter();

const emits = defineEmits<{
  (e: 'optionClick', item: any): void
}>()
/**
 * @Description: option点击事件
 * @param {*} item 当前选中的参数
 */
const optionClick = (item: any) => emits("optionClick", item);
 
</script>
