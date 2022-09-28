<template>
  <div class="card-highlight" :style="size">
    <div class="card-highlight__wrapper">
      <div class="card-highlight__header">
        <h2 class="card-highlight__title">
          {{ title }}
        </h2>
        <div class="card-highlight__icon">
          <slot name="card-highlight__icon" />
        </div>
      </div>
      <div class="card-highlight__body">
        <img
          class="card-highlight__image"
          v-show="!data.url"
          :src="fallbackImage"
          alt=""
        />
        <img
          class="card-highlight__image"
          v-show="data.url"
          :src="data.url"
          alt=""
        />
        <slot name="card-highlight__body-prepend" />
        {{ data.description }}
        <slot name="card-highlight__body-append" />
      </div>
      <div class="card-highlight__footer">
        <slot name="card-highlight__footer"></slot>
        <div class="card-highlight__actions">
          <slot name="card-highlight__actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Card",
  components: {},
  mixins: [],
  props: {
    data: {
      type: Object,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    fallbackImage: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    newsDate() {
      // Highlight's news item date
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      let newDate = new Date(this.data.date);
      return newDate.toLocaleDateString("en-US", options);
    },
    size() {
      let cardSize = this.$store.getters.getCardSize;
      if (cardSize === "large") {
        return {
          "max-width": "80%",
        };
      } else {
        return {
          "max-width": "20%",
        };
      }
    },
  },
  methods: {},
  created() {
    console.log("this is the card deata ", this.data);
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/_variables.scss";

.card-highlight {
  padding: 0.7em;
  margin: 1em;
  border-radius: 26px;
  display: block;
  position: relative;
  right: 0px;
  top: 0px;
  background-color: variables.$default-card-highlight-color;
  transition: all 0.3s ease-out;

  &:hover {
    transition: all 0.3s ease-out;
    box-shadow: 0px 8px 16px variables.$card-highlight__hover-box-shadow;
    right: -10px;
    top: -10px;
    border: 1px solid variables.$card-highlight__hover-border;
    background-color: variables.$card-highlight__hover-background-color;
  }

  &:hover:before {
    transform: scale(2.15);
  }
  &__wrapper {
    padding: 0.7em;
    height: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  &__header {
    display: flex;
    height: 52px;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
  }

  &__body {
    flex: 1 0 auto;
  }

  &__image {
    max-width: 200px;
    max-height: 200px;
  }
  &__footer {
    align-self: flex-end;
    padding: 1em;
  }

  @media only screen and (min-width: map-get(variables.$grid-breakpoints, "md")) {
    flex-basis: calc(50% - 20px);
    width: calc(50% - 20px);
    padding: 0; // only for desktop
    margin: 0; // only for desktop
    max-width: var(size);
    //max-width: 20%;
  }
}
</style>
