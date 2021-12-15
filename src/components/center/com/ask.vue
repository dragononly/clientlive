<template>
  <div style="width: 30%; position: fixed; z-index: 10; right: 25%">
    <div class="a1">
      A
      <a-progress
        @click="click_selectquestion('a')"
        class="touch"
        :strokeWidth="30"
        :percent="question.a / 10"
      />
      <div style="height: 10px"></div>
      B
      <a-progress
        @click="click_selectquestion('b')"
        class="touch"
        :strokeWidth="30"
        :percent="question.b / 10"
      />
      <div style="height: 10px"></div>
      C
      <a-progress
        @click="click_selectquestion('c')"
        class="touch"
        :strokeWidth="30"
        :percent="question.c / 10"
      />
      <div style="height: 10px"></div>
      D
      <a-progress
        @click="click_selectquestion('d')"
        class="touch"
        :strokeWidth="30"
        :percent="question.d / 10"
      />
      <div style="height: 10px"></div>
      <a-button @click="closeaskshow()" v-if="admin" type="primary" danger
        >关闭</a-button
      >
      <span style="color: #416714; padding: 0 10px">{{ youroption }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { Rget, Rput } from '../../../../config/http/index';
import { data } from '../store/live';
import { connectSocket, sendWsMessage } from '../../../../config/http/ws';
import { wsdata } from '../../../../config/http/wsdata';
export default defineComponent({
  data() {
    return {
      ...toRefs(data),
      ...toRefs(wsdata),
    };
  },
  async setup() {
    connectSocket();
    let ask_data = reactive({
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      can_click: true,
      youroption: '',
    });
    const closeaskshow = () => {
      let pdata = {
        command: 'hidequestion',
      };
      sendWsMessage(pdata);
    };
    //You can only choose once a minute

    const click_selectquestion = async (a: string) => {
      if (!ask_data.can_click) {
        return;
      }
      ask_data.youroption = `你的选择是${a.toUpperCase()}`;
      switch (a) {
        case 'a':
          wsdata.question.a++;
          break;
        case 'b':
          wsdata.question.b++;
          break;
        case 'c':
          wsdata.question.c++;
          break;
        case 'd':
          wsdata.question.d++;
          break;
        default:
      }
      let pdata = {
        a: wsdata.question.a,
        b: wsdata.question.b,
        c: wsdata.question.c,
        d: wsdata.question.d,
        command: 'question',
      };

      sendWsMessage(pdata);
      ask_data.can_click = false;
      setTimeout(() => {
        ask_data.can_click = true;
        ask_data.youroption = '';
      }, 1000 * 60);
    };
    watch(
      () => data.nowvideoid,
      (a: string) => {
        if (a) {
          //Get questions count
          questions_count();
        }
      },
    );

    //questions count body
    const questions_count = async () => {
      let mydata = {
        _id: data.nowvideoid,
        limit: '1',
        back: 'a,b,c,d',
      };
      const cab = await Rget('/zhibolist', mydata);
      ask_data.a = cab.data.data[0]['a'];
      ask_data.b = cab.data.data[0]['b'];
      ask_data.c = cab.data.data[0]['c'];
      ask_data.d = cab.data.data[0]['d'];
    };
    return {
      closeaskshow,
      click_selectquestion,
      ...toRefs(ask_data),
    };
  },
});
</script>

<style scoped>
.a1 {
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ececec;
  opacity: 0.9;
  width: 100%;
  font-weight: bold;
}
</style>