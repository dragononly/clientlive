<template>
  <div style="padding: 10px">
    <div style="margin-top: 10px">
      <a-button @click="out_login()" type="primary">退出登陆</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, defineComponent } from 'vue';
import { tuiliudata } from '../store/tuiliu';
import { useRouter } from 'vue-router';
export default defineComponent({
  data() {
    return {
      ...toRefs(tuiliudata),
    };
  },
  async setup() {
    const router = useRouter();
    const out_login = () => {
      localStorage.autologin = '0';
      sessionStorage.clear();
      router.push('/');
    };
    return { out_login };
  },
  components: {},
});
</script>
<style type="text/css">
</style>
