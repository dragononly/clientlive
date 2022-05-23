<template>
  <!-- <div
    style="
      width: 100%;
      height: auto;
      margin: auto;
      text-align: left;
      box-shadow: 5px 5px 5px #304455;
    "
  >
   
  </div> -->
  <div
    :class="{ test: data.isActive }"
    style="text-align: left; box-shadow: 5px 5px 5px #304455"
  >
    <me />
  </div>
</template>

<script setup lang="ts">
import me from "@components/center/center.vue";
import { reactive } from "@vue/reactivity";
import device from "current-device";

const data = reactive({
  isActive: false,
});
if (device.android()) {
  data.isActive = true;
}
</script>

<style scoped>
.test {
  width: calc(100vh);
  height: calc(100wh);
  transform: rotate(-90deg);
}
</style>
