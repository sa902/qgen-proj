<template>
  <div>
    <el-table :data="data">
      <!--      <el-table-column prop="name" label="Name" width="180"> </el-table-column>-->
      <!--      <el-table-column prop="bredFor" label="Bred For" width="180">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column prop="breedGroup" label="Breed Group"> </el-table-column>-->
      <!--      <el-table-column prop="lifeSpan" label="Life Span"> </el-table-column>-->
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
