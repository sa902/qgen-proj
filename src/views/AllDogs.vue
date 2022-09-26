<template>
  <div>
    All Dogs
    <CustomToggle @slide="toggleOne"></CustomToggle>
    <CustomToggle @slide="toggleTwo"></CustomToggle>
    <div class="main-page__body">
      <Card v-for="(dog, i) in dogs" :key="i" :data="dog"> </Card>
      <CustomPagination
        :total="getTotalPages"
        :page-size="limit"
        @pageChange="onPageChange($event)"
      >
      </CustomPagination>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import CustomPagination from "@/components/CustomPagination";
import CustomToggle from "@/components/CustomToggle";
import axios from "axios";

export default {
  name: "AllDogs",
  components: {
    Card,
    CustomPagination,
    CustomToggle,
  },
  data: () => ({
    order: "Desc",
    limit: 10,
    page: 1,
    paginationCount: 0,
    dogs: null,
  }),
  created() {
    let allDogs = this.$store.getters.getAllDogs;
    if (allDogs === null) {
      console.log("setting all dogs first time");
      this.$store.dispatch("setAllDogs");
    }
    this.updateDogsList();
  },
  watch: {
    dogs(nv, ov) {
      console.log("this is the dogs c hange ", ov, nv);
    },
  },
  computed: {
    // dogs() {
    //   console.log(
    //     "inside our dogs function huh? ",
    //     this.$store.getters.getAllDogs
    //   );
    //   return this.$store.getters.getAllDogs;
    // },
    getTotalPages() {
      // let limit = parseInt(this.$store.getters.getLimit);
      // let pagination_count = parseInt(this.$store.getters.getPaginationCount);
      return Math.floor(this.paginationCount / this.limit) | 0;
    },
    getPageSize() {
      return this.limit;
    },
    getAPIKey() {
      return this.$store.getters.getApiKey;
    },
  },
  methods: {
    toggleOne() {
      console.log("toggle one event ");
    },
    toggleTwo() {
      console.log("toggle two even ");
    },
    onPageChange(ev) {
      //TODO add something here that deletes all the dogs and triggers a reload skeleton
      //reload the dog page, set the page and call again.
      this.page = ev;
      this.updateDogsList();
      // this.$store.dispatch("setPage", ev);
      // this.$store.dispatch("setAllDogs");
      console.log("the pagination page changed", ev);
    },
    updateDogsList() {
      axios
        .get("https://api.thedogapi.com/v1/images/search", {
          headers: { "x-api-key": this.getAPIKey },
          params: {
            limit: this.limit,
            order: this.order,
            page: this.page - 1,
          },
        })
        .then((response) => {
          this.paginationCount = response.headers["pagination-count"];
          this.dogs = response.data;
        });
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
