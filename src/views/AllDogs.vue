<template>
  <div class="main-page">
    <FilterBar>
      <template slot="prepend">
        <span class="filter-bar__item">
          <dropdown-menu
            label-text="Choose a Dog"
            :items="allDogTypes"
            @selectedItem="selectedDog"
            name="dogsDropdown"
            :selected-value="currentSelectedDog"
          >
          </dropdown-menu>
        </span>
      </template>
    </FilterBar>
    <SkeletonLoader v-if="loading"></SkeletonLoader>
    <div class="main-page__body" v-if="!loading">
      <div v-if="!isTableView" class="main-page__body--card-view">
        <Card
          v-for="(dog, i) in dogs"
          :key="i"
          :data="dog"
          :title="dog.breeds[0]?.name"
        >
          <template v-if="isLarge" slot="card-highlight__body-prepend">
            <div class="card-highlight__body-prepend">
              <br />
              Name: {{ dog.breeds[0]?.name }} &nbsp;
              <br />
              Breed Group: {{ dog.breeds[0]?.breed_group }}
              <br />
              Life Span: {{ dog.breeds[0]?.life_span }}
              <br />
              Temperament: {{ dog.breeds[0]?.temperament }}
              <br />
              Height (cm) x Weight (cm) = {{ dog.breeds[0]?.height?.metric }} x
              {{ dog.breeds[0]?.weight?.metric }}
            </div>
          </template>
          <template
            v-if="isLarge && isAdmin"
            slot="card-highlight__body-append"
          >
            <div class="card-highlight__body-append">
              <CoreTimeline :activities="dog.timeline"></CoreTimeline>
            </div>
          </template>
        </Card>
      </div>

      <div v-if="isTableView" class="main-page__body--table-view">
        <CoreTable :data="mappedDogs" :columns="columns"></CoreTable>
      </div>
    </div>
    <div class="main-page__footer">
      <CustomPagination
        :total="getTotalPages"
        :page-size="getPageSize"
        @pageChange="onPageChange($event)"
      >
      </CustomPagination>
    </div>
  </div>
</template>

<script>
import Card from "@/components/CoreCard";
import CustomPagination from "@/components/CustomPagination";
import DropdownMenu from "@/components/DropdownMenu";
import FilterBar from "@/components/FilterBar";
import CoreTable from "@/components/CoreTable";
import SkeletonLoader from "@/components/SkeletonLoader";
import CoreTimeline from "@/components/CoreTimeline";
import generateRandomTimelineData from "@/libs/generateRandomTimelineData";
export default {
  name: "AllDogs",
  components: {
    Card,
    CustomPagination,
    DropdownMenu,
    FilterBar,
    CoreTable,
    SkeletonLoader,
    CoreTimeline,
  },
  data: () => ({
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
  }),
  created() {
    this.getDogTypes();
    this.$store.dispatch("setAllDogs");
  },
  watch: {
    dogs(nv, ov) {
      console.log("this is the dogs c hange ", ov, nv);
    },
  },
  computed: {
    isAdmin() {
      return this.$store.getters.getIsAdmin;
    },
    currentSelectedDog() {
      return parseInt(this.$store.getters.getBreedID);
    },
    dogs() {
      let allDogs = this.$store.getters.getAllDogs;
      if (allDogs === null) {
        return null;
      }

      allDogs.map((dog) => {
        dog.timeline = generateRandomTimelineData();
      });
      console.log(allDogs);
      return allDogs;
    },
    loading() {
      return this.$store.getters.getAllDogs ? false : true;
    },
    mappedDogs() {
      let allDogs = this.$store.getters.getAllDogs;
      if (allDogs === null) {
        return null;
      }
      let mappedDogsArray = allDogs?.map((x) => {
        const container = {};
        container["name"] = x.breeds[0]?.name;
        container["bredFor"] = x.breeds[0]?.bred_for;
        container["lifeSpan"] = x.breeds[0]?.life_span;
        container["breedGroup"] = x.breeds[0]?.breed_group;
        return container;
      });
      return mappedDogsArray;
    },
    isTableView() {
      return this.$store.getters.getTableView ? true : false;
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
    isLarge() {
      if (this.$store.getters.getCardSize === "large") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    validate(item) {
      // TODO validate functino for the things in the card
      console.log("THIS IS A TEST ", item);
      return "this is a " + item;
    },
    getDogTypes() {
      if (this.$store.getters.getDogTypes === null) {
        this.$store.dispatch("setDogTypes");
      }
    },
    selectedDog(breedID) {
      this.$store.dispatch("setBreedID", breedID);
      this.$store.dispatch("setAllDogs");
    },
    onPageChange(page) {
      this.$store.dispatch("setPage", page);
      this.$store.dispatch("setAllDogs");
    },
  },
};
</script>

<style lang="scss">
@use "@/assets/_variables.scss";

.main-page {
  &__body {
    display: flex;
    &--card-view {
      display: flex;
      justify-content: center;
      flex-direction: row;
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
    &--table-view {
      width: 100%;
      @media only screen and (min-width: map-get( variables.$grid-breakpoints, "md")) {
        flex-grow: 100;
      }
    }
  }
}
</style>
