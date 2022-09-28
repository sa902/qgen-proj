<template>
  <div class="pagination-main">
    <el-pagination
      @current-change="onchange($event)"
      layout="prev, pager, next"
      :total="total"
      :key="key"
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
  data: () => ({
    key: "pagination-",
  }),
  created() {
    console.log(
      "this is the total ",
      this.total,
      "this is the page size ",
      this.pageSize
    );
  },
  watch: {
    total(nv, ov) {
      this.setKey();
      console.log("this is the nv ", nv, "this is the old value ", ov);
    },
  },
  methods: {
    setKey() {
      this.key = "pagination-" + Math.random();
    },
    onchange(ev) {
      this.$emit("pageChange", ev);
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
