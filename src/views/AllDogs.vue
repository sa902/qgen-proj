<template>
  <div>
    All Dogs
    <CustomToggle @slide="toggleOne($event)"></CustomToggle>
    <CustomToggle @slide="toggleTwo"></CustomToggle>
    <font-awesome-icon icon="fa-solid fa-table" @click="toggleTwo">
    </font-awesome-icon>
    <dropdown-menu
      label-text="Choose a Dog"
      :items="allDogTypes"
      @selectedItem="selectedDog"
    >
    </dropdown-menu>
    <div class="main-page__body">
      <Card
        v-for="(dog, i) in dogs"
        :key="i"
        :data="dog"
        :title="dog.breeds[0]?.name"
      >
        <template v-if="isLarge" slot="card-highlight__body-append">
          <br />
          Name: {{ dog.breeds[0]?.name }} &nbsp;
          <br />
          Breed Group: {{ dog.breeds[0]?.breed_group }}
          <br />
          Height: {{ dog.breeds[0]?.height_metric }}
          <br />
          Life Span: {{ dog.breeds[0]?.life_span }}
          <br />
          Temperament: {{ dog.breeds[0]?.temperament }}
          <br />
          Height (cm) x Weight (cm) = {{ dog.breeds[0]?.height?.metric }} x
          {{ dog.breeds[0]?.weight?.metric }}
        </template>
      </Card>
    </div>
    <CustomPagination
      :total="getTotalPages"
      :page-size="limit"
      @pageChange="onPageChange($event)"
    >
    </CustomPagination>
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
    order: "Asc",
    limit: 10,
    page: 1,
    paginationCount: 0,
    dogs: null,
    breedID: null,
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
    getBreedID() {
      //use null as a breed id to get all dogs
      let result = this.breedID === "0" ? null : this.breedID;
      console.log("this is the result in get breed id ", result);
      return result;
    },
    allDogTypes() {
      let all = {
        id: 0,
        name: "All Dogs",
      };
      let storedDogTypes = this.$store.getters.getDogTypes;
      if (storedDogTypes) {
        return [all, ...storedDogTypes];
      } else {
        return null;
      }
    },
    getTotalPages() {
      // let limit = parseInt(this.$store.getters.getLimit);
      // let pagination_count = parseInt(this.$store.getters.getPaginationCount);
      console.log(
        "this is the new total pages ",
        Math.floor(this.paginationCount / this.limit) | 0
      );
      return parseInt(this.paginationCount);
    },
    getPageSize() {
      return this.limit;
    },
    getAPIKey() {
      return this.$store.getters.getApiKey;
    },
    isLarge() {
      if (this.$store.getters.getCardSize === "large") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    toggleOne(ev) {
      if (ev) {
        this.$store.dispatch("setCardSize", "small");
      } else {
        this.$store.dispatch("setCardSize", "large");
      }
      console.log("toggle one event ", ev);
    },
    validate(ev) {
      // TODO validate functino for the things in the card
      console.log("THIS IS A TEST ", ev);
      return "this is a " + ev;
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
        breed_id: this.getBreedID,
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
          console.log("this is the query reszponse ", response);
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
