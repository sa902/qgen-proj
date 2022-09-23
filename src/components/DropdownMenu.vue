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
export default {
  name: "DropdownMenu",
  data: () => ({}),
  computed: {
    dogs() {
      return this.$store.getters.getDogTypes;
    },
  },
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
      if (this.$store.getters.getDogTypes === null) {
        this.$store.dispatch("setDogTypes");
      }
    },
  },
};
</script>

<style scoped></style>
