<template>
  <a-row>
    <a-col
      style="padding-top: 20px"
      :xs="{ span: 20, offset: 2 }"
      :md="{ span: 10, offset: 8 }"
    >
      <div style="box-shadow: 2px 2px 2px #304455">
        <login />
      </div>
    </a-col>
  </a-row>
</template>

<script>
import login from '../../components/home/login.vue';
import { Rpost } from '../../../config/http/index';
export default {
  name: 'home',
  async setup() {
    let mydata = {
      lookback: '222',
    };
    let c = await Rpost('/zhibolist', mydata);
    // console.log(c);
  },
  components: {
    login,
  },
};
</script>

<style scoped>
</style>
