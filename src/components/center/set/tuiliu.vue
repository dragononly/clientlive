<template>
  <div style="padding: 10px">
    <div style="padding: 5px">请输入直播源</div>
    <div><a-input v-model:value="valueinput" placeholder="视频源" /></div>
    <div style="padding: 5px">选择直播</div>

    <a-select
      v-model:value="se_value"
      label-in-value
      style="width: 120px"
      :options="options"
      @change="handleChange"
    >
    </a-select>
    <div style="margin-top: 10px">
      <a-button @click="change()" type="primary">修改</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue';
import { toRefs, defineComponent } from 'vue';
import { data } from '../store/tuiliu';
import { Mpost } from '../../../../config/http/index';
export default defineComponent({
  data() {
    return {
      ...toRefs(data),
    };
  },
  async setup() {
    //1获取直播列表
    let va = await Mpost('/live/findzhibo', '');
    data.options.length = 0;
    for (const i of va.data.data) {
      let op = {
        value: i._id,
        label: i.name,
      };
      data.options.push(op);
    }
    const handleChange = (value: any) => {
      data.liveid = value.value;
      gainvurl();
    };
    //获取直播地址
    const gainvurl = async () => {
      let mydata = { id: data.liveid };
      let cab = await Mpost('/live/gainvideourl', mydata);
      data.valueinput = cab.data.data.url;
    };

    //修改直播地址
    const change = async () => {
      const url = '/live/addvideourl';
      const mydata = { url: data.valueinput, id: data.liveid };
      let cab = await Mpost(url, mydata);
      if (cab) {
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
<style type="text/css">
</style>
