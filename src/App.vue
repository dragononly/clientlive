<template>
  <suspense>
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </suspense>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent, toRefs } from 'vue';
import { global } from './store/app';
export default defineComponent({
  data() {
    return {
      locale: zhCN,
      ...toRefs(global),
    };
  },
  name: 'App',
  setup() {
    //初始化一些配置
    //1.去获取签到等待的时长
  },
});
</script>
<style>
@import './assets/css/app.css'; /*引入公共样式*/
</style>
