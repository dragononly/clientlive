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
    <backlook />
  </div>
</template>

<script>
import backlook from '@components/center/backlook.vue';
export default {
  name: 'center',
  components: {
    backlook,
  },
};
</script>

<style scoped>
</style>
