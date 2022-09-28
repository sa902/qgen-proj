<template>
  <div class="pagination-main">
    <el-pagination
      @current-change="onchange($event)"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "CustomPagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    pageSize: {
      required: true,
      type: Number,
    },
  },
  data: () => ({}),
  created() {},
  watch: {},
  methods: {
    onchange(event) {
      this.$emit("pageChange", event);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination-main {
  padding: 10px;
  margin: 10px;
}
</style>
