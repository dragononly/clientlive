<template>
  <video controls>
    <source :src="backUrl" type="video/mp4" />
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
import { Rget } from '@/config/http';
export default defineComponent({
  data() {
    return { ...toRefs(data) };
  },

  async setup(myself) {
    let time60: NodeJS.Timeout;
    const route = useRoute();
    //判断accesstoken,进行操作
    if (route.query.accesstoken) {
      //设置全局accesstoken
      axios.defaults.headers.common['authorization'] = route.query.accesstoken;
      await useAccesstokenGetEid();
      //console.log(data.nowvideoid, data.eid);

      //通过直播id去获取直播的backurl
      const reqData = { _id: data.nowvideoid, limit: 1, back: 'backurl' };
      const cab = await Rget('/zhibolist', reqData);

      data.backUrl = cab?.data?.data[0]?.backurl;
    }
    if (data.nowvideoid && sessionStorage.user && sessionStorage.eid) {
      message.info('计时记分服务器启动');
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

