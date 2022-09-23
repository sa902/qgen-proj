<template>
  <div>
    {{ $store.getters.getSelectedDogBreedID }}
    <label for="dogs">Choose a dog:</label>
    <select name="dogs" id="dogs" @change="selectedDog($event)" value="TEST">
      <option
        v-for="(dog, i) in dogs"
        :selected="isSelected(dog)"
        :key="i"
        :value="dog.id"
      >
        {{ dog.name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DropdownMenu",
  data: () => ({
    dogs: null,
  }),
  created() {
    this.getDogTypes();
  },
  methods: {
    isSelected(dog) {
      console.log("inside our function ");
      if (dog.id === this.$store.getters.getSelectedDogBreedID) {
        return "selected";
      }
    },
    selectedDog(ev) {
      console.log("selected dog ", ev.target.value);
      this.$store.dispatch("setSelectedDogBreedID", ev.target.value);
    },
    getDogTypes() {
      console.log("api key ", this.$store.getters.getApiKey);
      axios
        .get("https://api.thedogapi.com/v1/breeds", {
          headers: { "x-api-key": this.$store.getters.getApiKey },
        })
        .then((response) => {
          this.dogs = response.data;
          console.log(response);
        });
    },
  },
};
</script>

<style scoped></style>
