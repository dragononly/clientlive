<template>
  <a-row>
    <a-col
      style="padding-top: 20px"
      :xs="{ span: 20, offset: 2 }"
      :md="{ span: 15, offset: 5 }"
      :lg="{ span: 12, offset: 6 }"
      :xl="{ span: 10, offset: 8 }"
      :xxl="{ span: 8, offset: 8 }"
      :xxxl="{ span: 7, offset: 9 }"
    >
      <div style="background: red">
        <login />
      </div>
    </a-col>
  </a-row>
</template>

<script>
import login from '@components/home/login.vue';
export default {
  name: 'home',
  async setup() {},
  components: {
    login,
  },
};
</script>

<style scoped>
</style>
