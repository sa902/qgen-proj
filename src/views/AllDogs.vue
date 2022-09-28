<template>
  <div class="main-page">
    <FilterBar>
      <template slot="prepend">
        <span class="flex-item">
          <dropdown-menu
            label-text="Choose a Dog"
            :items="allDogTypes"
            @selectedItem="selectedDog"
          >
          </dropdown-menu>
        </span>
      </template>
    </FilterBar>
    <div class="main-page__body">
      <div v-if="!isTableView" class="main-page__body__card-view">
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
            Life Span: {{ dog.breeds[0]?.life_span }}
            <br />
            Temperament: {{ dog.breeds[0]?.temperament }}
            <br />
            Height (cm) x Weight (cm) = {{ dog.breeds[0]?.height?.metric }} x
            {{ dog.breeds[0]?.weight?.metric }}
          </template>
        </Card>
      </div>

      <div v-if="isTableView" class="">
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

export default {
  name: "AllDogs",
  components: {
    Card,
    CustomPagination,
    DropdownMenu,
    FilterBar,
    CoreTable,
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
    dogs() {
      return this.$store.getters.getAllDogs;
    },
    mappedDogs() {
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
    selectedDog(ev) {
      this.$store.dispatch("setBreedID", ev);
      this.$store.dispatch("setAllDogs");
      console.log("this is the selected dog ", ev);
    },
    onPageChange(ev) {
      //TODO add something here that deletes all the dogs and triggers a reload skeleton
      this.$store.dispatch("setPage", ev);
      this.$store.dispatch("setAllDogs");
      console.log("the pagination page changed", ev);
    },
  },
};
</script>

<style lang="scss">
@use "@/assets/_variables.scss";

.default-color {
  color: rgba(105, 105, 105, 0.98);
}
.selected-color {
  color: #4848fc;
}
.white-color {
  color: #000000;
}
.yellow-color {
  color: yellow;
}

.main-page {
  &__body {
    &__card-view {
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
}
</style>
