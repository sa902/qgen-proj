<template>
  <div class="home">
    <Card :fallback-image="fallbackImage" :data="dogMock"> </Card>
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
      date: "2020-04-20 12:20:00",
      description:
        "The Pacific ocean is located specifically between europe and the USA",
      id: 9998,
      image: "",
      name: "Pacific",
    },
    fallbackImage: "http://picsum.photos/id/1042/300/300",
    dogData: null,
  }),
  created() {
    this.loadNextImage();
    this.loadDogs();
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
          console.log("id:", this.image.id);
          console.log("url:", this.image.url);
          this.dogMock.image = this.image.url;
        });
    },
  },
};
</script>
