<template>
  <div>
    <a-row
      v-for="(item, index) in arrgroupname"
      :key="index"
      style="margin-bottom: 5px"
    >
      <a-col :xs="18" :md="20">
        <a-button block style="text-align: left">
          <template #icon>
            <TeamOutlined />
          </template>
          {{ item.groupname }}
        </a-button>
      </a-col>
      <a-col :xs="6" :md="2">
        <a-button @click="degroup(item._id)" type="danger" danger
          >删除</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { TeamOutlined } from '@ant-design/icons-vue';
import { toRefs, defineComponent, getCurrentInstance } from 'vue';
import { Mpost } from '@config/http/index';
export default defineComponent({
  async setup() {
    const { proxy } = getCurrentInstance();
    let data = {
      arrgroupname: '',
    };
    //获取分组
    let url = '/live/searchgroup2';
    let cabbranch = await Mpost(url, '');
    data.arrgroupname = cabbranch.data.data;

    //删除分组
    const degroup = async (val) => {
      let url2 = '/live/degroup2';
      let mydata = {
        _id: val,
      };
      let cab = await Mpost(url2, mydata);

      if (cab.data.message == 'ok') {
        let cabbranch = await Mpost(url, '');
        data.arrgroupname = cabbranch.data.data;
        proxy.$forceUpdate();
      }
    };

    return {
      ...toRefs(data),
      degroup,
    };
  },
  components: {
    TeamOutlined,
  },
});
</script>
