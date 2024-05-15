<template>
  <div style="position: relative">
    <div
      :style="{
        position: 'absolute',
        zIndex: '2',
        color: '#fff',
        padding: '0 5px',
        left: theData.watermark + 'px',
        top: '5px',
        fontFamily: '黑体',
        border: '1px solid #fff',
        opacity: '0.5',
      }"
    >
      {{ myGlobal.Eid }}&nbsp{{ myGlobal.User }}
    </div>
    <div style="position: absolute; z-index: 1">
      <!-- <video controls controlsList="nodownload" oncontextmenu="return(false);">
        <source :src="backUrl" type="video/mp4" />
      </video> -->
      <!-- <vue3VideoPlay v-bind="backlook" /> -->
    </div>
  </div>
</template> 

<script setup lang="ts">
import { user } from '@/utils/time';
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  addtime,
  addtimeBack,
  useAccesstokenGetEid,
} from './event/center/before';
import { data } from './store/live';
import { backlook } from './store/backlook';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { Rget } from '@/config/http';
import { myGlobal } from '@/store/app';
let theData = reactive({
  watermark: 0,
});
setInterval(() => {
  if (theData.watermark < 800) {
    theData.watermark++;
  } else {
    theData.watermark = 50;
  }
}, 100);

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

  backlook.src = cab?.data?.data[0]?.backurl;
}
if (myGlobal.Eid) {
  message.info('计时记分服务器启动');
  time60 = setInterval(addtimeBack, 10 * 1000);
} else if (data.nowvideoid && sessionStorage.user && sessionStorage.eid) {
  message.info('计时记分服务器启动');
  time60 = setInterval(addtimeBack, 10 * 1000);
} else {
  message.info('登录失败，不计入观看时间');
}
</script>

<style>
@import './css/center.css'; /*引入公共样式*/
video {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>

