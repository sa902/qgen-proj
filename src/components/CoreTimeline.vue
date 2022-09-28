<template>
  <div class="timeline">
    <el-timeline class="timeline__item">
      <el-timeline-item
        class=""
        color="blue"
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  name: "CoreTimeline",
  props: {
    activities: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
.timeline {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;
  &__item {
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
  }
}
</style>
