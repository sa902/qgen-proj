<template>
  <div>
    <el-pagination
      @current-change="onchange($event)"
      layout="prev, pager, next"
      :total="getTotalItems"
      :page-size="getPageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "CustomPagination",
  props: ["total"],
  created() {
    console.log("this is the total ", this.total);
  },
  computed: {
    getTotalPages() {
      let limit = this.$store.getters.getLimit;
      let pagination_count = this.$store.getters.getPaginationCount;
      return Math.floor(pagination_count / limit) | 0;
    },
    getTotalItems() {
      return parseInt(this.$store.getters.getPaginationCount);
    },
    getPageSize() {
      return parseInt(this.$store.getters.getLimit);
    },
  },
  methods: {
    onchange(ev) {
      this.$emit("pageChange", ev);
    },
  },
};
</script>

<style scoped></style>
