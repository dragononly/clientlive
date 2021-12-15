<template>
  <div
    style="
      width: 100%;
      height: calc(100vh - 10px);
      margin: auto;
      text-align: left;
      box-shadow: 5px 5px 5px #304455;
    "
  >
    <me />
  </div>
</template>

<script>
import me from "../../components/center/center.vue";
export default {
  name: "center",
  components: {
    me,
  },
};
</script>

<style scoped>
</style>
