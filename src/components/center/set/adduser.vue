<template>
  <div style="position: relative; z-index: 3; padding-left: 10px">
    <tree />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import tree from "./tree.vue";

export default defineComponent({
  setup() {},
  components: {
    tree,
  },
});
</script>

<style scoped>
</style>
