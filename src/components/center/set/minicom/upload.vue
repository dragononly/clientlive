<template>
  <a-upload
    v-model:file-list="fileList"
    :preview-file="previewFile"
    :before-upload="beforeUpload"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Upload
    </a-button>
  </a-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { UploadProps } from 'ant-design-vue';

// import { Minio } from 'minio';
// var Minio = require('minio');
export default defineComponent({
  setup() {
    // const fileList = ref<UploadProps['fileList']>([]);
    // const beforeUpload: UploadProps['beforeUpload'] = (file: any) => {
    //   console.log(file);

    //   fileList.value = [...fileList.value, file];
    //   return false;
    // };

    // var minioClient = new Minio.Client({
    //   endPoint: 'live.pccpa.cn',
    //   port: 9000,
    //   useSSL: false,
    //   accessKey: '123456789',
    //   secretKey: '123456789',
    // });
    let url = 'zbr/';
    let objectkey = url + uuidv4() + 'op.file.name';
    let fr = new FileReader(); //用FileReader 读取文件流
    // fr.readAsArrayBuffer(op.file);
    // fr.onload = function (ex: any) {
    //   minioClient.putObject(
    //     'mynumber1',
    //     objectkey,
    //     Buffer.from(ex.target.result),
    //     op.file.size,
    //     function (err) {
    //       if (err) {
    //         return console.log(err); // err should be null
    //       }
    //       let last = 'https://wx.moono.vip:8999/mynumber1/' + objectkey;
    //       // console.log("Success", objInfo);
    //     },
    //   );
    // };
  },
  components: {},
});
</script>

<style scoped>
</style>
