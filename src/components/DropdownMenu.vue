<template>
  <div v-if="items">
    <slot name="label">
      <label>{{ labelText }} &nbsp;</label>
    </slot>
    <select name="dogs" id="dogs" @change="selectedDog($event)">
      <CustomOption
        v-for="(item, i) in items"
        :key="i"
        :id="i"
        :value="item.id"
        :name="item.name"
      >
      </CustomOption>
    </select>
  </div>
</template>

<script>
import CustomOption from "@/components/CustomOption";
export default {
  name: "DropdownMenu",
  components: { CustomOption },
  data: () => ({}),
  props: {
    labelText: {
      required: false,
      default: "Choose an item:",
      type: String,
    },
    items: {
      required: false,
      type: Array,
    },
  },
  computed: {
    // dogs() {
    //   return this.$store.getters.getDogTypes;
    // },
  },
  created() {
    this.getDogTypes();
  },
  methods: {
    selectedDog(ev) {
      this.$emit("selectedItem", ev.target.value);
    },
    getDogTypes() {
      if (this.$store.getters.getDogTypes === null) {
        this.$store.dispatch("setDogTypes");
      }
    },
  },
};
</script>

<style scoped></style>
