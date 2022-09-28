<template>
  <div>
    <el-table :data="data">
      <el-table-column
        v-for="(column, i) in columns"
        :key="i"
        :prop="column.prop"
        :label="column.label"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CoreTable",
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
