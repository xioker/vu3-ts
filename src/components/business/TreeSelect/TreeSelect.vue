<template>
  <el-tree-select
    v-model="value"
    :data="data"
    :filter-method="filterMethod"
    filterable
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  value: string,
  data: any[],
}>(),{
  value: '',
  data: () => []
})

const filterMethod = () => {
}
</script>

<style scoped>

</style>