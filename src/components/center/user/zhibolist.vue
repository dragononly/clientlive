<template>
  <div>
    <div>
      <img
        v-if="show"
        style="width: 100%; height: 100%"
        src="../../../assets/no.jpg"
      />
    </div>
    <div v-for="(item, index) in showarr" :key="index">
      <a-row
        v-if="item.backurl == '等待回传' && item.status != '直播结束'"
        style="margin-top: 3.2rem"
      >
        <a-col
          :md="{ span: '20', offset: '1' }"
          :xs="{ span: '24', offset: '2' }"
          style="
            font-size: 10px;
            padding: 1rem 1rem 0px 1rem;
            box-shadow: 2px 2px 2px #719abb;
            background: #638866;
            height: 16rem;
            margin-bottom: 1rem;
          "
          class="touch"
        >
          <div
            style="margin-bottom: 5px; position: relative; text-align: left"
            @click="sendF(item._id)"
          >
            <!-- <a-popover
            :title="item.starttime[0] + '-' + item.starttime[1]"
            placement="bottom"
          > -->
            <a-popover placement="bottom">
              <template #content>
                <div style="height: 1.1rem" @click="tigerfun" class="touch">
                  <span style="color: #bc1f09; font-weight: bold; float: left"
                    >天健虎年</span
                  >
                  <img :src="img1" style="width: 2rem; float: left" />
                  <span
                    style="
                      color: #bc1f09;
                      font-weight: bold;
                      float: left;
                      font-size: 0.5rem;
                    "
                    >{{ tiger }}</span
                  >
                </div>
              </template>
              <div
                style="
                  background: #fff;
                  border-radius: 5px;
                  padding: 5px;
                  height: 8rem;
                "
              >
                <div
                  class="a2"
                  style="
                    font-size: 2.5rem;
                    text-align: center;
                    height: 4rem;
                    padding-top: 0.3rem;
                  "
                >
                  {{ item.name }}
                </div>
                <div class="a2" style="font-size: 1.6rem; margin-top: 0.5rem">
                  {{ item.starttime[0].split(' ')[0] }}
                </div>
              </div>
              <a-button block style="text-align: left; border: none">
              </a-button>
            </a-popover>
            <div
              style="
                padding-left: 5px;
                margin-top: 10px;
                color: #fff;
                text-align: center;
              "
            >
              <span style="font-weight: 600; font-size: 1rem"
                >开始时间:{{ item.starttime[0].split(' ')[1] }}
              </span>

              <TeamOutlined style="font-size: 1.2rem; margin-left: 3px" />

              <div style="display: inline-block">
                <a-badge
                  count="0"
                  :overflow-count="999"
                  class="a3"
                  :number-style="{ backgroundColor: '#fff', color: '#888' }"
                />
              </div>
              <!-- <span style="font-size: 18px; font-weight: bold">{{
              parseInt(people * 1.5)
            }}</span> -->
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import {
  TeamOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FormOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons-vue';
import { wsdata } from '@config/http/wsdata';
import { toRefs, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { zhibolist } from './store/zhibolist';
import { data } from '../store/live';
import img1 from '@/assets/1.jpg';
export default defineComponent({
  data() {
    return {
      ...toRefs(zhibolist),
      ...toRefs(data),
      ...toRefs(wsdata),
      img1: img1,
    };
  },
  props: {
    //接收子组件传值
    arr: Object,
  },
  async setup(props, ctx) {
    const store = useStore();

    zhibolist.showarr = data.showzhibolist;

    if (props.arr.length == 0) {
      zhibolist.show = true;
      store.state.css = false;
    }

    const sendF = (id) => {
      data.nowvideoid = id;
      ctx.emit('sendF', id);
    };

    const tigerfun = () => {
      zhibolist.tiger = '获得生肖祝福,幸运指数大幅度提升';
    };

    return {
      sendF,
      tigerfun,
    };
  },
  components: {
    TeamOutlined,
    DeleteOutlined,
    DownloadOutlined,
    FormOutlined,
    CheckOutlined,
    CloseOutlined,
  },
});
</script>
<style type="text/css" scoped="scoped">
.touch {
  cursor: pointer;
}

.a2 {
  margin-left: 5px;
  font-size: 10px;
  text-align: center;
  color: #888;
  font-weight: 500;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.a3 {
  margin-bottom: 2px;
  margin-left: 4px;
}
</style>