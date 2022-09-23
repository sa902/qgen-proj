<template>
  <div class="main-page">
    <dropdown-menu> </dropdown-menu>
    <div class="main-page__body">
      <Card
        v-for="(dog, i) in dogData"
        :key="i"
        :fallback-image="fallbackImage"
        :data="dog"
      >
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import axios from "axios";
import DropdownMenu from "@/components/DropdownMenu";

export default {
  name: "HomeView",
  components: {
    Card,
    DropdownMenu,
  },
  data: () => ({
    dogMock: {
      id: 9998,
      image: "",
    },
    fallbackImage: "http://picsum.photos/id/1042/300/300",
    dogData: null,
  }),
  created() {
    this.loadNextImage();
  },
  methods: {
    loadNextImage() {
      axios
        .get("https://api.thedogapi.com/v1/images/search", {
          headers: { "x-api-key": this.$store.getters.getApiKey },
          params: {
            limit: 5,
            size: "full",
            breed_id: this.$store.getters.getSelectedDog,
          },
        })
        .then((response) => {
          this.dogData = response.data;
          console.log(response);
          console.log("id:", this.image.id);
          console.log("url:", this.image.url);
          this.dogMock.image = this.image.url;
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
