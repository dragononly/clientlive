


<template>
  <div style="padding: 10px">
    在线人数：<a-button @click="zero()">归零</a-button>
  </div>
</template>

<script setup lang="ts">
import { Rput } from '@/config/http';
import { message } from 'ant-design-vue';

const zero = async () => {
  const cab = await Rput('/zhibolist', '61efa71ef99af2783a9c298c', {
    onlinePeople: 0,
  });
  if (cab?.data?.data?.acknowledged) {
    message.success('成功');
  }
};
</script>
<style type="text/css">
</style>
