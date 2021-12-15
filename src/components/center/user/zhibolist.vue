<template>
  <div>
    <div>
      <img
        v-if="show"
        style="width: 100%; height: 100%"
        src="../../../assets/no.jpg"
      />
    </div>
    <a-row>
      <a-col
        :md="{ span: '6', offset: '1' }"
        :xs="{ span: '17' }"
        style="
          margin: 30px 0 0 70px;
          font-size: 10px;
          padding: 15px 15px 0px 15px;
          box-shadow: 2px 2px 2px #719abb;
          background: rgb(4, 146, 189);
          height: 200px;
        "
        v-for="(item, index) in showarr"
        :key="index"
      >
        <div
          style="margin-bottom: 5px; position: relative; text-align: left"
          @click="sendF(item._id)"
        >
          <a-popover
            :title="item.starttime[0] + '-' + item.starttime[1]"
            placement="bottom"
          >
            <template #content>开始时间</template>
            <a-button block style="text-align: left; border: none">
              <span class="a2">{{ item.name }}</span>
            </a-button>
          </a-popover>
          <div style="padding-left: 5px; margin-top: 10px; color: #fff">
            <span style="font-weight: 600"
              >开始时间:{{ item.starttime[0].split(' ')[1] }}</span
            >
            <TeamOutlined style="font-size: 15px; margin-left: 3px" />
            <div style="display: inline-block">
              <a-badge
                count="109"
                :overflow-count="999"
                class="a3"
                :number-style="{ backgroundColor: '#fff', color: '#888' }"
              />
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
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

import { toRefs, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { zhibolist } from './store/zhibolist';
import { data } from '../store/live';
export default defineComponent({
  data() {
    return {
      ...toRefs(zhibolist),
      ...toRefs(data),
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
      ctx.emit('sendF', id);
    };

    return {
      sendF,
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
  font-size: 13px;
  text-align: left;
  color: #888;
  font-weight: 500;
  overflow: hidden;
  width: 100%;
  line-height: 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.a3 {
  margin-bottom: 2px;
  margin-left: 4px;
}
</style>