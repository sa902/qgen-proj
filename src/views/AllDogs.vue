<template>
  <div>
    test
    <div class="main-page__body">
      <Card v-for="(dog, i) in dogs" :key="i" :data="dog"> </Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "AllDogs",
  components: {
    Card,
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
