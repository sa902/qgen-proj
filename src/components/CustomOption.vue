<template>
  <option :value="value" :selected="isSelected">
    {{ name }}
  </option>
</template>

<script>
export default {
  name: "CustomOption",
  computed: {
    isSelected() {
      console.log(
        "this props id ",
        this.value,
        "this store getters ",
        this.$store.getters.getSelectedDogBreedID
      );
      if (this.value === parseInt(this.$store.getters.getSelectedDogBreedID)) {
        console.log("we found it");
        return "selected";
      } else {
        return null;
      }
    },
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
