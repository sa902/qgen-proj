<template>
  <div>
    test
    <el-table :data="dogs" style="width: 100%">
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
    <CustomPagination
      :total="getTotalPages"
      :page-size="getPageSize"
      @pageChange="onPageChange($event)"
    >
    </CustomPagination>
  </div>
</template>

<script>
import CustomPagination from "@/components/CustomPagination";

export default {
  components: {
    CustomPagination,
  },

  data() {
    return {
      columns: [
        {
          prop: "name",
          label: "Name",
        },
        {
          prop: "bredFor",
          label: "Bred For",
        },
        {
          prop: "breedGroup",
          label: "Breed Group",
        },
        {
          prop: "lifeSpan",
          label: "Life Span",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("setAllDogs");
  },
  computed: {
    dogs() {
      let allDogs = this.$store.getters.getAllDogs;
      let mappedDogsArray = allDogs.map((x) => {
        console.log("this is x.name inside th map ", x.breeds[0]?.name);
        const container = {};
        container["name"] = x.breeds[0]?.name;
        container["bredFor"] = x.breeds[0]?.bred_for;
        container["lifeSpan"] = x.breeds[0]?.life_span;
        container["breedGroup"] = x.breeds[0]?.breed_group;
        return container;
      });
      console.log(mappedDogsArray);
      return mappedDogsArray;
      // return this.$store.getters.getAllDogs;
    },
    getTotalPages() {
      let pagination_count = parseInt(this.$store.getters.getPaginationCount);
      console.log(
        "this is the new total pages ",
        Math.floor(this.paginationCount / this.limit) | 0
      );
      return parseInt(pagination_count);
    },
    getPageSize() {
      return parseInt(this.$store.getters.getLimit);
    },
  },
  methods: {
    onPageChange(ev) {
      //TODO add something here that deletes all the dogs and triggers a reload skeleton
      this.$store.dispatch("setPage", ev);
      this.$store.dispatch("setAllDogs");
      console.log("the pagination page changed", ev);
    },
  },
};
</script>
