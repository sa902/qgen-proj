<template>
  <nav class="main-nav">
    <router-link class="main-nav__link" to="/">Home</router-link>
    <router-link class="main-nav__link" to="/about">About</router-link>
    <span v-if="isAdmin" class="main-nav__link" @click="logout()">Logout</span>
    <router-link v-if="!isAdmin" class="main-nav__link" to="/login">
      Login
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "CoreNavBar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    isAdmin() {
      return this.$store.getters.getIsAdmin;
    },
  },
};
</script>

<style lang="scss">
@use "@/assets/_variables.scss";

.main-nav {
  padding: 30px;
  &__link {
    padding: 10px;
    text-decoration: none;
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
