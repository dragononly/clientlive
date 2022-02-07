<template>
  <div>
    <a-button type="primary">{{ uploadStatus }}</a-button>
    <a-modal v-model:visible="visible" title="输入文件地址" @ok="handleOk">
      <p>
        <a href="http://skycloud.moono.vip/" target="_blank">
          跳转到文件管理后台</a
        >
      </p>
      <p><a-input v-model:value="value" placeholder="文件url" /></p>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue';

import { defineComponent, ref, toRefs } from 'vue';
import { uploadUrl } from './event';
import { uploaddata } from './upload';

export default defineComponent({
  data() {
    return { ...toRefs(uploaddata) };
  },
  setup() {
    const handleOk = async (e: MouseEvent) => {
      const cab = await uploadUrl(uploaddata.nowid, uploaddata.value);

      if (cab) {
        uploaddata.visible = false;
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
