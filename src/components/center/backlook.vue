<template>
  <video controls>
    <source
      src="https://minioserver.moono.vip/sky/uploads/1/cdn/%E5%8D%83%E5%8F%A4%E7%8E%A6%E5%B0%98%20%E7%AC%AC01%E9%9B%86_1080P%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B%E5%B9%B3%E5%8F%B0_%E8%85%BE%E8%AE%AF%E8%A7%86%E9%A2%91.mp4"
      type="video/mp4"
    />
  </video>
</template> 
<script lang="ts">
import { user } from '@/utils/time';
import { defineComponent, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { addtime, useAccesstokenGetEid } from './event/center/before';
import { data } from './store/live';
import axios from 'axios';
import { message } from 'ant-design-vue';
export default defineComponent({
  data() {
    return {};
  },

  async setup(myself) {
    let time60: NodeJS.Timeout;
    const route = useRoute();
    //判断accesstoken,进行操作
    if (route.query.accesstoken) {
      //设置全局accesstoken
      axios.defaults.headers.common['authorization'] = route.query.accesstoken;
      await useAccesstokenGetEid();
    }
    if (data.nowvideoid && sessionStorage.user && sessionStorage.eid) {
      time60 = setInterval(addtime, 3 * 1000);
    } else {
      message.info('登录失败，不计入观看时间');
    }
  },

  components: {},
});
</script>

<style>
@import './css/center.css'; /*引入公共样式*/
video {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>

