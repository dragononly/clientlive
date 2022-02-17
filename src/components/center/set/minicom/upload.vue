<template>
  <div>
    <a-button type="primary">{{ uploadStatus }}</a-button>
    <a-modal v-model:visible="visible2" title="输入文件地址" @ok="handleOk">
      <p>
        <a href="http://skycloud.moono.vip/" target="_blank">
          跳转到文件管理后台</a
        >
      </p>
      <p><a-input v-model:value="value2" placeholder="文件url" /></p>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Rget } from '@/config/http';
import { message } from 'ant-design-vue';
import { data } from '@components/center/store/live';
import { defineComponent, ref, toRefs } from 'vue';
import { uploadUrl } from './event';
import { uploaddata } from './upload';

export default defineComponent({
  data() {
    return { ...toRefs(uploaddata), ...toRefs(data) };
  },
  setup() {
    const handleOk = async (e: MouseEvent) => {
      const cab = await uploadUrl(uploaddata.nowid, uploaddata.value2);

      if (cab) {
        uploaddata.visible2 = false;
        //通知知学云回看可以拿到
        await Rget('/zxylive/changePlayType', {
          id: data.nowvideoid,
          operateType: '3',
        });
        message.success('成功');
      } else {
        message.warn('失败');
      }
    };

    return { handleOk };
  },
  components: {},
});
</script>

<style scoped>
</style>
