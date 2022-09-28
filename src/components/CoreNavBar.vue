<template>
  <nav class="main-nav">
    |
    <router-link class="main-nav__link" to="/">Home</router-link> |
    <router-link class="main-nav__link" to="/about">About</router-link>
    |
  </nav>
</template>

<script>
export default {
  name: "CoreNavBar",
};
</script>

<style lang="scss">
@use "@/assets/_variables.scss";

.main-nav {
  padding: 30px;
  &__link {
    font-weight: bold;
    color: variables.$main-nav__link-color;
    &.router-link-exact-active {
      color: variables.$main-nav__link-selected-color;
    }
    &:hover {
      color: variables.$main-nav__link-hover-color;
    }
  }
}
</style>
