<template>
  <div style="padding: 10px">
    <div style="padding: 5px">请输入直播源</div>
    <div><a-input v-model:value="valueinput" placeholder="视频源" /></div>
    <div style="padding: 5px">选择直播</div>

    <a-select
      v-model:value="se_value"
      label-in-value
      style="width: 100%"
      :options="options"
      @change="handleChange"
    >
    </a-select>
    <div style="margin-top: 10px">
      <a-input-number
        id="inputNumber"
        v-model:value="signContinueTime"
        :min="1"
        :max="1000"
      />
      签到等待时长/秒
    </div>
    <div style="margin-top: 10px">
      <a-button @click="change()" type="primary">修改</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue';
import { toRefs, defineComponent } from 'vue';
import { tuiliudata } from '../store/tuiliu';
import { data } from '@components/center/store/live';
import { Mpost, Rput } from '@config/http/index';
export default defineComponent({
  data() {
    return {
      ...toRefs(data),
      ...toRefs(tuiliudata),
    };
  },
  async setup() {
    //1获取直播列表
    let va = await Mpost('/live/findzhibo', '');
    tuiliudata.options.length = 0;
    for (const i of va.data.data) {
      let op = {
        value: i._id,
        label: i.name,
      };
      if (i.backurl == '等待回传') {
        tuiliudata.options.push(op);
      }
    }
    const handleChange = (value: any) => {
      tuiliudata.liveid = value.value;
      gainvurl();
    };
    //获取直播地址
    const gainvurl = async () => {
      let mydata = { id: tuiliudata.liveid };
      let cab = await Mpost('/live/gainvideourl', mydata);
      tuiliudata.valueinput = cab.data.data.url;
    };
    //修改签到时长
    const change2 = async () => {
      let mydata = {
        signContinueTime: data.signContinueTime,
      };

      const cab = await Rput('/zhibolist', tuiliudata.liveid, mydata);

      return cab;
    };
    //修改直播地址
    const change = async () => {
      const url = '/live/addvideourl';
      const mydata = { url: tuiliudata.valueinput, id: tuiliudata.liveid };
      const cab = await Mpost(url, mydata);
      if (cab && (await change2())) {
        message.success('修改成功');
      }
    };

    return {
      change,
      handleChange,
    };
  },
  components: {},
});
</script>
