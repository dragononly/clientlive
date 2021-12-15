<template>
  <suspense>
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </suspense>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
  data() {
    return {
      locale: zhCN,
    };
  },
  name: 'App',
  setup() {
    // const route = useRoute();
    // const router = useRouter();
    // alert(route.query.secret);
    // if (!sessionStorage.eid && !route.query.secret) {
    //   router.push('/');
    // }
  },
});
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Noto Sans SC';
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  overflow-y: hidden;
}
.touch {
  cursor: pointer;
}
.line1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* body::-webkit-scrollbar{display: none;} */
</style>
