<template>
  <div id="app">
    <CoreNavBar></CoreNavBar>
    <router-view />
  </div>
</template>

<script>
import CoreNavBar from "@/components/CoreNavBar";

export default {
  components: {
    CoreNavBar,
  },
  watch: {
    $route(to, from) {
      console.log("here the route is changing ", to, from);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
