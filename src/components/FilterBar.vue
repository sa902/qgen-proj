<template>
  <div class="flex-container">
    <!--    <span class="">-->
    <slot name="prepend"></slot>
    <!--    </span>-->
    <span class="flex-item">
      <font-awesome-icon
        @mouseover="hoveringBig = true"
        @mouseleave="hoveringBig = false"
        @click="selectedBigClicked()"
        :fade="hoveringBig"
        class=""
        :class="[selectedBig ? 'selected' : 'unselected']"
        transform="grow-10"
        icon="fa-solid fa-table-cells-large"
      >
      </font-awesome-icon>
    </span>
    <span class="flex-item">
      <font-awesome-icon
        @mouseover="hoveringSmall = true"
        @mouseleave="hoveringSmall = false"
        @click="selectedSmallClicked()"
        :fade="hoveringSmall"
        class=""
        :class="[selectedSmall ? 'selected' : 'unselected']"
        transform="grow-10"
        icon="fa-solid fa-table-cells"
      >
      </font-awesome-icon>
    </span>
    <span class="flex-item">
      <font-awesome-icon
        @mouseover="hoveringTable = true"
        @mouseleave="hoveringTable = false"
        @click="
          (selectedTable = !selectedTable),
            (selectedSmall = false),
            (selectedBig = false)
        "
        :fade="hoveringTable"
        class=""
        :class="[selectedTable ? 'selected' : 'unselected']"
        transform="grow-10"
        icon="fa-solid fa-table"
      >
      </font-awesome-icon>
    </span>
  </div>
</template>

<script>
export default {
  name: "FilterBar",
  data: () => ({
    hoveringSmall: false,
    hoveringBig: false,
    hoveringTable: false,
    selectedSmall: false,
    selectedBig: false,
    selectedTable: false,
  }),
  methods: {
    selectedBigClicked() {
      this.selectedBig = !this.selectedBig;
      this.selectedSmall = false;
      this.selectedTable = false;
      if (this.selectedBig) {
        this.$store.dispatch("setCardSize", "large");
      }
    },
    selectedSmallClicked() {
      this.selectedSmall = !this.selectedSmall;
      this.selectedBig = false;
      this.selectedTable = false;
      console.log("inside selected small , ", this.selectedSmall);
      if (this.selectedSmall) {
        this.$store.dispatch("setCardSize", "small");
      }
    },
    selectedTableClicked() {},
  },
  computed: {
    // getColor() {
    //   if (this.selected) {
    //     return {
    //       color: "#146ebe",
    //     };
    //   }
    //   return {
    //     color: "#183153",
    //   };
    // },
  },
};
</script>

<style scoped>
.selected {
  color: #146ebe;
}

.unselected {
  color: #183153;
}

.flex-item {
  order: 0;
  flex: 0 1 auto;
  align-self: auto;
  padding: 20px;
  margin: 20px;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-content: stretch;
  align-items: flex-start;
  padding: 20px;
}
</style>
