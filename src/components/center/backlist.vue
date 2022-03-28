<template>
  <div id="box" :style="{ overflowY: isactive ? 'scroll' : 'hidden' }">
    <div style="background: #efefef">
      <div class="a1">
        <SettingFilled
          @click="showModal"
          class="touch2"
          :style="{ fontSize: '15px' }"
        />
      </div>
      <div v-if="!nowvideoid" class="a1" style="margin-left: 45px">
        <router-link to="/center" style="color: #63696a">正在直播</router-link>
      </div>
      <div v-if="!nowvideoid" class="a1" style="margin-left: 135px">
        <router-link to="/backlist" style="color: #63696a"
          >直播回看</router-link
        >
      </div>

      <div style="padding: 20px">
        <a-row style="margin-top: 65px">
          <a-col :span="4" v-for="i in zhiboDetails" :key="1">
            <div style="margin-right: 20px">
              <a-card
                hoverable
                style="width: 100%; border: 1px solid #fff; margin-bottom: 15px"
                @click="LookBackUrl(i._id)"
              >
                <template #cover>
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                </template>
                <template #actions> </template>
                <a-card-meta :title="i.name" :description="i.starttime[0]">
                  <template #avatar> </template>
                </a-card-meta>
              </a-card>
            </div>
          </a-col>
        </a-row>
      </div>
      <a-modal
        :footer="null"
        v-model:visible="visible"
        title="设置"
        :width="width"
        @ok="handleOk"
      >
        <myset />
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts">
import myset from './myset.vue';
import { Rget } from '@/config/http';
import { baseURL } from '@/config/http/env';
import { SettingFilled } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, reactive, toRefs } from 'vue';
import axios from 'axios';
import md5 from 'js-md5';
import { data } from './store/live';
export default defineComponent({
  data() {
    return {
      ...toRefs(data),
    };
  },
  async setup() {
    let zhiboDetails: any = [];
    const backlistData = reactive({
      zhiboDetails,
    });
    const zhibolisCab = await Rget('/zhibolist', {
      back: 'name,starttime,backurl',
    });

    for (const i of zhibolisCab?.data?.data) {
      if (i.backurl != '等待回传') {
        backlistData.zhiboDetails.push(i);
        backlistData.zhiboDetails.reverse();
      }
    }

    const LookBackUrl = async (id: string) => {
      axios
        .get(baseURL + '/zxylive/backwatch', {
          params: {
            eid: sessionStorage.eid,
            zhiboid: id,
            sign: md5(md5(sessionStorage.eid + id + '1322154454')),
            times: '1322154454',
          },
        })
        .then(function (res) {
          location.href = res.data.message;
        })
        .catch(function (error) {
          alert(error);
        });
    };

    const showModal = () => {
      data.visible = true;
    };

    return { showModal, LookBackUrl, ...toRefs(backlistData) };
  },
  components: {
    SettingFilled,
    myset,
  },
});
</script>
<style scoped>
@import './css/center.css'; /*引入公共样式*/
#box {
  height: calc(100vh);
}
</style>
