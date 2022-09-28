<template>
  <nav>
    |
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
  </nav>
</template>

<script>
export default {
  name: "CoreNavBar",
};
</script>

<style scoped lang="scss">
@use "@/assets/_variables.scss";

nav {
  padding: 30px;
  a {
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
