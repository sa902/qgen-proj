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
      if (this.value === this.selectedValue) {
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
    selectedValue: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
