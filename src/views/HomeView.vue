<template>
  <div class="main-page">
    <div class="main-page__body">
      <Card :fallback-image="fallbackImage" :data="dogMock"> </Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    Card,
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
      const apiKey =
        "live_DcRoox7Iaak72trJ1dnhDwbVfIBlSGQ3sX1Zxg6sha6Iwmd5DDPD1wRSh6OB1tHW";
      axios
        .get("https://api.thedogapi.com/v1/images/search", {
          headers: { "x-api-key": apiKey },
          params: { limit: 1, size: "full" },
        })
        .then((response) => {
          this.image = response.data[0];
          console.log(this.image);
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
