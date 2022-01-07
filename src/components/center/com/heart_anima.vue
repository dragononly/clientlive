<template>
  <div class="box" :style="{ top: y + 'px' }">
    <div
      v-show="show"
      style="
        position: absolute;
        top: 0px;
        z-index: 200;
        color: #fff;
        font-weight: bold;
        text-align: center;
        padding-left: 5px;
      "
    >
      {{ nowmessage?.msg?.name }}的点赞
    </div>
    <img
      @click="hclick"
      class="heart touch"
      :src="bg2"
      :style="{ left: x + 'px' }"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import Bg2 from '@/assets/web_heart_animation.png';
import { data } from '@components/center/store/live';
import { wsdata } from '@config/http/wsdata';
import { sendWsMessage } from '@config/http/ws';
export default defineComponent({
  data() {
    return {
      ...toRefs(data),
      ...toRefs(wsdata),
      bg2: Bg2,
    };
  },
  async setup() {
    let data2 = reactive({
      x: 0,
      y: -29,
      show: false,
      name: '',
    });
    let time: any;
    //1点击动画以及把数据上传到数据库
    const hclick = async () => {
      let pdata = {
        id: data.nowvideoid,
        name: sessionStorage.user,
        command: 'heart',
      };
      data2.show = true;
      sendWsMessage(pdata);
    };
    watch(
      () => wsdata.off,
      (a) => {
        clearInterval(time);
        time = setInterval(anima, 60);
        data2.show = true;
      },
    );

    const anima = () => {
      if (data2.x > -2500) {
        data2.x -= 100;
        data2.y -= 10;
      } else {
        data2.x = 0;
        data2.y = -29;
        data2.show = false;
        clearInterval(time);
      }
    };

    clearInterval(time);
    time = setInterval(anima, 60);

    return {
      ...toRefs(data2),
      hclick,
    };
  },
});
</script>

<style scoped>
.heart {
  background-size: 2000%;
  height: 100px;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 888;
}
.box {
  position: relative;
  position: absolute;
  height: 100px;
  width: 100px;
  z-index: 777;
  overflow: hidden;
}
</style>