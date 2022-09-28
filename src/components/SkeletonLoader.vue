<template>
  <div class="skeleton-loader">
    <font-awesome-icon transform="grow-100" icon="spinner" spin />
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
};
</script>

<style scoped lang="scss">
.skeleton-loader {
  height: 50vh;
}
</style>
