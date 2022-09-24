<template>
  <div>
    test
    <div class="main-page__body">
      <Card v-for="(dog, i) in dogs" :key="i" :data="dog"> </Card>
      <CustomPagination
        :total="getTotalPages"
        @pageChange="onPageChange($event)"
      >
      </CustomPagination>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import CustomPagination from "@/components/CustomPagination";

export default {
  name: "AllDogs",
  components: {
    Card,
    CustomPagination,
  },
  created() {
    let allDogs = this.$store.getters.getAllDogs;
    if (allDogs === null) {
      console.log("setting all dogs first time");
      this.$store.dispatch("setAllDogs");
    }
  },
  computed: {
    dogs() {
      console.log(
        "inside our dogs function huh? ",
        this.$store.getters.getAllDogs
      );
      return this.$store.getters.getAllDogs;
    },
    getTotalPages() {
      let limit = this.$store.getters.getLimit;
      let pagination_count = this.$store.getters.getPaginationCount;
      return Math.floor(pagination_count / limit) | 0;
    },
  },
  methods: {
    onPageChange(ev) {
      //TODO add something here that deletes all the dogs and triggers a reload skeleton
      //reload the dog page, set the page and call again.
      this.$store.dispatch("setPage", ev);
      this.$store.dispatch("setAllDogs");
      console.log("the pagination page changed", ev);
    },
  },
};
</script>

<style lang="scss">
@use "@/assets/_variables.scss";

.main-page {
  &__body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    column-gap: 1em;
    row-gap: 1em;

    @media only screen and (min-width: map-get( variables.$grid-breakpoints, "md")) {
      display: flex;
      justify-content: space-evenly;
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 1em;
      row-gap: 1em;
    }
  }
}
</style>
