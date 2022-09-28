<template>
  <div class="timeline">
    <el-timeline class="timeline__item">
      <el-timeline-item
        class=""
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
  data() {
    return {
      reverse: true,
      activities: [
        {
          content: "Event start",
          timestamp: "09/12/2010",
        },
        {
          content: "Approved",
          timestamp: "2018-04-13",
        },
        {
          content: "Success",
          timestamp: "2018-04-11",
        },
      ],
    };
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
