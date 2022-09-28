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
    <span class="flex-item__hide-on-mobile">
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
        @click="selectedTableClicked()"
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
      if (this.selectedSmall) {
        this.$store.dispatch("setCardSize", "small");
      }
    },
    selectedTableClicked() {
      this.selectedTable = !this.selectedTable;
      this.selectedSmall = false;
      this.selectedBig = false;
      if (this.selectedTable) {
        this.$store.dispatch("setTableView", true);
      }
    },
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

<style scoped lang="scss">
@use "@/assets/_variables.scss";
selected {
  color: #b7de2c;
}

.unselected {
  color: #000eff;
}
.flex-item {
  order: 0;
  flex: 0 1 auto;
  align-self: auto;
  padding: 10px;

  @media only screen and (min-width: map-get( variables.$grid-breakpoints, "md")) {
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
    padding: 20px;
    margin: 20px;
  }
  &__hide-on-mobile {
    visibility: hidden;
    @media only screen and (min-width: map-get( variables.$grid-breakpoints, "md")) {
      order: 0;
      flex: 0 1 auto;
      align-self: center;
      padding: 10px;
      visibility: visible;
    }
  }
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: stretch;
  align-items: flex-start;
  padding: 15px;
  margin: 15px;
  @media only screen and (min-width: map-get( variables.$grid-breakpoints, "md")) {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-content: stretch;
    align-items: flex-start;
    padding: 20px;
  }
}
</style>
