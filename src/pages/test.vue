<template>
  <div>
    <vue3VideoPlay
      v-bind="options"
      poster="https://go.dreamwq.com/videos/ironMan.jpg"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const options = reactive({
  width: '800px', //播放器高度
  height: '450px', //播放器高度
  color: '#409eff', //主题色
  title: '', //视频名称
  src: 'https://minioserver.moono.vip/sky/uploads/4/20220224/2022-02-24%2014-42-53.mp4', //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
});
</script>

<style scoped>
</style>