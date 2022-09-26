<template>
  <div>
    All Dogs
    <CustomToggle @slide="toggleOne"></CustomToggle>
    <CustomToggle @slide="toggleTwo"></CustomToggle>
    <dropdown-menu
      v-if="allDogTypes"
      :items="allDogTypes"
      @selectedItem="selectedDog"
    >
    </dropdown-menu>
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
import DropdownMenu from "@/components/DropdownMenu";

export default {
  name: "AllDogs",
  components: {
    Card,
    CustomPagination,
    CustomToggle,
    DropdownMenu,
  },
  data: () => ({
    order: "Desc",
    limit: 5,
    page: 1,
    paginationCount: 0,
    dogs: null,
    breed: null,
  }),
  created() {
    this.getDogTypes();
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
    allDogTypes() {
      return this.$store.getters.getDogTypes;
    },
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
    getDogTypes() {
      if (this.$store.getters.getDogTypes === null) {
        this.$store.dispatch("setDogTypes");
      }
    },
    toggleTwo() {
      console.log("toggle two even ");
    },
    selectedDog(ev) {
      this.breedID = ev;
      this.updateDogsList();
      console.log("this is the selected dog ", ev);
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
      let queryParams = {
        limit: this.limit,
        order: this.order,
        page: this.page - 1,
        // breed_id: this.breedID,
      };
      // if (this.breedID !== null) {
      //   queryParams.breed_id = this.breedID;
      // }
      axios
        .get("https://api.thedogapi.com/v1/images/search", {
          headers: { "x-api-key": this.getAPIKey },
          params: queryParams,
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
