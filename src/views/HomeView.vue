<template>
  <div class="main-page">
    <!--    TODO put the lal types dog check inside the dropdown menu -->
    <dropdown-menu
      v-if="allDogTypes"
      :items="allDogTypes"
      @selectedItem="selectedDog"
    >
    </dropdown-menu>
    <div class="main-page__body">
      <Card
        v-for="(dog, i) in dogs"
        :key="i"
        :fallback-image="fallbackImage"
        :data="dog"
      >
      </Card>
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
import Card from "@/components/CoreCard";
import DropdownMenu from "@/components/DropdownMenu";
import axios from "axios";
import CustomPagination from "@/components/CustomPagination";

export default {
  name: "HomeView",
  components: {
    Card,
    DropdownMenu,
    CustomPagination,
  },
  data: () => ({
    fallbackImage: "http://picsum.photos/id/1042/300/300",
    dogData: null,
    order: "Desc",
    limit: 5,
    page: 1,
    paginationCount: 0,
    dogs: null,
    breedID: 1,
  }),
  created() {
    this.getDogTypes();
    this.updateDogsList();
  },
  computed: {
    selectedDogType() {
      console.log("this  dog types ", this.$store.getters.getSelectedDogList);
      return this.$store.getters.getSelectedDogList;
    },
    allDogTypes() {
      return this.$store.getters.getDogTypes;
    },
    getTotalPages() {
      // let limit = parseInt(this.$store.getters.getLimit);
      // let pagination_count = parseInt(this.$store.getters.getPaginationCount);
      return Math.floor(this.paginationCount / this.limit) | 0;
    },
  },
  methods: {
    onPageChange(ev) {
      //TODO add something here that deletes all the dogs and triggers a reload skeleton
      //reload the dog page, set the page and call again.
      this.page = ev;
      this.updateDogsList();
      // this.$store.dispatch("setPage", ev);
      // this.$store.dispatch("setAllDogs");
      console.log("the pagination page changed", ev);
    },
    selectedDog(ev) {
      this.breedID = ev;
      this.updateDogsList();
      console.log("this is the selected dog ", ev);
    },
    getDogTypes() {
      if (this.$store.getters.getDogTypes === null) {
        this.$store.dispatch("setDogTypes");
      }
    },
    updateDogsList() {
      axios
        .get("https://api.thedogapi.com/v1/images/search", {
          headers: { "x-api-key": this.getAPIKey },
          params: {
            limit: this.limit,
            order: this.order,
            page: this.page - 1,
            breed_id: this.breedID,
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
